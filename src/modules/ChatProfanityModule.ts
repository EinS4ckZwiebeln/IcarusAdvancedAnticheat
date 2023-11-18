import Filter from "bad-words";
import { Module } from "../core/Module";
import { Config } from "../core/config/Config";
import { EventHandler } from "../core/handler/EventHandler";

export class ChatProfanityModule extends Module {
	private readonly filter = new Filter({ replaceRegex: /[A-Za-z0-9가-힣_]/g, emptyList: !Config.getValue(this.config, "useDefaultBlacklist") || false });
	private warningMessage: string = Config.getValue(this.config, "warningMsg");

	public onLoad(): void {
		const words: string[] = Array.from(Config.getValue(this.config, "badWords"));
		this.filter.addWords(...words);
		EventHandler.subscribe("chatMessage", (source: string, _: string, message: string) => this.onChatMessage(source, message));
	}

	public onUnload(): void {
		EventHandler.unsubscribe("chatMessage", (source: string, _: string, message: string) => this.onChatMessage(source, message));
	}

	/**
	 * Handles a chat message and checks if it contains profanity.
	 * If it does, emits a warning message and cancels the event.
	 * @param source - The source of the chat message.
	 * @param message - The chat message to be checked for profanity.
	 */
	private onChatMessage(source: string, message: string): void {
		if (this.filter.isProfane(message)) {
			emitNet("chat:addMessage", source, { args: [this.warningMessage] });
			CancelEvent();
		}
	}
}
