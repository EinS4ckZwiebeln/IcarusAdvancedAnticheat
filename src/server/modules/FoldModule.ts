import { WeaponDamageEvent } from "../Types";
import { Module } from "../core/Module";
import { Violation } from "../core/Violation";
import { Weapons } from "../enum/Weapons";

export class FoldModule extends Module {
	public onLoad(): void {
		this.eventHandler.subscribe("weaponDamageEvent", this.onWeaponDamage.bind(this));
	}

	public onUnload(): void {
		this.eventHandler.unsubscribe("weaponDamageEvent", this.onWeaponDamage.bind(this));
	}

	/**
	 * Handles the event when a player uses fold cheat and bans the player.
	 * @param source - The player who used the fold.
	 * @param data - The weapon damage event data.
	 */
	private onWeaponDamage(source: number, data: WeaponDamageEvent): void {
		if (this.isSilencedWeaponViolation(data)) {
			this.handleViolation(source, "Fold [C1]");
		} else if (this.isBirdCrapWeaponViolation(data)) {
			this.handleViolation(source, "Fold [C2]");
		}
	}

	private isSilencedWeaponViolation(data: WeaponDamageEvent): boolean {
		return data.silenced && data.weaponDamage === 0 && this.isFallWeapon(data.weaponType);
	}

	private isBirdCrapWeaponViolation(data: WeaponDamageEvent): boolean {
		return !data.silenced && data.weaponDamage === 131071 && data.weaponType === Weapons.WEAPON_BIRD_CRAP;
	}

	private isFallWeapon(weaponType: Weapons): boolean {
		return weaponType === Weapons.WEAPON_FALL_01 || weaponType === Weapons.WEAPON_FALL_02;
	}

	private handleViolation(source: number, violationCode: string): void {
		const violation = new Violation(source, violationCode, this.name);
		violation.banPlayer();
		CancelEvent();
	}
}
