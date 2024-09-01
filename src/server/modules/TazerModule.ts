import { Config } from "../core/config/Config";
import { Module } from "../core/Module";
import { Violation } from "../core/Violation";
import { Weapons } from "../enum/Weapons";
import { WeaponDamageEvent } from "../Types";
import { Utility } from "../util/Utility";

export class TazerModule extends Module {
	private readonly _onCooldown: Set<number> = new Set<number>();
	private _tazerCooldown: number = 14000;
	private _tazerRange: number = 12;

	public onLoad(): void {
		this._tazerRange = Config.getValue<number>(this.config, "maxDistance");
		this._tazerCooldown = Config.getValue<number>(this.config, "tazerCooldown");

		this.eventHandler.subscribe("weaponDamageEvent", [
			this.onTazerCooldown.bind(this),
			this.onTazerReach.bind(this),
			this.onTazerRagdoll.bind(this),
		]);
	}

	public onUnload(): void {
		this.eventHandler.unsubscribe("weaponDamageEvent", [
			this.onTazerCooldown.bind(this),
			this.onTazerReach.bind(this),
			this.onTazerRagdoll.bind(this),
		]);
	}

	/**
	 * Handles the event when a player uses a tazer and checks if the target is within range.
	 * If the target is out of range, the player is banned and the event is cancelled.
	 * @param source - The player who used the tazer.
	 * @param target - The player who was targeted by the tazer.
	 * @param weaponType - The type of weapon used (should be a tazer).
	 */
	private onTazerReach(data: WeaponDamageEvent): void {
		switch (data.weaponType) {
			case Weapons.WEAPON_STUNGUN:
			case Weapons.WEAPON_STUNGUN_MP:
				const victim: number = NetworkGetEntityFromNetworkId(data.hitGlobalId || data.hitGlobalIds[0]);
				if (!DoesEntityExist(victim) || !IsPedAPlayer(victim)) return;

				const killer: number = GetPlayerPed(source.toString());
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
	private onTazerCooldown(source: number, data: WeaponDamageEvent): void {
		switch (data.weaponType) {
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
	private async onTazerRagdoll(_: number, data: WeaponDamageEvent): Promise<void> {
		switch (data.weaponType) {
			case Weapons.WEAPON_STUNGUN:
			case Weapons.WEAPON_STUNGUN_MP:
				const target = data.hitGlobalId || data.hitGlobalIds[0];
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
