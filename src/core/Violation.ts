import { Config } from "./config/Config";
import { Utility } from "../util/Utility";
import { WebhookRequest } from "../web/WebhookRequest";
import { BanEmbed } from "../web/BanEmbed";
import { Logger } from "./logger/Logger";
import { ScreenshotRequest } from "../web/ScreenshotRequest";
import { PermissionHandler } from "./handler/PermissionHandler";
import { ExcuseHandler } from "./handler/ExcuseHandler";

export class Violation {
	private readonly _webhook: string = Config.getConfig().DiscordWebhook;
	// Required data to issue a ban
	private readonly _source: number;
	private readonly _reason: string;
	private readonly _module: string;

	constructor(source: number, reason: string, module: string) {
		this._source = source;
		this._reason = reason;
		this._module = module;
	}

	/**
	 * Bans a player and logs the reason for the ban.
	 * @param source - The player's server ID.
	 * @param reason - The reason for the ban.
	 * @returns A Promise that resolves when the player is banned.
	 */
	public async banPlayer(): Promise<void> {
		if (PermissionHandler.hasPermission(this._source) || ExcuseHandler.isExcused(this._source, this._module)) return;

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
		if (!this._webhook || this._webhook.length < 1) {
			Logger.debug("Failed to send webhook request. No webhook is configured.");
			return;
		}
		if (GetResourceState("screenshot-basic") !== "started") {
			Logger.debug("Failed to send webhook request. Screenshot-basic is not started or missing.");
			return;
		}
		const screenshotRequest = new ScreenshotRequest(this._source);
		const screenshot = await screenshotRequest.request();

		const banEmbed: BanEmbed = new BanEmbed(this._source, this._reason, `${screenshot.fileName}.jpg`);
		const request: WebhookRequest = new WebhookRequest(
			{
				username: "Icarus",
				embeds: banEmbed.embed,
			},
			`./${screenshot.filePath}`
		);
		request.post(this._webhook);
	}
}
