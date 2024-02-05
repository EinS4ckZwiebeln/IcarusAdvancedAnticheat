import { EventHandler } from "../core/handler/EventHandler";
import { Module } from "../core/Module";
import { Violation } from "../core/Violation";
import { WeaponDamageEvent } from "../Types";

export class GodmodeModule extends Module {
	public onLoad(): void {
		EventHandler.subscribe("weaponDamageEvent", (_: string, data: WeaponDamageEvent) => this.onGodmode(data));
	}

	public onUnload(): void {
		EventHandler.unsubscribe("weaponDamageEvent", (_: string, data: WeaponDamageEvent) => this.onGodmode(data));
	}

	/**
	 * Handles the event when a player is detected to be in godmode.
	 * @param netId The network ID of the player.
	 * @param weaponType The type of weapon used on the player.
	 */
	private onGodmode(data: WeaponDamageEvent): void {
		const netId: number = data.hitGlobalId || data.hitGlobalIds[0];
		const target: number = NetworkGetEntityFromNetworkId(netId);
		if (IsPedAPlayer(target) && GetPlayerInvincible(target.toString())) {
			const violation = new Violation(source, "Godmode [C1]", this.name);
			violation.banPlayer();
			CancelEvent();
		}
	}
}
