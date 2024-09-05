import { Config } from "../core/config/Config";
import { Module } from "../core/Module";
import { Violation } from "../core/Violation";
import { WeaponModifier } from "../enum/WeaponModifier";

export class WeaponModifierModule extends Module {
	private _damageModifier: number = 1.0;
	private _dynamicModifier: boolean = false;

	public onLoad(): void {
		// Add 0.0001 to the value to account for floating point errors.
		this._damageModifier = Config.getValue<number>(this.config, "damageModifier") + 0.0001;
		this._dynamicModifier = Config.getValue<boolean>(this.config, "dynamicModifier");
		this.eventHandler.subscribe("weaponDamageEvent", this.onDamage.bind(this));
	}

	public onUnload(): void {
		this.eventHandler.unsubscribe("weaponDamageEvent", this.onDamage.bind(this));
	}

	/**
	 * Handles the onDamage event and checks if the player's weapon damage or defense modifier exceeds the set limit.
	 * If the limit is exceeded, the player is banned and the event is cancelled.
	 * @param source - The source of the damage event.
	 */
	private onDamage(source: string): void {
		if (GetPlayerMeleeWeaponDamageModifier(source) > this.getModifier(WeaponModifier.MELEE)) {
			this.handleViolation(source, "Weapon Modifier [C1]");
			return;
		}
		if (GetPlayerWeaponDamageModifier(source) > this.getModifier(WeaponModifier.WEAPON)) {
			this.handleViolation(source, "Weapon Modifier [C2]");
			return;
		}
		if (GetPlayerWeaponDefenseModifier(source) > this.getModifier(WeaponModifier.DEFENSE)) {
			this.handleViolation(source, "Weapon Modifier [C3]");
			return;
		}
	}

	/**
	 * Retrieves the modifier value for a given weapon type.
	 *
	 * @param type - The weapon modifier type.
	 * @returns The configured damage modifier.
	 */
	private getModifier(type: WeaponModifier): number {
		return this._dynamicModifier ? Math.max(this._damageModifier, this.getAverageDamageModifier(type)) : this._damageModifier;
	}

	/**
	 * Calculates the average damage modifier based on the given weapon modifier type.
	 *
	 * @param type - The weapon modifier type.
	 * @returns The average damage modifier.
	 */
	private getAverageDamageModifier(type: WeaponModifier): number {
		const players = getPlayers();
		switch (type) {
			case WeaponModifier.MELEE:
				return (
					players.reduce((acc, player) => {
						return acc + GetPlayerMeleeWeaponDamageModifier(player);
					}, 0) / players.length
				);
			case WeaponModifier.WEAPON:
				return (
					players.reduce((acc, player) => {
						return acc + GetPlayerWeaponDamageModifier(player);
					}, 0) / players.length
				);
			case WeaponModifier.DEFENSE:
				return (
					players.reduce((acc, player) => {
						return acc + GetPlayerWeaponDefenseModifier(player);
					}, 0) / players.length
				);
			default:
				return this._damageModifier;
		}
	}

	/**
	 * Handles a violation by banning the player and canceling the event.
	 *
	 * @param source - The source of the violation.
	 * @param reason - The reason for the violation.
	 * @returns void
	 */
	private handleViolation(source: string, reason: string): void {
		const violation = new Violation(parseInt(source), reason, this.name);
		violation.banPlayer();
		CancelEvent();
	}
}
