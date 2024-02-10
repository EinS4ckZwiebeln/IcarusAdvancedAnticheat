import { EventHandler } from "../core/handler/EventHandler";
import { Module } from "../core/Module";
import { Violation } from "../core/Violation";
import { Config } from "../core/config/Config";
import { Utility } from "../util/Utility";
import { PlayerScopeEvent } from "../Types";

export class PedBlacklistModule extends Module {
	private _whitelistedPedModels: Set<number> = new Set();

	public onLoad(): void {
		this._whitelistedPedModels = new Set(Utility.hashify(Config.getValue(this.config, "playerModels")));

		EventHandler.subscribe(["playerEnteredScope", "playerLeftScope"], this.onEnteredScope.bind(this));
	}
	public onUnload(): void {
		EventHandler.unsubscribe(["playerEnteredScope", "playerLeftScope"], this.onEnteredScope.bind(this));
	}

	/**
	 * Checks if a player's ped is blacklisted and bans them if it is.
	 * @param source - The player's source ID.
	 */
	private onEnteredScope(data: PlayerScopeEvent): void {
		const source = data.player;
		const ped: number = GetPlayerPed(source.toString());
		const model: number = GetEntityModel(ped);

		if (!this._whitelistedPedModels.has(model)) {
			const violation = new Violation(source, "Blacklisted Ped [C1]", this.name);
			violation.banPlayer();
			CancelEvent();
		}
	}
}
