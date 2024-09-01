import { Module } from "../core/Module";
import { Violation } from "../core/Violation";
import { Config } from "../core/config/Config";
import { Utility } from "../util/Utility";

export class PedBlacklistModule extends Module {
	private _whitelistedPedModels: Set<number> = new Set();

	public onLoad(): void {
		const models = Config.getValue<string[]>(this.config, "playerModels");
		this._whitelistedPedModels = new Set(Utility.hashify(models));
	}

	public onUnload(): void {}

	/**
	 * Verifies the player's model and takes appropriate action if it is blacklisted.
	 * @param player The player to verify the model for.
	 */
	private verifyPlayerModel(player: string): void {
		const model: number = GetEntityModel(GetPlayerPed(player));
		if (model !== 0 && !this._whitelistedPedModels.has(model)) {
			const violation = new Violation(parseInt(player), "Blacklisted Ped [C1]", this.name);
			violation.banPlayer();
			CancelEvent();
		}
	}

	/**
	 * Executes the logic on each tick of the game loop.
	 * This method fetches the list of players and verifies their player models.
	 * It also adds a delay of 30 seconds before the next tick.
	 * @returns A promise that resolves when the logic is executed.
	 */
	protected async onTick(): Promise<void> {
		const players = getPlayers();
		players.forEach(async (player: string) => this.verifyPlayerModel(player));
		await this.Delay(30000);
	}
}
