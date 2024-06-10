import { Config } from "../core/config/Config";
import { ScreenshotRequest } from "../web/ScreenshotRequest";
import { WebhookRequest } from "../web/WebhookRequest";
import { Command } from "../core/Command";
import { Logger } from "../core/logger/Logger";
import { Utility } from "../util/Utility";
import { container, injectable } from "tsyringe";

@injectable()
export class ScreenshotCommand extends Command {
	private readonly _config: Config;

	constructor() {
		super("screenshot", "Takes a screenshot of the players game", [{ name: "id", help: "The id of the player" }]);
		this._config = container.resolve(Config);
	}

	/**
	 * Executes the screenshot command.
	 * @param _ The source of the command.
	 * @param args The arguments passed to the command.
	 */
	public async onExecute(source: number, args: string[]): Promise<void> {
		const target: number = Number(args[0]);
		if (isNaN(target)) return;

		if (GetResourceState("screenshot-basic") !== "started") {
			this.writeToChat(source, `^1Failed: Screenshot-basic is required for this action.^0`);
			Logger.debug("Failed to execute screenshot command. Screenshot-basic is not started or missing.");
			return;
		}

		const webhook = this._config.getConfig().DiscordWebhook;
		if (Utility.isNullOrEmtpy(webhook)) {
			this.writeToChat(source, `^1Failed: No discord webhook was found.^0`);
			Logger.debug("Failed to execute screenshot command. No discord webhook was found.");
			return;
		}

		const screenshotRequest = new ScreenshotRequest(target);
		const screenshot = await screenshotRequest.request();
		const request: WebhookRequest = new WebhookRequest(
			{
				username: "Icarus",
			},
			`./${screenshot.filePath}`
		);
		request.post(webhook);
		this.writeToChat(source, `^3Logged screenshot of player ${target} to the discord webhook.^0`);
	}
}
