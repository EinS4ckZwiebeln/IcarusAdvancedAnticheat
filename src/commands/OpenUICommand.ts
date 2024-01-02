import { Command } from "../core/Command";
import { Logger } from "../core/logger/Logger";

export class OpenUICommand extends Command {
	/**
	 * Creates a new instance of the OpenUICommand class.
	 */
	constructor() {
		super("icarus", "Opens the built-in UI", [], (source: number) => this.onExecute(source));
	}

	/**
	 * Executes the command logic.
	 * @param source The player who executed the command.
	 */
	private async onExecute(source: number): Promise<void> {
		try {
			emitNet("icarus:openUI", source);
		} catch (err: any) {
			Logger.error(err);
			emitNet("chat:addMessage", source, { args: [`^1Failed to open the UI.^0`] });
		}
	}
}
