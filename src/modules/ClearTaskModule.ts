import { EventHandler } from "../core/handler/EventHandler";
import { Module } from "../core/Module";
import { Violation } from "../core/Violation";

export class ClearTaskModule extends Module {
	public onLoad(): void {
		EventHandler.subscribe("clearPedTasksEvent", (source: number) => this.onClearTask(source));
	}
	public onUnload(): void {
		EventHandler.unsubscribe("clearPedTasksEvent", (source: number) => this.onClearTask(source));
	}

	/**
	 * Bans the player with the given source and cancels the event.
	 * @param source The player's source.
	 */
	private onClearTask(source: number): void {
		const violation = new Violation(source, "ClearPedTask [C1]", this.name);
		violation.banPlayer();
		CancelEvent();
	}
}
