import { ModuleLoader } from "../core/ModuleLoader";
import { Command } from "../core/Command";
import { Logger } from "../core/logger/Logger";

export class LoadModuleCommand extends Command {
	/**
	 * Creates a new instance of the LoadModuleCommand class.
	 */
	constructor() {
		const parameters: Parameter[] = [{ name: "moduleName", help: "The name of the module to load" }];
		super("load", "Manually loads a module", parameters, (source: number, args: string[]) => this.onExecute(source, args));
	}

	/**
	 * Executes the command logic.
	 * @param source The player who executed the command.
	 */
	private async onExecute(source: number, args: string[]): Promise<void> {
		const moduleName: string = args[0];
		try {
			ModuleLoader.getModule(moduleName)?.onLoad();
			emitNet("chat:addMessage", source, { args: [`^3Loaded ${moduleName} successfully.^0`] });
		} catch (err: any) {
			Logger.error(err);
			emitNet("chat:addMessage", source, { args: [`^1Failed to load ${moduleName}.^0`] });
		}
	}
}
