import { inject, singleton } from "tsyringe";
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
	private readonly _bypassPermission: string;

	constructor(@inject(Config) private readonly _config: Config, @inject(EventHandler) private readonly _eventHandler: EventHandler) {
		this._bypassPermission = this._config.getConfig().Permission.bypassPermission;
		if (!this._config.getConfig().Permission.useTxAdmin) return;
		this._eventHandler.subscribe("txAdmin:events:adminAuth", this.onTxAuth.bind(this));
	}

	/**
	 * Checks if a player has permission.
	 * @param source The player ID to check.
	 * @returns True if the player has permission, false otherwise.
	 */
	public hasPermission(source: number, module?: string): boolean {
		source = parseInt(source.toString()); // Ensure source is really a number during runtime
		return (
			this._permitted.has(source) ||
			this.hasModuleBypass(source.toString(), module) ||
			this.isPlayerAceAllowedBool(source.toString(), this._bypassPermission)
		);
	}

	/**
	 * Checks if a player has bypass permission for a specific module.
	 * @param source - The source of the player.
	 * @param module - The module to check for bypass permission. If not provided, returns false.
	 * @returns True if the player has bypass permission for the module, false otherwise.
	 */
	private hasModuleBypass(source: string, module?: string): boolean {
		if (module === undefined) return false;
		const moduleLower = module.toLowerCase();
		const formats = [`icarus.${moduleLower}`, `icarus.${moduleLower.slice(0, -"module".length)}_module`] as const;
		for (const format of formats) {
			if (this.isPlayerAceAllowedBool(source, format)) return true;
		}
		return false;
	}

	/**
	 * Checks if a player is allowed to perform a specific action based on their permission level.
	 * @param source - The source of the player.
	 * @param permission - The permission to check.
	 * @returns A boolean indicating whether the player is allowed or not.
	 */
	private isPlayerAceAllowedBool(source: string, permission: string): boolean {
		// Returns a number during connection deferring when the temp source is used
		const allowed: boolean | number = IsPlayerAceAllowed(source, permission);
		if (typeof allowed === "boolean") {
			return allowed;
		}
		if (typeof allowed === "number") {
			return allowed === 1;
		}
		return false;
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
