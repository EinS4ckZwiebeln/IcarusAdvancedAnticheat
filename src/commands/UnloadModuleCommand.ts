import { ModuleLoader } from "../core/ModuleLoader";
import { ICommand } from "../core/Command";
import { Logger } from "../core/logger/Logger";
import { Parameter } from "../Types";

export class UnloadModuleCommand implements ICommand {
	public readonly name: string = "unload";
	public readonly description: string = "Manually unloads a module";
	public readonly parameters: Parameter[] = [{ name: "moduleName", help: "The name of the module to unload" }];

	/**
	 * Executes the command logic.
	 * @param source The player who executed the command.
	 */
	public async onExecute(source: number, args: string[]): Promise<void> {
		const moduleName: string = args[0];
		try {
			const module = ModuleLoader.getModule(moduleName);
			if (module) {
				ModuleLoader.unloadModule(module);
				emitNet("chat:addMessage", source, { args: [`^3Unloaded ${moduleName} successfully.^0`] });
			} else {
				emitNet("chat:addMessage", source, { args: [`^1Couldn't find module '${moduleName}', are you sure it exists?.^0`] });
			}
		} catch (err: unknown) {
			if (!(err instanceof Error)) return;
			Logger.error(err.message);
			emitNet("chat:addMessage", source, { args: [`^1Failed to unload ${moduleName}.^0`] });
		}
	}
}
