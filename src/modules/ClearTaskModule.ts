import { EventHandler } from "../core/handler/EventHandler";
import { Module } from "../core/Module";
import { Violation } from "../core/Violation";

export class ClearTaskModule extends Module {
	public onLoad(): void {
		EventHandler.subscribe("clearPedTasksEvent", this.onClearTask.bind(this));
	}
	public onUnload(): void {
		EventHandler.unsubscribe("clearPedTasksEvent", this.onClearTask.bind(this));
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
