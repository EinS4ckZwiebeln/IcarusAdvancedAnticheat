import { Module } from "../core/Module";
import { Violation } from "../core/Violation";
import { WeaponDamageEvent } from "../Types";
import { Utility } from "../util/Utility";

export class WeaponBlacklistModule extends Module {
	private _blacklistedWeapons: Set<number> = new Set<number>();

	public onLoad(): void {
		this._blacklistedWeapons = new Set<number>(Utility.hashify(this.config.BlacklistedWeapons));
		this.eventHandler.subscribe("weaponDamageEvent", this.onWeaponDamage.bind(this));
	}

	public onUnload(): void {
		this.eventHandler.unsubscribe("weaponDamageEvent", this.onWeaponDamage.bind(this));
	}

	/**
	 * Handles the event when a player uses a blacklisted weapon and bans the player if necessary.
	 * @param source - The player who used the weapon.
	 * @param weaponType - The type of weapon used.
	 */
	private onWeaponDamage(source: number, data: WeaponDamageEvent): void {
		if (this._blacklistedWeapons.has(data.weaponType)) {
			const violation = new Violation(source, "Blacklisted Weapon [C1]", this.name);
			violation.banPlayer();
			CancelEvent();
		}
	}
}
