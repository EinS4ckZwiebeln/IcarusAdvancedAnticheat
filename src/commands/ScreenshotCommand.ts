import { Config } from "../core/config/Config";
import { Screenshot } from "../web/Screenshot";
import { WebhookRequest } from "../web/WebhookRequest";
import { Command } from "../core/Command";
import { Logger } from "../core/logger/Logger";
import { Parameter } from "../Types";

/**
 * Subcommand class for taking a screenshot and posting it to a Discord webhook.
 */
export class ScreenshotCommand extends Command {
	private readonly _webhook: string;

	/**
	 * Creates a new instance of the ScreenshotCommand class.
	 */
	constructor() {
		const parameters: Parameter[] = [{ name: "id", help: "The id of the player" }];
		super("screenshot", "Takes a screenshot of the players game", parameters, (source: number, args: string[]) => this.onExecute(source, args));
		this._webhook = Config.getConfig().DiscordWebhook;
	}

	/**
	 * Executes the screenshot command.
	 * @param _ The source of the command.
	 * @param args The arguments passed to the command.
	 */
	private async onExecute(source: number, args: string[]): Promise<void> {
		const target: number = Number(args[0]);
		if (isNaN(target)) return;

		if (GetResourceState("screenshot-basic") !== "started") {
			emitNet("chat:addMessage", source, { args: [`^Failed: Screenshot-basic is required for this action.^0`] });
			Logger.debug("Failed to execute screenshot command. Screenshot-basic is not started or missing.");
			return;
		}

		const webhook = Config.getConfig().DiscordWebhook;
		if (!webhook || webhook.length < 1) {
			emitNet("chat:addMessage", source, { args: [`^1Failed: No discord webhook was found.^0`] });
			Logger.debug("Failed to execute screenshot command. No discord webhook was found.");
			return;
		}

		new Screenshot(target, (_: string, path: string) => {
			const request: WebhookRequest = new WebhookRequest(
				{
					username: "Icarus",
				},
				`./${path}`
			);
			request.post(this._webhook);
			emitNet("chat:addMessage", source, { args: [`^3Logged screenshot of player ${target} to the discord webhook.^0`] });
		});
	}
}
