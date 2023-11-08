import { Module } from "../core/Module";
import { Weapons } from "../util/enum/Weapons";
import { Violation } from "../core/Violation";
import { Config } from "../config/Config";
import { Utility } from "../util/Utility";
import { EventHandler } from "../core/handler/EventHandler";

export class TazerModule extends Module {
	private _onCooldown: Set<number> = new Set<number>();
	private _tazerCooldown: number = 14000;
	private _tazerRange: number = 12;

	public onLoad(): void {
		this._tazerRange = Config.getValue(this.config, "maxDistance");
		this._tazerCooldown = Config.getValue(this.config, "tazerCooldown");
		EventHandler.subscribe("weaponDamageEvent", (source: number, data: any) => this.onTazerReach(source, data.hitGlobalId || data.hitGlobalIds[0], data.weaponType));
		EventHandler.subscribe("weaponDamageEvent", (source: number, data: any) => this.onTazerCooldown(source, data.weaponType));
		EventHandler.subscribe("weaponDamageEvent", (_: number, data: any) => this.onTazerRagdoll(data.hitGlobalId || data.hitGlobalIds[0], data.weaponType));
	}

	public onUnload(): void {
		EventHandler.unsubscribe("weaponDamageEvent", (source: number, data: any) => this.onTazerReach(source, data.hitGlobalId || data.hitGlobalIds[0], data.weaponType));
		EventHandler.unsubscribe("weaponDamageEvent", (source: number, data: any) => this.onTazerCooldown(source, data.weaponType));
		EventHandler.unsubscribe("weaponDamageEvent", (_: number, data: any) => this.onTazerRagdoll(data.hitGlobalId || data.hitGlobalIds[0], data.weaponType));
	}

	/**
	 * Handles the event when a player uses a tazer and checks if the target is within range.
	 * If the target is out of range, the player is banned and the event is cancelled.
	 * @param source - The player who used the tazer.
	 * @param target - The player who was targeted by the tazer.
	 * @param weaponType - The type of weapon used (should be a tazer).
	 */
	private onTazerReach(source: number, target: number, weaponType: number): void {
		switch (weaponType) {
			case Weapons.WEAPON_STUNGUN:
			case Weapons.WEAPON_STUNGUN_MP:
				const killer: number = GetPlayerPed(source.toString());
				const victim: number = NetworkGetEntityFromNetworkId(target);
				if (!DoesEntityExist(victim) || !IsPedAPlayer(victim)) return;

				if (Utility.getDistance(GetEntityCoords(killer), GetEntityCoords(victim), true) > this._tazerRange) {
					const violation = new Violation(source, "Tazer Reach [C1]", this.name);
					violation.banPlayer();
					CancelEvent();
				}
				break;
			default:
				return;
		}
	}

	/**
	 * Handles the tazer cooldown for a player.
	 * @param source - The player ID.
	 * @param weaponType - The type of weapon used.
	 */
	private onTazerCooldown(source: number, weaponType: number): void {
		switch (weaponType) {
			case Weapons.WEAPON_STUNGUN:
			case Weapons.WEAPON_STUNGUN_MP:
				if (this._onCooldown.has(source)) {
					const violation = new Violation(source, "Tazer Cooldown [C2]", this.name);
					violation.banPlayer();
					CancelEvent();
				} else {
					this._onCooldown.add(source);
					setTimeout(() => {
						this._onCooldown.delete(source);
					}, this._tazerCooldown);
				}
				break;
			default:
				return;
		}
	}

	/**
	 * Handles the ragdoll effect when a player is tazed.
	 * @param target The network ID of the player being tazed.
	 * @param weaponType The type of weapon being used to taze the player.
	 */
	private async onTazerRagdoll(target: number, weaponType: number): Promise<void> {
		switch (weaponType) {
			case Weapons.WEAPON_STUNGUN:
			case Weapons.WEAPON_STUNGUN_MP:
				const victim: number = NetworkGetEntityFromNetworkId(target);
				if (!DoesEntityExist(victim) || !IsPedAPlayer(victim)) return;
				SetPedCanRagdoll(victim, true); // Is this a good idea?

				let hasRagdolled = false;
				const start = GetGameTimer();
				const threshold = 3000 + GetPlayerPing(target.toString());

				while (!hasRagdolled && GetGameTimer() - start < threshold) {
					if (IsPedRagdoll(victim)) hasRagdolled = true;
					await this.Delay(100);
				}
				if (!hasRagdolled) {
					const violation = new Violation(target, "Tazer Ragdoll [C3]", this.name);
					violation.banPlayer();
				}
				break;
			default:
				return;
		}
	}
}
