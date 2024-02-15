import { WeaponDamageEvent } from "../Types";
import { Module } from "../core/Module";
import { Violation } from "../core/Violation";
import { EventHandler } from "../core/handler/EventHandler";
import { Weapons } from "../enum/Weapons";

export class FoldModule extends Module {
	public onLoad(): void {
		EventHandler.subscribe("weaponDamageEvent", this.onWeaponDamage.bind(this));
	}

	public onUnload(): void {
		EventHandler.unsubscribe("weaponDamageEvent", this.onWeaponDamage.bind(this));
	}

	/**
	 * Handles the event when a player uses fold cheat and bans the player.
	 * @param source - The player who used the fold.
	 * @param data - The weapon damage event data.
	 */
	private onWeaponDamage(source: number, data: WeaponDamageEvent): void {
		const isSilenced = data.silenced;
		if (isSilenced && data.weaponDamage === 0) {
			switch (data.weaponType) {
				case Weapons.WEAPON_FALL_01:
				case Weapons.WEAPON_FALL_02:
					const violation = new Violation(source, "Fold [C1]", this.name);
					violation.banPlayer();
					break;
				default:
					break;
			}
		} else if (!isSilenced && data.weaponDamage === 131071 && data.weaponType === Weapons.WEAPON_BIRD_CRAP) {
			const violation = new Violation(source, "Fold [C2]", this.name);
			violation.banPlayer();
		}
	}
}
