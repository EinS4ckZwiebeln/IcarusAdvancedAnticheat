import { singleton } from "tsyringe";
import { AdminAuthEvent } from "../../Types";
import { Config } from "../config/Config";
import { Logger } from "../logger/Logger";
import { EventHandler } from "./EventHandler";

/**
 * Handles permissions for players.
 */
@singleton()
export class PermissionHandler {
	/**
	 * Set of player IDs with permissions.
	 */
	private readonly _permitted: Set<number> = new Set();

	/**
	 * The permission required to bypass the permission check.
	 */
	private readonly _bypassPermission: string = Config.getConfig().Permission.bypassPermission;

	constructor() {
		if (!Config.getConfig().Permission.useTxAdmin) return;
		EventHandler.subscribe("txAdmin:events:adminAuth", this.onTxAuth.bind(this));
	}

	/**
	 * Checks if a player has permission.
	 * @param source The player ID to check.
	 * @returns True if the player has permission, false otherwise.
	 */
	public hasPermission(source: number, module?: string): boolean {
		source = parseInt(source.toString()); // Ensure source is really a number
		const hasModuleBypass = module !== undefined ? IsPlayerAceAllowed(source.toString(), `icarus.${module.toLowerCase()}`) : false;
		return this._permitted.has(source) || hasModuleBypass || IsPlayerAceAllowed(source.toString(), this._bypassPermission);
	}

	/**
	 * Event handler for when a player's admin status changes.
	 * @param data The data object containing the player's net ID and admin status.
	 */
	private onTxAuth(data: AdminAuthEvent): void {
		const source = data.netid;
		if (source === -1) {
			this._permitted.clear();
			return;
		}
		if (data.isAdmin) {
			this._permitted.add(source);
			emitNet("chat:addMessage", source, {
				args: ["^3You have been granted anticheat bypass permissions due to your txAdmin role.^0"],
			});
			Logger.debug(`Added admin permission for player ${source}`);
		} else {
			this._permitted.delete(source);
		}
	}
}
