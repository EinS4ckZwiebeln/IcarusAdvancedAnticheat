import { Config } from "../config/Config";
import { Utility } from "../util/Utility";
import { WebhookRequest } from "../web/WebhookRequest";
import { BanEmbed } from "../web/BanEmbed";
import { Logger } from "../logger/Logger";
import { Screenshot } from "../web/Screenshot";
import { PermissionHandler } from "./handler/PermissionHandler";
import { ExcuseHandler } from "./handler/ExcuseHandler";

export class Violation {
	private readonly _webhook: string = Config.getConfig().DiscordWebhook;
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
		if (!PermissionHandler.hasPermission(source) || ExcuseHandler.isExcused(this._source, this._module)) return;

		this.takeScreenshot(source, this._reason);
		// Wait 500ms to allow screenshot to be taken
		setTimeout(() => {
			Utility.EXPORTS[Utility.RESOURCE_NAME].BanPlayer(source, this._reason);
			Logger.debug(`Banned player ${source} for reason: ${this._reason}`);
		}, 500);
	}

	/**
	 * Takes a screenshot of the player and sends it to a Discord webhook along with the reason for the ban.
	 * @param source - The player ID to take a screenshot of.
	 * @param reason - The reason for the ban.
	 */
	private takeScreenshot(source: number, reason: string): void {
		if (GetResourceState("screenshot-basic") !== "started" || !this._webhook) {
			Logger.debug("Failed to send webhook request. Screenshot-basic resource is not started or no webhook is configured.");
			return;
		}

		new Screenshot(source, (name: string, path: string) => {
			const banEmbed: BanEmbed = new BanEmbed(source, reason, `${name}.jpg`);
			const request: WebhookRequest = new WebhookRequest(
				{
					username: "Icarus",
					embeds: banEmbed.embed,
				},
				`./${path}`
			);
			request.post(this._webhook);
		});
	}
}
