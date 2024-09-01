import { Module } from "../core/Module";
import { Config } from "../core/config/Config";
import { Utility } from "../util/Utility";
import { Violation } from "../core/Violation";
import { WeaponDamageEvent } from "../Types";

export class AimbotModule extends Module {
	private _offsetDist: number = 4.5;

	public onLoad(): void {
		this._offsetDist = Config.getValue<number>(this.config, "offsetDist");
		this.eventHandler.subscribe("weaponDamageEvent", this.onAimbot.bind(this));
	}

	public onUnload(): void {
		this.eventHandler.unsubscribe("weaponDamageEvent", this.onAimbot.bind(this));
	}

	/**
	 * Handles the aimbot event and checks if the player is using aimbot.
	 * If the player is using aimbot, it bans the player and cancels the event.
	 * @param source - The source of the player who is using aimbot.
	 * @param target - The target of the player who is not using aimbot.
	 * @param weaponType - The type of weapon the player is using.
	 */
	private async onAimbot(source: number, data: WeaponDamageEvent): Promise<void> {
		if (Utility.WEAPONS_MELEE.has(data.weaponType) || Utility.WEAPONS_AOE.has(data.weaponType)) return;

		const victim: number = NetworkGetEntityFromNetworkId(data.hitGlobalId || data.hitGlobalIds[0]);
		// Account for networking issues and desync
		if (!DoesEntityExist(victim) || !IsPedAPlayer(victim) || GetEntityHealth(victim) === 0 || IsPedRagdoll(victim)) return;

		const sender = source.toString();
		const killer = GetPlayerPed(sender);
		// Not exactly sure why, but vehicles make this detection method inaccurate
		if (GetVehiclePedIsIn(killer, false) !== 0) return;
		const killerCamCoords: number[] = await this.getApproximateCamCoords(parseInt(sender), killer);
		const victimCoords: number[] = GetEntityCoords(victim);

		const yaw: number = GetPlayerCameraRotation(sender)[2]; // In radians
		const forwardVector: number[] = this.getForwardVector(yaw);
		const distanceToVictim: number = Utility.getDistance(killerCamCoords, victimCoords, false);

		const extendedForward: number[] = [
			// Calculate x and y components of the extended forward vector
			killerCamCoords[0] + forwardVector[0] * distanceToVictim,
			killerCamCoords[1] + forwardVector[1] * distanceToVictim,
		];
		if (Utility.getDistance(extendedForward, victimCoords, false) > this._offsetDist) {
			const violation = new Violation(source, "Aimbot [C1]", this.name);
			violation.banPlayer();
			CancelEvent();
		}
	}

	/**
	 * Retrieves the approximate camera coordinates for a given killer source and killer ped.
	 *
	 * @param killerSrc - The killer source.
	 * @param killerPed - The killer ped.
	 * @returns A promise that resolves to an array of numbers representing the camera coordinates.
	 */
	private async getApproximateCamCoords(killerSrc: number, killerPed: number): Promise<number[]> {
		const killerPedCoords = GetEntityCoords(killerPed);
		const camCoords = await this.rpcTransmitter.makeNativeCall<number[]>(killerSrc, "0xA200EB1EE790F448", "vector");
		if (camCoords && typeof camCoords === "object" && Utility.getDistance(killerPedCoords, camCoords, true) < this._offsetDist) {
			return camCoords;
		} else {
			return killerPedCoords;
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
