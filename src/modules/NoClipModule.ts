import { Config } from "../config/Config";
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
	private hasNoClip(ped: number): boolean {
		return IsEntityPositionFrozen(ped) && !IsEntityVisible(ped) && GetVehiclePedIsIn(ped, false) === 0;
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
			if (!this.hasNoClip(ped)) return;

			const origin = GetEntityCoords(ped);
			await this.Delay(1000);
			const destination = GetEntityCoords(ped);

			// Calculate the distance in meters
			const speed = Utility.getDistance(origin, destination, true) * 3.6; // Convert to km/h
			if (speed > this._speedThreshold && this.hasNoClip(ped)) {
				const violation = new Violation(parseInt(player), "NoClip [C1]", this.name);
				violation.banPlayer();
			}
		});
		await this.Delay(5000);
	}
}
