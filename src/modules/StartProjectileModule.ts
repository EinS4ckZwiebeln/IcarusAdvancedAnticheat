import { Config } from "../core/config/Config";
import { EventHandler } from "../core/handler/EventHandler";
import { Module } from "../core/Module";
import { Violation } from "../core/Violation";
import { Utility } from "../util/Utility";

export class StartProjectileModule extends Module {
	private readonly _projectileCooldown: Map<number, number> = new Map();
	private readonly _projectileCooldownTime: number = Config.getValue(this.config, "projectileCooldown");
	private readonly _blockVehicleWeapons: boolean = Config.getValue(this.config, "blockVehicleWeapons");

	public onLoad(): void {
		EventHandler.subscribe("startProjectileEvent", (source: number, data: any) => this.onProjectileSpam(source, data.weaponHash));
	}

	public onUnload(): void {
		EventHandler.unsubscribe("startProjectileEvent", (source: number, data: any) => this.onProjectileSpam(source, data.weaponHash));
	}

	/**
	 * Checks if a player is spamming projectiles and bans them if they are.
	 * @param source The player ID to check for projectile spam.
	 */
	private onProjectileSpam(source: number, weapon: number) {
		// Check if the player is spamming projectiles
		if (this._projectileCooldown.has(source)) {
			const lastTime = this._projectileCooldown.get(source);
			if (!lastTime) return;

			if (Math.abs(GetGameTimer() - lastTime) < this._projectileCooldownTime) {
				const violation = new Violation(source, "Projectile Spam [C1]", this.name);
				violation.banPlayer();
			}
		}
		this._projectileCooldown.set(source, GetGameTimer());
		// Check if the weapon is a vehicle weapon
		if (this._blockVehicleWeapons && Utility.WEAPONS_VEHICLE.has(weapon)) {
			const violation = new Violation(source, "Projectile Weapon [C2]", this.name);
			violation.banPlayer();
		}
	}
}
