import { PermissionHandler } from "./handler/PermissionHandler";
import { Logger } from "./logger/Logger";
import { Command } from "./Command";
import { EventHandler } from "./handler/EventHandler";
import { ChatSuggestion } from "./ChatSuggestion";

export class CommandLoader {
	private static readonly _chatSuggestions: ChatSuggestion[] = [];
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
		this._chatSuggestions.push(new ChatSuggestion(command.name, command.description, command.parameters));
		Logger.debug(`Registered command ${command.name}`);
	}

	public static registerChatSuggestions(): void {
		setImmediate(() => {
			EventHandler.subscribe("respawnPlayerPedEvent", (source: number) => {
				this._chatSuggestions.forEach((suggestion: ChatSuggestion) => {
					emitNet("chat:addSuggestion", source, `/${suggestion.command}`, suggestion.description, suggestion.parameters);
				});
			});
		});
	}
}
