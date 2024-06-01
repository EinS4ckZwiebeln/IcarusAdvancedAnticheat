import { container } from "tsyringe";
import { FireEvent } from "../Types";
import { Module } from "../core/Module";
import { Violation } from "../core/Violation";
import { Config } from "../core/config/Config";
import { EventHandler } from "../core/handler/EventHandler";
import { Utility } from "../util/Utility";

export class FireModule extends Module {
	private _maxFireDistance: number = 128.0;

	constructor() {
		super(container.resolve(Config), container.resolve(EventHandler));
	}

	public onLoad(): void {
		this._maxFireDistance = this.config.getValue(this.config.getConfig(), "maxFireDistance");
		this.eventHandler.subscribe("fireEvent", this.onFire.bind(this));
	}
	public onUnload(): void {
		this.eventHandler.unsubscribe("fireEvent", this.onFire.bind(this));
	}

	/**
	 * Handles the event when a player create a fire.
	 * @param source The player ID who triggered the event.
	 * @param data The data associated with the event.
	 */
	private onFire(source: number, rawData: [[FireEvent]]): void {
		const data: FireEvent = rawData[0][0]; // Why is the event data object in an nested array here?
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
