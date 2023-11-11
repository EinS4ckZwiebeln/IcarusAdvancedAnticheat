import { EventHandler } from "../core/handler/EventHandler";
import { Module } from "../core/Module";
import { Violation } from "../core/Violation";

export class GodmodeModule extends Module {
	public onLoad(): void {
		EventHandler.subscribe("weaponDamageEvent", (_: string, data: any) => this.onGodmode(data.hitGlobalId || data.hitGlobalIds[0]));
	}

	public onUnload(): void {
		EventHandler.unsubscribe("weaponDamageEvent", (_: string, data: any) => this.onGodmode(data.hitGlobalId || data.hitGlobalIds[0]));
	}

	/**
	 * Handles the event when a player is detected to be in godmode.
	 * @param netId The network ID of the player.
	 * @param weaponType The type of weapon used on the player.
	 */
	private onGodmode(netId: number): void {
		const target: number = NetworkGetEntityFromNetworkId(netId);
		if (IsPedAPlayer(target) && GetPlayerInvincible(target.toString())) {
			const violation = new Violation(source, "Godmode [C1]", this.name);
			violation.banPlayer();
			CancelEvent();
		}
	}
}
