import { EventHandler } from "../core/handler/EventHandler";
import { Module } from "../core/Module";
import { Violation } from "../core/Violation";
import { Config } from "../core/config/Config";
import { ExplosionEvent } from "../Types";
import { EntityExplosionTypes } from "../enum/ExplosionTypes";

export class ExplosionFilterModule extends Module {
	private readonly _entityExplosionTypes: Set<number> = new Set<number>(
		Object.values(EntityExplosionTypes).filter((value) => typeof value === "number") as number[]
	);
	private _whitelistedExplosionTypes: Set<number> = new Set();
	private _explosionSpoofer: boolean = false;

	public onLoad(): void {
		this._explosionSpoofer = Config.getValue(this.config, "explosionSpoofer");
		this._whitelistedExplosionTypes = new Set(Config.getValue(this.config, "whitelistedExplosionTypes"));
		EventHandler.subscribe("explosionEvent", [this.onExplosion.bind(this), this.onExplosionSpoof.bind(this)]);
	}

	public onUnload(): void {
		EventHandler.unsubscribe("explosionEvent", [this.onExplosion.bind(this), this.onExplosionSpoof.bind(this)]);
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

	/**
	 * Handles the explosion spoof event.
	 * @param source - The source of the explosion.
	 * @param data - The explosion event data.
	 */
	private onExplosionSpoof(source: number, data: ExplosionEvent): void {
		if (this._explosionSpoofer && this._entityExplosionTypes.has(data.explosionType) && data.f210 === 0) {
			const violation = new Violation(source, "Explosion [C4]", this.name);
			violation.banPlayer();
		}
	}
}
