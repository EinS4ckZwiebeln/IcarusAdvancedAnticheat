import { EventHandler } from "../core/handler/EventHandler";
import { Module } from "../core/Module";
import { Violation } from "../core/Violation";
import { Config } from "../config/Config";
import { Utility } from "../util/Utility";

export class PedBlacklistModule extends Module {
	private _whitelistedPedModels: Set<number> = new Set();

	public onLoad(): void {
		const models: string[] = Array.from(Config.getValue(this.config, "playerModels"));
		this._whitelistedPedModels = new Set(Utility.hashify(models));

		EventHandler.subscribe("playerEnteredScope", (data: any) => this.onEnteredScope(data.player));
		EventHandler.subscribe("playerLeftScope", (data: any) => this.onEnteredScope(data.player));
	}
	public onUnload(): void {
		EventHandler.unsubscribe("playerEnteredScope", (data: any) => this.onEnteredScope(data.player));
		EventHandler.unsubscribe("playerLeftScope", (data: any) => this.onEnteredScope(data.player));
	}

	/**
	 * Checks if a player's ped is blacklisted and bans them if it is.
	 * @param source - The player's source ID.
	 */
	private onEnteredScope(source: string): void {
		const ped: number = GetPlayerPed(source);
		const model: number = GetEntityModel(ped);

		if (!this._whitelistedPedModels.has(model)) {
			new Violation(parseInt(source), "Blacklisted Ped [C1]");
			CancelEvent();
		}
	}
}
