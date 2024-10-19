import { Module } from "../core/Module";
import { Violation } from "../core/Violation";

export class SuperJumpModule extends Module {
	public onLoad(): void {}
	public onUnload(): void {}

	/**
	 * Called on every tick of the module.
	 * Checks if any player is using super jump and bans them if true.
	 * Delays for 3 seconds before executing again.
	 * @returns Promise that resolves when the function completes.
	 */
	protected async onTick(): Promise<void> {
		const players: string[] = getPlayers();
		for (const player of players) {
			if (IsPlayerUsingSuperJump(player)) {
				const violation = new Violation(
					Number.parseInt(player),
					"Super Jump [C1]",
					this.name,
				);
				violation.banPlayer();
			}
		}
		await this.Delay(3000);
	}
}
