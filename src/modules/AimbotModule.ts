import { EventHandler } from "../core/handler/EventHandler";
import { Module } from "../core/Module";
import { Config } from "../config/Config";
import { Utility } from "../util/Utility";
import { Violation } from "../core/Violation";

export class AimbotModule extends Module {
	private _offsetDist: number = 4.5;

	public onLoad(): void {
		this._offsetDist = Config.getValue(this.config, "offsetDist");
		EventHandler.subscribe("weaponDamageEvent", (source: string, data: any) => this.onAimbot(source, data.hitGlobalId || data.hitGlobalIds[0], data.weaponType));
	}

	public onUnload(): void {
		EventHandler.unsubscribe("weaponDamageEvent", (source: string, data: any) => this.onAimbot(source, data.hitGlobalId || data.hitGlobalIds[0], data.weaponType));
	}

	/**
	 * Handles the aimbot event and checks if the player is using aimbot.
	 * If the player is using aimbot, it bans the player and cancels the event.
	 * @param source - The source of the player who is using aimbot.
	 * @param target - The target of the player who is not using aimbot.
	 * @param weaponType - The type of weapon the player is using.
	 */
	private onAimbot(source: string, target: string, weaponType: number): void {
		if (Utility.WEAPONS_MELEE.has(weaponType) || Utility.WEAPONS_AOE.has(weaponType)) return;

		const victim: number = NetworkGetEntityFromNetworkId(parseInt(target));
		// Account for networking issues and desync
		if (!DoesEntityExist(victim) || !IsPedAPlayer(victim) || GetEntityHealth(victim) === 0 || IsPedRagdoll(victim)) return;

		const killer = GetPlayerPed(source);
		// Not exactly sure why, but vehicles make this detection method inaccurate
		if (GetVehiclePedIsIn(killer, false) !== 0) return;

		const killerCoords: number[] = GetEntityCoords(killer);
		const victimCoords: number[] = GetEntityCoords(victim);

		const yaw: number = GetPlayerCameraRotation(source)[2]; // In radians
		const forwardVector: number[] = this.getForwardVector(yaw);
		const distanceToVictim: number = Utility.getDistance(killerCoords, victimCoords, false);

		const extendedForward: number[] = [
			// Calculate x and y components of the extended forward vector
			killerCoords[0] + forwardVector[0] * distanceToVictim,
			killerCoords[1] + forwardVector[1] * distanceToVictim,
		];

		if (Utility.getDistance(extendedForward, victimCoords, false) > this._offsetDist) {
			const violation = new Violation(parseInt(source), "Aimbot [C1]", this.name);
			violation.banPlayer();
			CancelEvent();
		}
	}

	/**
	 * Returns the forward vector in 2D space based on the given yaw angle.
	 * @param yaw The yaw angle in degrees.
	 * @returns An array containing the x, y, and z components of the forward vector.
	 */
	private getForwardVector(yaw: number): number[] {
		// Why does that work? I have no idea, but it does
		const yawRad = (yaw * Utility.RADIANS * Math.PI) / 180;
		// Calculate the components of the forward vector
		return [-Math.sin(yawRad), Math.cos(yawRad)];
	}
}
