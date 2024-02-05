import { FireEvent } from "../Types";
import { Module } from "../core/Module";
import { Violation } from "../core/Violation";
import { Config } from "../core/config/Config";
import { EventHandler } from "../core/handler/EventHandler";
import { Utility } from "../util/Utility";

export class FireModule extends Module {
	private _maxFireDistance: number = 128.0;

	public onLoad(): void {
		this._maxFireDistance = Config.getValue(this.config, "maxFireDistance");
		// Why is the event data object in an nested array here?
		EventHandler.subscribe("fireEvent", (source: number, data: any) => this.onFire(source, data[0][0] as FireEvent));
	}
	public onUnload(): void {
		EventHandler.unsubscribe("fireEvent", (source: number, data: any) => this.onFire(source, data[0][0] as FireEvent));
	}

	/**
	 * Handles the event when a player create a fire.
	 * @param source The player ID who triggered the event.
	 * @param data The data associated with the event.
	 */
	private onFire(source: number, data: FireEvent): void {
		// Return if not on entity or same source as victim
		if (!data.isEntity || source == data.entityGlobalId) return;

		const victim = NetworkGetEntityFromNetworkId(data.entityGlobalId ?? 0);
		if (!DoesEntityExist(victim)) return;

		const ped = GetPlayerPed(source.toString());
		const dist = Utility.getDistance(GetEntityCoords(ped), GetEntityCoords(victim), false);
		// Check if source and victim are too far off for it to be a legit fire event
		if (dist > this._maxFireDistance) {
			const violation = new Violation(source, "Fire Event [C1]", this.name);
			violation.banPlayer();
			CancelEvent();
		}
	}
}
