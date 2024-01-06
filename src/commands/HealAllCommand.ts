import { Command } from "../core/Command";

/**
 * Represents a command that heals all players on the server.
 */
export class HealAllCommand extends Command {
	/**
	 * Creates a new instance of the HealAllCommand class.
	 */
	constructor() {
		super("healAll", "Heals all players on the server", [], (source: number, _: string[]) => this.onExecute(source));
	}

	/**
	 * Executes the command logic.
	 * @param source The player who executed the command.
	 */
	private async onExecute(source: number): Promise<void> {
		emitNet("icarus:healMyself", -1);
		emitNet("chat:addMessage", source, { args: [`^3Healed ${getPlayers().length} player(s).^0`] });
	}
}
