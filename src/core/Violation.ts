import { Config } from "../config/Config";
import { Utility } from "../util/Utility";
import { WebhookRequest } from "../web/WebhookRequest";
import { BanEmbed } from "../web/BanEmbed";
import { Logger } from "../logger/Logger";
import { Screenshot } from "../web/Screenshot";
import { PermissionHandler } from "./handler/PermissionHandler";
import { config } from "../config/ConfigType";

export class Violation {
	private readonly _webhook: string;

	constructor(source: number, reason: string) {
		const config: config = Config.getConfig();
		this._webhook = config.DiscordWebhook;
		this.banPlayer(source, reason);
	}

	/**
	 * Bans a player and logs the reason for the ban.
	 * @param source - The player's server ID.
	 * @param reason - The reason for the ban.
	 * @returns A Promise that resolves when the player is banned.
	 */
	private async banPlayer(source: number, reason: string): Promise<void> {
		if (!PermissionHandler.hasPermission(source)) return;

		this.takeScreenshot(source, reason);
		// Wait 500ms to allow screenshot to be taken
		setTimeout(() => {
			Utility.EXPORTS[Utility.RESOURCE_NAME].BanPlayer(source, reason);
			Logger.debug(`Banned player ${source} for reason: ${reason}`);
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
