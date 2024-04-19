import { Config } from "../core/config/Config";
import { ScreenshotRequest } from "../web/ScreenshotRequest";
import { WebhookRequest } from "../web/WebhookRequest";
import { ICommand } from "../core/Command";
import { Logger } from "../core/logger/Logger";
import { Parameter } from "../Types";
import { Utility } from "../util/Utility";

/**
 * Subcommand class for taking a screenshot and posting it to a Discord webhook.
 */
export class ScreenshotCommand implements ICommand {
	public readonly name: string = "screenshot";
	public readonly description: string = "Takes a screenshot of the players game";
	public readonly parameters: Parameter[] = [{ name: "id", help: "The id of the player" }];
	// The webhook to post the screenshot to.
	private readonly _webhook: string = Config.getConfig().DiscordWebhook;

	/**
	 * Executes the screenshot command.
	 * @param _ The source of the command.
	 * @param args The arguments passed to the command.
	 */
	public async onExecute(source: number, args: string[]): Promise<void> {
		const target: number = Number(args[0]);
		if (isNaN(target)) return;

		if (GetResourceState("screenshot-basic") !== "started") {
			emitNet("chat:addMessage", source, { args: [`^Failed: Screenshot-basic is required for this action.^0`] });
			Logger.debug("Failed to execute screenshot command. Screenshot-basic is not started or missing.");
			return;
		}

		const webhook = Config.getConfig().DiscordWebhook;
		if (Utility.isNullOrEmtpy(webhook)) {
			emitNet("chat:addMessage", source, { args: [`^1Failed: No discord webhook was found.^0`] });
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
		request.post(this._webhook);
		emitNet("chat:addMessage", source, {
			args: [`^3Logged screenshot of player ${target} to the discord webhook.^0`],
		});
	}
}
