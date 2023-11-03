import { Violation } from "../core/Violation";
import { Module } from "../core/Module";
import { Config } from "../config/Config";
import { EventHandler } from "../core/handler/EventHandler";

export class ParticlesModule extends Module {
	private _maxScale = -1;

	public onLoad(): void {
		this._maxScale = Config.getValue(this.config, "maxParticleScale") + 0.001; // Add 0.001 to the value to account for floating point errors.
		EventHandler.subscribe("ptFxEvent", (source: number, data: any) => this.onParticle(source, data.isOnEntity, data.entityNetId, data.scale));
	}

	public onUnload(): void {
		EventHandler.unsubscribe("ptFxEvent", (source: number, data: any) => this.onParticle(source, data.isOnEntity, data.entityNetId, data.scale));
	}

	private onParticle(source: number, isOnEntity: boolean, entityNetId: number, scale: number): void {
		if (isOnEntity && entityNetId > 0) {
			const owner: number = NetworkGetEntityOwner(NetworkGetEntityFromNetworkId(entityNetId));
			if (owner != source) {
				const violation = new Violation(source, "Ptfx [C1]", this.name);
				violation.banPlayer();
				CancelEvent();
			}
		}
		if (scale > this._maxScale) {
			const violation = new Violation(source, "Ptfx [C2]", this.name);
			violation.banPlayer();
			CancelEvent();
		}
	}
}