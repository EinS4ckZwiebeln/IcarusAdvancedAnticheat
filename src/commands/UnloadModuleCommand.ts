import { ModuleLoader } from "../core/ModuleLoader";
import { Command } from "../core/Command";
import { Logger } from "../core/logger/Logger";

export class UnloadModuleCommand extends Command {
	/**
	 * Creates a new instance of the UnloadModuleCommand class.
	 */
	constructor() {
		super("unload", (source: number, args: string[]) => this.onExecute(source, args));
	}

	/**
	 * Executes the command logic.
	 * @param source The player who executed the command.
	 */
	private async onExecute(source: number, args: string[]): Promise<void> {
		const moduleName: string = args[0];
		try {
			ModuleLoader.getModule(moduleName)?.onUnload();
			emitNet("chat:addMessage", source, { args: [`^3Unloaded ${moduleName} successfully.^0`] });
		} catch (err: any) {
			Logger.error(err);
			emitNet("chat:addMessage", source, { args: [`^1Failed to unload ${moduleName}.^0`] });
		}
	}
}
