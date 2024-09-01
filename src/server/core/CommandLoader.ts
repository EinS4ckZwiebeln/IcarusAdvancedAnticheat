import { PermissionHandler } from "./handler/PermissionHandler";
import { Logger } from "./logger/Logger";
import { Command } from "./Command";
import { EventHandler } from "./handler/EventHandler";
import { ChatSuggestion } from "../Types";
import { inject, singleton } from "tsyringe";

@singleton()
export class CommandLoader {
	private readonly _chatSuggestions: ChatSuggestion[] = [];

	constructor(
		@inject(PermissionHandler) private readonly _permissionHandler: PermissionHandler,
		@inject(EventHandler) private readonly _eventHandler: EventHandler
	) {}

	/**
	 * Registers a command into the command loader.
	 * @param command The Command to be registered.
	 */
	public registerCommand(command: Command): void {
		RegisterCommand(
			command.name,
			(source: number, args?: string[]) => {
				// Ensure player has correct permission for the command
				if (!this._permissionHandler.hasPermission(source)) {
					emitNet("chat:addMessage", source, { args: [`^1You are lacking permission to execute this command.^0`] });
					Logger.debug(`Player ${source} attempted to execute command "${command.name}" without permission.`);
					return;
				}
				try {
					command.onExecute(source, args);
					Logger.debug(`Executed command ${command.name} with args: ${args?.toString()}`);
				} catch (err: unknown) {
					if (!(err instanceof Error)) return;
					Logger.error(err.message);
				}
			},
			false
		);
		const suggestion: ChatSuggestion = { command: command.name, description: command.description, parameters: command.parameters };
		this._chatSuggestions.push(suggestion);
		Logger.debug(`Registered command ${command.name}`);
	}

	public registerChatSuggestions(): void {
		this._eventHandler.subscribe("respawnPlayerPedEvent", (source: number) => {
			this._chatSuggestions.forEach((suggestion: ChatSuggestion) => {
				emitNet("chat:addSuggestion", source, `/${suggestion.command}`, suggestion.description, suggestion.parameters);
			});
		});
	}
}
