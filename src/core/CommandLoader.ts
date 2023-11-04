import { PermissionHandler } from "./handler/PermissionHandler";
import { Logger } from "../logger/Logger";
import { SubCommand } from "./SubCommand";

/**
 * CommandLoader class that registers and loads sub-commands for a main command.
 */
export class CommandLoader {
	private readonly _commandName: string;
	private readonly _subCommands: Map<string, Function> = new Map();

	constructor(commandName: string) {
		this._commandName = commandName;
		this.registerMainCommand();
	}

	/**
	 * Initializes the main command and registers its sub-commands.
	 * @param {string} commandName - The name of the main command.
	 */
	private registerMainCommand(): void {
		RegisterCommand(
			this._commandName,
			(source: number, args: string[]) => {
				// Ensure player has correct permission for the command
				if (!PermissionHandler.hasPermission(source)) return;

				try {
					const subCommand: string = args[0];
					if (!subCommand) return;

					const callback = this._subCommands.get(subCommand);
					// Remove the first argument since it's the main-command
					if (callback) callback(source, args.slice(1));
				} catch (err: any) {
					Logger.error(err.message);
				}
			},
			false
		);
	}

	/**
	 * Registers a sub-command for the main command.
	 * @param {SubCommand} command - The sub-command to register.
	 */
	public registerCommand(command: SubCommand): void {
		this._subCommands.set(command.name, command.callback);
		Logger.debug(`Registered sub-command ${command.name}`);
	}
}
