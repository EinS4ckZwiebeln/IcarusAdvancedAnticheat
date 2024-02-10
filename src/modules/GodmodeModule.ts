import { EventHandler } from "../core/handler/EventHandler";
import { Module } from "../core/Module";
import { Violation } from "../core/Violation";
import { WeaponDamageEvent } from "../Types";

export class GodmodeModule extends Module {
	public onLoad(): void {
		EventHandler.subscribe("weaponDamageEvent", this.onGodmode.bind(this));
	}

	public onUnload(): void {
		EventHandler.unsubscribe("weaponDamageEvent", this.onGodmode.bind(this));
	}

	/**
	 * Handles the event when a player is detected to be in godmode.
	 * @param netId The network ID of the player.
	 * @param weaponType The type of weapon used on the player.
	 */
	private onGodmode(source: string, data: WeaponDamageEvent): void {
		const netId: number = data.hitGlobalId || data.hitGlobalIds[0];
		const target: number = NetworkGetEntityFromNetworkId(netId);
		if (IsPedAPlayer(target) && GetPlayerInvincible(target.toString())) {
			const violation = new Violation(parseInt(source), "Godmode [C1]", this.name);
			violation.banPlayer();
			CancelEvent();
		}
	}
}
