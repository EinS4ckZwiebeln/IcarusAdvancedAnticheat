import { EventHandler } from "../core/handler/EventHandler";
import { Module } from "../core/Module";
import { Violation } from "../core/Violation";
import { Utility } from "../util/Utility";

export class GodmodeModule extends Module {
	public onLoad(): void {
		EventHandler.subscribe("weaponDamageEvent", (_: string, data: any) => this.onGodmode(data.hitGlobalId || data.hitGlobalIds[0], data.weaponType));
	}

	public onUnload(): void {
		EventHandler.unsubscribe("weaponDamageEvent", (_: string, data: any) => this.onGodmode(data.hitGlobalId || data.hitGlobalIds[0], data.weaponType));
	}

	/**
	 * Handles the event when a player is detected to be in godmode.
	 * @param netId The network ID of the player.
	 * @param weaponType The type of weapon used on the player.
	 */
	private onGodmode(netId: number, weaponType: number): void {
		if (Utility.WEAPONS_NON_LETHAL.has(weaponType)) return;
		const target: number = NetworkGetEntityFromNetworkId(netId);
		if (IsPedAPlayer(target)) {
			if (GetPlayerInvincible(target.toString())) {
				const violation = new Violation(source, "Godmode [C1]", this.name);
				violation.banPlayer();
				CancelEvent();
			}
		}
	}
}
