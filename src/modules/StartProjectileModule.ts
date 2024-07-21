import { Config } from "../core/config/Config";
import { Module } from "../core/Module";
import { Violation } from "../core/Violation";
import { StartProjectileEvent } from "../Types";
import { Utility } from "../util/Utility";

export class StartProjectileModule extends Module {
	private readonly _projectileCooldown: Map<number, number> = new Map();
	private _projectileCooldownTime: number = 0;
	private _blockVehicleWeapons: boolean = true;

	public onLoad(): void {
		this._projectileCooldownTime = Config.getValue<number>(this.config, "projectileCooldown");
		this._blockVehicleWeapons = Config.getValue<boolean>(this.config, "blockVehicleWeapons");
		this.eventHandler.subscribe("startProjectileEvent", this.onProjectileSpam.bind(this));
	}

	public onUnload(): void {
		this.eventHandler.unsubscribe("startProjectileEvent", this.onProjectileSpam.bind(this));
	}

	/**
	 * Checks if a player is spamming projectiles and bans them if they are.
	 * @param source The player ID to check for projectile spam.
	 */
	private onProjectileSpam(source: number, data: StartProjectileEvent) {
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
		if (this._blockVehicleWeapons && Utility.WEAPONS_VEHICLE.has(data.weaponHash)) {
			const violation = new Violation(source, "Projectile Weapon [C2]", this.name);
			violation.banPlayer();
		}
	}
}
