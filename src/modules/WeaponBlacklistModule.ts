import { EventHandler } from "../core/handler/EventHandler";
import { Module } from "../core/Module";
import { Violation } from "../core/Violation";
import { Config } from "../config/Config";
import { Utility } from "../util/Utility";

export class WeaponBlacklistModule extends Module {
	private _blacklistedWeapons: Set<number> = new Set<number>();

	public onLoad(): void {
		const weapons: string[] = Array.from(Config.getValue(this.config, "BlacklistedWeapons"));
		this._blacklistedWeapons = new Set<number>(Utility.hashify(weapons));
		EventHandler.subscribe("weaponDamageEvent", (source: number, data: any) => this.onWeaponDamage(source, data.weaponType));
	}

	public onUnload(): void {
		EventHandler.unsubscribe("weaponDamageEvent", (source: number, data: any) => this.onWeaponDamage(source, data.weaponType));
	}

	/**
	 * Handles the event when a player uses a blacklisted weapon and bans the player if necessary.
	 * @param source - The player who used the weapon.
	 * @param weaponType - The type of weapon used.
	 */
	private onWeaponDamage(source: number, weaponType: number): void {
		if (this._blacklistedWeapons.has(weaponType)) {
			const violation = new Violation(source, "Blacklisted Weapon [C1]", this.name);
			violation.banPlayer();
			CancelEvent();
		}
	}
}