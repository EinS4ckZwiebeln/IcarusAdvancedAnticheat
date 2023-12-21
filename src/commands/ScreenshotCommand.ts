import { Config } from "../core/config/Config";
import { Screenshot } from "../web/Screenshot";
import { WebhookRequest } from "../web/WebhookRequest";
import { Command } from "../core/Command";

/**
 * Subcommand class for taking a screenshot and posting it to a Discord webhook.
 */
export class ScreenshotCommand extends Command {
	private readonly _webhook: string;

	/**
	 * Creates a new instance of the ScreenshotCommand class.
	 */
	constructor() {
		super("screenshot", (source: number, args: string[]) => this.onExecute(source, args));
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
