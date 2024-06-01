import Filter from "bad-words";
import { Module } from "../core/Module";
import { Config } from "../core/config/Config";
import { EventHandler } from "../core/handler/EventHandler";
import { container } from "tsyringe";

export class ChatProfanityModule extends Module {
	private _filter: Filter;
	private _warningMessage: string;

	constructor() {
		super(container.resolve(Config), container.resolve(EventHandler));
	}

	public onLoad(): void {
		this._filter = new Filter({
			replaceRegex: /[A-Za-z0-9가-힣_]/g,
			emptyList: !this.config.getValue(this.config.getConfig(), "useDefaultBlacklist") || false,
		});
		this._warningMessage = this.config.getValue(this.config.getConfig(), "warningMsg");
		const words: string[] = Array.from(this.config.getValue(this.config.getConfig(), "badWords"));
		this._filter.addWords(...words);
		this.eventHandler.subscribe("chatMessage", this.onChatMessage.bind(this));
	}

	public onUnload(): void {
		this.eventHandler.unsubscribe("chatMessage", this.onChatMessage.bind(this));
	}

	/**
	 * Handles a chat message and checks if it contains profanity.
	 * If it does, emits a warning message and cancels the event.
	 * @param source - The source of the chat message.
	 * @param message - The chat message to be checked for profanity.
	 */
	private onChatMessage(source: string, _: unknown, message: string): void {
		if (this._filter.isProfane(message)) {
			emitNet("chat:addMessage", source, { args: [this._warningMessage] });
			CancelEvent();
		}
	}
}
