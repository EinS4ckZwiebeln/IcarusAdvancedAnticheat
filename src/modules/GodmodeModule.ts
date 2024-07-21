import { Config } from "../core/config/Config";
import { Module } from "../core/Module";
import { Violation } from "../core/Violation";
import { Weapons } from "../enum/Weapons";
import { DamageRecord, WeaponDamageEvent } from "../Types";

export class GodmodeModule extends Module {
	private _absorbedDamage: Map<number, DamageRecord> = new Map();
	private _verifyPlayerDamage: boolean = false;

	public onLoad(): void {
		this._verifyPlayerDamage = Config.getValue<boolean>(this.config, "verifyPlayerDamage");
		this.eventHandler.subscribe("weaponDamageEvent", this.onGodmode.bind(this));
	}

	public onUnload(): void {
		this.eventHandler.unsubscribe("weaponDamageEvent", this.onGodmode.bind(this));
	}

	/**
	 * Handles the event when a player is detected to be in godmode.
	 * @param source The source of the event.
	 * @param data The data associated with the event.
	 */
	private onGodmode(source: string, data: WeaponDamageEvent): void {
		// Check if the event was canceled or if the player will be killed
		if (WasEventCanceled() || data.willKill) return;
		const target: number = NetworkGetEntityFromNetworkId(data.hitGlobalId || data.hitGlobalIds[0]);

		if (IsPedAPlayer(target)) {
			this.handlePlayerInvincibility(source, target);
			if (this._verifyPlayerDamage) this.handlePlayerDamage(source, data, target);
		}
	}

	/**
	 * Handles the invincibility of a player.
	 * @param source The source of the event.
	 * @param target The target player.
	 */
	private handlePlayerInvincibility(source: string, target: number): void {
		if (GetPlayerInvincible(target.toString())) {
			const violation = new Violation(parseInt(source), "Godmode [C1]", this.name);
			violation.banPlayer();
			CancelEvent();
		}
	}

	/**
	 * Handles the damage inflicted on a player.
	 * @param source The source of the event.
	 * @param data The data associated with the event.
	 * @param target The target player.
	 */
	private handlePlayerDamage(source: string, data: WeaponDamageEvent, target: number): void {
		if (data.overrideDefaultDamage && data.weaponType !== Weapons.WEAPON_UNARMED) {
			const damage = data.weaponDamage * GetPlayerWeaponDamageModifier(source);
			const absorbedDamage = this._absorbedDamage.get(target) || { damage: 0, time: data.damageTime };

			if (data.damageTime - absorbedDamage.time < 1000) {
				this.handleAbsorbedDamage(target, data.damageTime, absorbedDamage.damage + damage);
			} else {
				// Reset absorbed damage if time between damage events is too long
				this._absorbedDamage.set(target, {
					damage: 0,
					time: data.damageTime,
				});
			}
		}
	}

	/**
	 * Handles absorbed damage for a player.
	 * If the player takes more damage than their max health (and armor if they have any),
	 * it creates a violation and bans the player.
	 * @param target The target player's ID.
	 * @param damageTime The time when the damage occurred.
	 * @param totalDamage The total damage taken by the player.
	 */
	private handleAbsorbedDamage(target: number, damageTime: number, totalDamage: number): void {
		const hasArmor = GetPedArmour(target) > 0;
		const maxHealth = GetEntityMaxHealth(target);
		const targetSource = NetworkGetEntityOwner(target);

		// Check if the player took more damage than their max health (and armor if they have any)
		if (!hasArmor && totalDamage > maxHealth) {
			const violation = new Violation(targetSource, "Godmode [C2]", this.name);
			violation.banPlayer();
			CancelEvent();
		} else if (hasArmor && totalDamage > maxHealth + GetPlayerMaxArmour(targetSource.toString())) {
			const violation = new Violation(targetSource, "Godmode [C3]", this.name);
			violation.banPlayer();
			CancelEvent();
		}

		this._absorbedDamage.set(target, {
			damage: totalDamage,
			time: damageTime,
		});
	}
}
