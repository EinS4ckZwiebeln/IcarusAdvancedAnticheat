import { Config } from "../core/config/Config";
import { Module } from "../core/Module";
import { Violation } from "../core/Violation";
import { Utility } from "../util/Utility";

export class NoClipModule extends Module {
	private _speedThreshold: number = Config.getValue(this.config, "speedThreshold");

	public onLoad(): void {}
	public onUnload(): void {}

	/**
	 * Checks if the specified ped has the ability to "noclip" (move through objects).
	 * @param ped The ped to check.
	 * @returns True if the ped has noclip, false otherwise.
	 */
	private hasNoClip(ped: number, source: string): boolean {
		return (
			(IsEntityPositionFrozen(ped) || GetPlayerInvincible(source)) &&
			(!IsEntityVisible(ped) || GetEntityCollisionDisabled(ped)) &&
			GetVehiclePedIsIn(ped, false) === 0
		);
	}

	/**
	 * Executes the module logic on each tick of the game loop.
	 * Checks the speed of each player with suspicious attributes and bans them if they exceed the speed threshold.
	 * @returns A Promise that resolves when the tick logic has completed.
	 */
	protected async onTick(): Promise<void> {
		const players = getPlayers();
		players.forEach(async (player: string) => {
			const ped = GetPlayerPed(player);
			const origin = GetEntityCoords(ped);
			if (!this.hasNoClip(ped, player)) return;

			await this.Delay(1000);
			if (!DoesEntityExist(ped)) return; // Abort if player has left

			// Calculate the distance in meters
			const speed = Utility.getDistance(origin, GetEntityCoords(ped), true) * 3.6; // Convert to km/h
			if (speed > this._speedThreshold && this.hasNoClip(ped, player)) {
				const violation = new Violation(parseInt(player), "NoClip [C1]", this.name);
				violation.banPlayer();
			}
		});
		await this.Delay(4000);
	}
}
