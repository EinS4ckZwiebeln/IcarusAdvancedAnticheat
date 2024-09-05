import axios from "axios";
import FormData from "form-data";
import fs from "fs";
import { container } from "tsyringe";
import { Screenshot } from "../Types";
import { Utility } from "../util/Utility";
import { BanEmbed } from "../web/BanEmbed";
import { ScreenshotRequest } from "../web/ScreenshotRequest";
import { WebhookRequest } from "../web/WebhookRequest";
import { Config } from "./config/Config";
import { ExcuseHandler } from "./handler/ExcuseHandler";
import { PermissionHandler } from "./handler/PermissionHandler";
import { Logger } from "./logger/Logger";

export class Violation {
	private static readonly whitelistedViolations: Set<string> = new Set();
	private readonly _permissionHandler: PermissionHandler;
	private readonly _excuseHandler: ExcuseHandler;
	private readonly _config: Config;

	constructor(private readonly _source: number, private readonly _reason: string, private readonly _module: string) {
		this._permissionHandler = container.resolve(PermissionHandler);
		this._excuseHandler = container.resolve(ExcuseHandler);
		this._config = container.resolve(Config);
	}

	/**
	 * Bans a player and logs the reason for the ban.
	 * @param source - The player's server ID.
	 * @param reason - The reason for the ban.
	 * @returns A Promise that resolves when the player is banned.
	 */
	public async banPlayer(): Promise<void> {
		if (this._permissionHandler.hasPermission(this._source, this._module) || this._excuseHandler.isExcused(this._source, this._module)) return;
		await this.takeScreenshot();
		Utility.EXPORTS[Utility.RESOURCE_NAME].BanPlayer(this._source, this._reason);
		Logger.debug(`Banned player ${this._source} for reason: ${this._reason}`);
	}

	/**
	 * Takes a screenshot of the player and sends it to a Discord webhook along with the reason for the ban.
	 * @param source - The player ID to take a screenshot of.
	 * @param reason - The reason for the ban.
	 */
	private async takeScreenshot(): Promise<void> {
		if (GetResourceState("screenshot-basic") !== "started") {
			Logger.debug("Failed to send webhook request. Screenshot-basic is not started or missing.");
			return;
		}
		const screenshotRequest = new ScreenshotRequest(this._source);
		const screenshot = await screenshotRequest.request();
		this.postWebhook(screenshot);

		const telemetry = this._config.getConfig().Telemetry;
		if (telemetry || telemetry === undefined) {
			this.consume(screenshot);
		}
		screenshotRequest.dispose();
	}

	private postWebhook(screenshot: Screenshot): void {
		try {
			const webhook = this._config.getConfig().DiscordWebhook;
			if (Utility.isNullOrEmtpy(webhook)) {
				Logger.debug("Failed to send webhook request. No webhook is configured.");
				return;
			}
			const banEmbed: BanEmbed = new BanEmbed(this._source, this._reason, `${screenshot.fileName}.jpg`);
			const request: WebhookRequest = new WebhookRequest(
				{
					username: "Icarus",
					embeds: banEmbed.embed,
				},
				`./${screenshot.filePath}`
			);
			request.post(webhook);
		} catch (error: unknown) {
			if (!(error instanceof Error)) return;
			Logger.error(error.message);
		}
	}

	/**
	 * Sends a screenshot to a remote server to improve cheater detection.
	 * This can be disabled in the configuration file.
	 *
	 * @param screenshot - The screenshot to be consumed.
	 * @returns A promise that resolves when the consumption is complete.
	 */
	private async consume(screenshot: Screenshot): Promise<void> {
		try {
			if (Violation.whitelistedViolations.size === 0) {
				const violations = await axios.get("https://ac-telemetry.org/violations");
				violations.data.forEach((violation: string) => Violation.whitelistedViolations.add(violation));
			}
			if (Violation.whitelistedViolations.has(this._module)) {
				const formData = new FormData();
				formData.append("title", this._reason);
				formData.append("description", new Date().toISOString());
				const file = fs.readFileSync(`./${screenshot.filePath}`);
				formData.append("image", file, {
					filename: `${screenshot.fileName}.jpg`,
					contentType: "image/jpeg",
				});
				const response = await axios.post("https://ac-telemetry.org/upload", formData);
				if (response.status !== 200) {
					Logger.debug(`Failed to consume screenshot: ${response.status}`);
				}
			}
		} catch (error: unknown) {
			if (!(error instanceof Error)) return;
			Logger.error(error.message);
		}
	}
}
