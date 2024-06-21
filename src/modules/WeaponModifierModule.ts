import { EventHandler } from "../core/handler/EventHandler";
import { Module } from "../core/Module";
import { Violation } from "../core/Violation";
import { Config } from "../core/config/Config";
import { container } from "tsyringe";

export class WeaponModifierModule extends Module {
	private _damageModifier: number = 1.0;

	constructor() {
		super(container.resolve(Config), container.resolve(EventHandler));
	}

	public onLoad(): void {
		// Add 0.001 to the value to account for floating point errors.
		this._damageModifier = Config.getValue<number>(this.config, "damageModifier") + 0.001;
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
		if (
			(GetPlayerMeleeWeaponDamageModifier(source) ||
				GetPlayerWeaponDamageModifier(source) ||
				GetPlayerWeaponDefenseModifier(source)) > this._damageModifier
		) {
			const violation = new Violation(parseInt(source), "Weapon Modifier [C1]", this.name);
			violation.banPlayer();
			CancelEvent();
			return;
		}
	}
}
