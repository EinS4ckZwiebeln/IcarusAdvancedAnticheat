import { EventHandler } from "../core/handler/EventHandler";
import { Module } from "../core/Module";
import { Violation } from "../core/Violation";
import { WeaponDamageEvent } from "../Types";
import { Utility } from "../util/Utility";

export class WeaponBlacklistModule extends Module {
	private _blacklistedWeapons: Set<number> = new Set<number>();

	public onLoad(): void {
		this._blacklistedWeapons = new Set<number>(Utility.hashify(this.config.BlacklistedWeapons));
		EventHandler.subscribe("weaponDamageEvent", (source: number, data: WeaponDamageEvent) => this.onWeaponDamage(source, data));
	}

	public onUnload(): void {
		EventHandler.unsubscribe("weaponDamageEvent", (source: number, data: WeaponDamageEvent) => this.onWeaponDamage(source, data));
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
