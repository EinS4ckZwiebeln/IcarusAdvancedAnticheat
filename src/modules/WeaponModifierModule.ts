import { EventHandler } from "../core/handler/EventHandler";
import { Module } from "../core/Module";
import { Violation } from "../core/Violation";
import { Config } from "../core/config/Config";

export class WeaponModifierModule extends Module {
	// Add 0.001 to the value to account for floating point errors.
	private readonly _damageModifier: number = Config.getValue(this.config, "damageModifier") + 0.001;

	public onLoad(): void {
		EventHandler.subscribe("weaponDamageEvent", (source: string) => this.onDamage(source));
	}

	public onUnload(): void {
		EventHandler.unsubscribe("weaponDamageEvent", (source: string) => this.onDamage(source));
	}

	/**
	 * Handles the onDamage event and checks if the player's weapon damage or defense modifier exceeds the set limit.
	 * If the limit is exceeded, the player is banned and the event is cancelled.
	 * @param source - The source of the damage event.
	 */
	private onDamage(source: string): void {
		if ((GetPlayerMeleeWeaponDamageModifier(source) || GetPlayerWeaponDamageModifier(source) || GetPlayerWeaponDefenseModifier(source)) > this._damageModifier) {
			const violation = new Violation(parseInt(source), "Weapon Modifier [C1]", this.name);
			violation.banPlayer();
			CancelEvent();
			return;
		}
	}
}
