import { Config } from "../config/Config";
import { EventHandler } from "../core/handler/EventHandler";
import { Module } from "../core/Module";
import { Violation } from "../core/Violation";

export class StartProjectileModule extends Module {
	private readonly _projectileCooldown: Map<number, number> = new Map();
	private readonly _projectileCooldownTime: number = Config.getValue(this.config, "projectileCooldown");

	public onLoad(): void {
		EventHandler.subscribe("startProjectileEvent", (source: number, _: any) => this.onProjectileSpam(source));
	}

	public onUnload(): void {
		EventHandler.unsubscribe("startProjectileEvent", (source: number, _: any) => this.onProjectileSpam(source));
	}

	/**
	 * Checks if a player is spamming projectiles and bans them if they are.
	 * @param source The player ID to check for projectile spam.
	 */
	private onProjectileSpam(source: number) {
		if (this._projectileCooldown.has(source)) {
			const lastTime = this._projectileCooldown.get(source);
			if (!lastTime) return;

			if (Math.abs(GetGameTimer() - lastTime) < this._projectileCooldownTime) {
				const violation = new Violation(source, "Projectile Spam [C1]", this.name);
				violation.banPlayer();
			}
		}
		this._projectileCooldown.set(source, GetGameTimer());
	}
}
