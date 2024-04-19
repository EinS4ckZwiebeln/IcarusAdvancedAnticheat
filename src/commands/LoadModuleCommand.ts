import { ModuleLoader } from "../core/ModuleLoader";
import { ICommand } from "../core/Command";
import { Logger } from "../core/logger/Logger";
import { Parameter } from "../Types";

export class LoadModuleCommand implements ICommand {
	public readonly name: string = "load";
	public readonly description: string = "Manually loads a module";
	public readonly parameters: Parameter[] = [{ name: "moduleName", help: "The name of the module to load" }];

	/**
	 * Executes the command logic.
	 * @param source The player who executed the command.
	 */
	public async onExecute(source: number, args: string[]): Promise<void> {
		const moduleName: string = args[0];
		try {
			const module = ModuleLoader.getModule(moduleName);
			if (!module) return;
			ModuleLoader.loadModule(module);
			emitNet("chat:addMessage", source, { args: [`^3Loaded ${moduleName} successfully.^0`] });
		} catch (err: unknown) {
			if (!(err instanceof Error)) return;
			Logger.error(err.message);
			emitNet("chat:addMessage", source, { args: [`^1Failed to load ${moduleName}.^0`] });
		}
	}
}
