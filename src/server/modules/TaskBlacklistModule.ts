import { Config } from "../core/config/Config";
import { Module } from "../core/Module";
import { Violation } from "../core/Violation";

export class TaskBlacklistModule extends Module {
	private _blacklistedTasks: Set<number> = new Set();

	public onLoad(): void {
		this._blacklistedTasks = new Set(Config.getValue<number[]>(this.config, "blacklistedTasks"));
		this.eventHandler.subscribe("givePedScriptedTaskEvent", this.onGivePedTask.bind(this));
	}

	public onUnload(): void {
		this.eventHandler.unsubscribe("givePedScriptedTaskEvent", this.onGivePedTask.bind(this));
	}

	/**
	 * Handles the event when a player tries to give a weapon to another player.
	 * If the player is not the owner of the entity, the player is banned and the event is cancelled.
	 * @param source The player ID who triggered the event.
	 * @param data The data associated with the event.
	 */
	private onGivePedTask(source: number, data: any): void {
		if (this._blacklistedTasks.has(data.task)) {
			const violation = new Violation(source, "Blacklisted Task [C1]", this.name);
			violation.banPlayer();
			CancelEvent();
		}
	}
}
