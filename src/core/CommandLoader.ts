import { PermissionHandler } from "./handler/PermissionHandler";
import { Logger } from "./logger/Logger";
import { Command } from "./Command";

export class CommandLoader {
	/**
	 * Registers a command into the command loader.
	 * @param command The Command to be registered.
	 */
	public static registerCommand(command: Command): void {
		RegisterCommand(
			command.name,
			(source: number, args: string[]) => {
				// Ensure player has correct permission for the command
				if (!PermissionHandler.hasPermission(source)) return;

				try {
					if (command.callback) command.callback(source, args);
				} catch (err: any) {
					Logger.error(err.message);
				}
			},
			false
		);
		Logger.debug(`Registered command ${command.name}`);
	}
}
