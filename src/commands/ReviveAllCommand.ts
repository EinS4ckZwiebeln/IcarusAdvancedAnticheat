import { Command } from "../core/Command";

/**
 * Represents a command that revive all players on the server.
 */
export class ReviveAllCommand extends Command {
	/**
	 * Creates a new instance of the ReviveAllCommand class.
	 */
	constructor() {
		super("reviveAll", "Revive all players on the server", [], (source: number, _: string[]) => this.onExecute(source));
	}

	/**
	 * Executes the command logic.
	 * @param source The player who executed the command.
	 */
	private async onExecute(source: number): Promise<void> {
		emitNet("icarus:reviveMyself", -1);
		emitNet("chat:addMessage", source, { args: [`^3Revived ${getPlayers().length} player(s).^0`] });
	}
}
