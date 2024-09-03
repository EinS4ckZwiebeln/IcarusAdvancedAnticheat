import { Module } from "../core/Module";
import { Violation } from "../core/Violation";

export class SuperJumpModule extends Module {
	private _timeout: Set<number> = new Set<number>();

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
		players.forEach((player) => {
			if (IsPlayerUsingSuperJump(player) && !this._timeout.has(parseInt(player))) {
				const violation = new Violation(parseInt(player), "Super Jump [C1]", this.name);
				violation.banPlayer();
				// Prevent ban spam by adding the player to the timeout.
				this._timeout.add(source);
				setTimeout(() => this._timeout.delete(source), 30000);
			}
		});
		await this.Delay(3000);
	}
}
