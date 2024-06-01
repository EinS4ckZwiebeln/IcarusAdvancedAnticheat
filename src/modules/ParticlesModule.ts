import { Violation } from "../core/Violation";
import { Module } from "../core/Module";
import { Config } from "../core/config/Config";
import { EventHandler } from "../core/handler/EventHandler";
import { PtFxEvent } from "../Types";
import { container } from "tsyringe";

export class ParticlesModule extends Module {
	private _maxScale = -1;

	constructor() {
		super(container.resolve(Config), container.resolve(EventHandler));
	}

	public onLoad(): void {
		this._maxScale = this.config.getValue(this.config.getConfig(), "maxParticleScale") + 0.001; // Add 0.001 to the value to account for floating point errors.
		this.eventHandler.subscribe("ptFxEvent", this.onParticle.bind(this));
	}

	public onUnload(): void {
		this.eventHandler.unsubscribe("ptFxEvent", this.onParticle.bind(this));
	}

	/**
	 * Handles the particle event.
	 * @param source - The source of the particle event.
	 * @param isOnEntity - Whether the particle is on an entity.
	 * @param entityNetId - The network ID of the entity the particle is on.
	 * @param scale - The scale of the particle.
	 */
	private onParticle(source: number, data: PtFxEvent): void {
		if (data.isOnEntity && data.entityNetId > 0) {
			const owner: number = NetworkGetEntityOwner(NetworkGetEntityFromNetworkId(data.entityNetId));
			if (owner === source) return;

			const violation = new Violation(source, "Ptfx [C1]", this.name);
			violation.banPlayer();
			CancelEvent();
		}
		if (data.scale > this._maxScale) {
			const violation = new Violation(source, "Ptfx [C2]", this.name);
			violation.banPlayer();
			CancelEvent();
		}
	}
}
