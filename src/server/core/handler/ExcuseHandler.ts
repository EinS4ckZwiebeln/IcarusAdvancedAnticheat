import { singleton } from "tsyringe";
import { Excuse } from "../../Types";
import { Utility } from "../../util/Utility";
import { Logger } from "../logger/Logger";

/**
 * Represents a handler for player excuses.
 */
@singleton()
export class ExcuseHandler {
	/**
	 * A map of player IDs to their associated excuses.
	 */
	private readonly _excusedPlayers: Map<number, Excuse[]> = new Map();

	/**
	 * Initializes the ExcuseHandler by exporting its methods to the global scope.
	 */
	constructor() {
		/**
		 * Adds an excuse for a player.
		 * @param source The player ID.
		 * @param timeout The duration of the excuse in milliseconds.
		 * @param module The module to excuse the player from. Defaults to "*".
		 */
		Utility.EXPORTS("AddExcuseForPlayer", (source: number, timeout: number, module?: string) => {
			try {
				const newExcuse = { module: module || "*" };
				this.addExcuse(source, timeout, newExcuse);
			} catch (err: unknown) {
				if (!(err instanceof Error)) return;
				Logger.error(`[Export]: ${err.message}`);
			}
		});

		/**
		 * Removes an excuse from a player.
		 * @param source The player ID.
		 * @param module The module to remove the excuse from. If not specified, removes all excuses for the player.
		 */
		Utility.EXPORTS("RemoveExcuseFromPlayer", (source: number, module?: string) => {
			try {
				this.removeExcuse(source, module);
			} catch (err: unknown) {
				if (!(err instanceof Error)) return;
				Logger.error(`[Export]: ${err.message}`);
			}
		});

		/**
		 * Checks if a player is excused from a module.
		 * @param source The player ID.
		 * @param module The module to check. Defaults to "*".
		 * @returns Whether the player is excused from the module.
		 */
		Utility.EXPORTS("IsPlayerExcused", (source: number, module?: string) => {
			try {
				return this.isExcused(source, module);
			} catch (err: unknown) {
				if (!(err instanceof Error)) return;
				Logger.error(`[Export]: ${err.message}`);
			}
		});
	}

	/**
	 * Adds an excuse for a player.
	 * @param source The player ID.
	 * @param timeout The duration of the excuse in milliseconds.
	 * @param module The module to excuse the player from. Defaults to "*".
	 */
	private addExcuse(source: number, timeout: number, module?: Excuse): void {
		const excuses = this._excusedPlayers.get(source) || [];
		excuses.push(module || { module: "*" });

		this._excusedPlayers.set(source, excuses);
		if (timeout > 0) setTimeout(() => this._excusedPlayers.delete(source), timeout);
	}

	/**
	 * Removes an excuse from a player.
	 * @param source The player ID.
	 * @param module The module to remove the excuse from. If not specified, removes all excuses for the player.
	 */
	private removeExcuse(source: number, module?: string): void {
		let excuses = this._excusedPlayers.get(source) || [];
		excuses = excuses.filter((excuse) => excuse.module !== module);
		if (!module) excuses.length = 0;
		this._excusedPlayers.set(source, excuses);
	}

	/**
	 * Checks if a player is excused from a module.
	 * @param source The player ID.
	 * @param module The module to check. Defaults to "*".
	 * @returns Whether the player is excused from the module.
	 */
	public isExcused(source: number, module?: string): boolean {
		const excuses = this._excusedPlayers.get(source) || [];
		return excuses.some((excuse) => excuse.module === (module || "*"));
	}
}
