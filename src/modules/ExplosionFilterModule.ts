import { EventHandler } from "../core/handler/EventHandler";
import { Module } from "../core/Module";
import { Violation } from "../core/Violation";
import { Config } from "../core/config/Config";
import { Utility } from "../util/Utility";
import { ExplosionEvent } from "../Types";

export class ExplosionFilterModule extends Module {
	private _whitelistedExplosionTypes: Set<number> = new Set();

	public onLoad(): void {
		this._whitelistedExplosionTypes = new Set(
			Utility.hashify(Config.getValue(this.config, "whitelistedExplosionTypes"))
		);
		EventHandler.subscribe("explosionEvent", this.onExplosion.bind(this));
	}

	public onUnload(): void {
		EventHandler.unsubscribe("explosionEvent", this.onExplosion.bind(this));
	}

	/**
	 * Handles explosion events and bans players if they don't meet certain criteria.
	 * @param source - The source of the explosion event.
	 * @param data - The data associated with the explosion event.
	 */
	private onExplosion(source: number, data: ExplosionEvent): void {
		if (!this._whitelistedExplosionTypes.has(data.explosionType)) {
			const violation = new Violation(source, "Explosion [C1]", this.name);
			violation.banPlayer();
			return;
		}
		if (data.damageScale > 1.0) {
			const violation = new Violation(source, "Explosion [C2]", this.name);
			violation.banPlayer();
			return;
		}
		if (data.isInvisible) {
			const violation = new Violation(source, "Explosion [C3]", this.name);
			violation.banPlayer();
			return;
		}
	}
}
