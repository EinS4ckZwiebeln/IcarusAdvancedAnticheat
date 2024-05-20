import { ModuleLoader } from "../core/ModuleLoader";
import { Command } from "../core/Command";
import { Logger } from "../core/logger/Logger";

export class LoadModuleCommand extends Command {
	constructor() {
		super("load", "Manually loads a module", [{ name: "moduleName", help: "The name of the module to load" }]);
	}

	/**
	 * Executes the command logic.
	 * @param source The player who executed the command.
	 */
	public async onExecute(source: number, args: string[]): Promise<void> {
		const moduleName: string = args[0];
		try {
			const module = ModuleLoader.getModule(moduleName) || ModuleLoader.getUnloadedModule(moduleName);
			if (module) {
				ModuleLoader.loadModule(module);
				this.writeToChat(source, `^3Loaded ${moduleName} successfully.^0`);
			} else {
				this.writeToChat(source, `^1Couldn't find module '${moduleName}', are you sure it exists?.^0`);
			}
		} catch (err: unknown) {
			if (!(err instanceof Error)) return;
			Logger.error(err.message);
			this.writeToChat(source, `^1Failed to load ${moduleName}.^0`);
		}
	}
}
