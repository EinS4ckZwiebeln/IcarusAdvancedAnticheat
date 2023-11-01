import { EventHandler } from "../core/handler/EventHandler";
import { Module } from "../core/Module";
import { Violation } from "../core/Violation";
import { Config } from "../config/Config";
import { Utility } from "../util/Utility";

export class AimbotModule extends Module {
	private _angleThreshold: number = 0.0;

	public onLoad(): void {
		this._angleThreshold = Config.getValue(this.config, "maxAngle");
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
		if (!DoesEntityExist(victim) || !IsPedAPlayer(victim)) return;

		const radians: number[] = GetPlayerCameraRotation(source);
		const forwardVector: number[] = this.getForwardVector2D(radians[0], radians[2]);

		const killerCoords: number[] = GetEntityCoords(GetPlayerPed(source));
		const victimCoords: number[] = GetEntityCoords(victim);

		const distance: number = Utility.getDistance(killerCoords, victimCoords);
		const expandedForward: number[] = [killerCoords[0] + forwardVector[0] * distance, killerCoords[1] + forwardVector[1] * distance, victimCoords[2]];
		const ans: number = Math.acos(this.pow2Vector(expandedForward, victimCoords) / (this.sqrtPowVector(expandedForward) * this.sqrtPowVector(victimCoords)));

		if (ans * Utility.RADIANS > this._angleThreshold) {
			const violation = new Violation(parseInt(source), "Aimbot [C1]", this.name);
			violation.banPlayer();
			CancelEvent();
		}
	}

	/**
	 * Calculates the power of two vectors.
	 * @param a - The first vector.
	 * @param b - The second vector.
	 * @returns The power of two vectors.
	 */
	private pow2Vector(a: number[], b: number[]): number {
		return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
	}

	/**
	 * Calculates the square root of the sum of the squares of the elements in a 3D vector.
	 * @param a - The 3D vector to calculate the square root of the sum of squares for.
	 * @returns The square root of the sum of the squares of the elements in the vector.
	 */
	private sqrtPowVector(a: number[]): number {
		return Math.sqrt(a[0] * a[0] + a[1] * a[1] + a[2] * a[2]);
	}

	/**
	 * Returns the forward vector in 2D space based on the given pitch and yaw angles.
	 * @param pitch The pitch angle in radians.
	 * @param yaw The yaw angle in radians.
	 * @returns An array containing the x and y components of the forward vector.
	 */
	private getForwardVector2D(pitch: number, yaw: number): number[] {
		return [-Math.sin(yaw), Math.sin(pitch) * Math.cos(yaw)];
	}
}
