import { EventHandler } from "../core/handler/EventHandler";
import { Module } from "../core/Module";
import { Violation } from "../core/Violation";
import { Config } from "../config/Config";
import { Utility } from "../util/Utility";

export class ExplosionFilterModule extends Module {
	private _whitelistedExplosionTypes: Set<number> = new Set();

	public onLoad(): void {
		const types: string[] = Array.from(Config.getValue(this.config, "whitelistedExplosionTypes"));
		this._whitelistedExplosionTypes = new Set(Utility.hashify(types));
		EventHandler.subscribe("explosionEvent", (source: number, data: any) => this.onExplosion(source, data));
	}

	public onUnload(): void {
		EventHandler.unsubscribe("explosionEvent", (source: number, data: any) => this.onExplosion(source, data));
	}

	/**
	 * Handles explosion events and bans players if they don't meet certain criteria.
	 * @param source - The source of the explosion event.
	 * @param data - The data associated with the explosion event.
	 */
	private onExplosion(source: number, data: any): void {
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
