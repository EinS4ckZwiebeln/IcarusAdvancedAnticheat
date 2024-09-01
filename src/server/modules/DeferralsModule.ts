import axios from "axios";
import { Logger } from "../core/logger/Logger";
import { Module } from "../core/Module";
import { Config } from "../core/config/Config";
import { Deferrals, DeferralsObject } from "../Types";
import { Utility } from "../util/Utility";

export class DeferralsModule extends Module {
	private _steamApiKey: string;
	private _banChecker: DeferralsObject;
	private _nameFilter: DeferralsObject;
	private _noVPN: DeferralsObject;

	public onLoad(): void {
		this._steamApiKey = GetConvar("steam_webApiKey", "none");
		this._banChecker = Config.getValue<DeferralsObject>(this.config, "BanChecker");
		this._nameFilter = Config.getValue<DeferralsObject>(this.config, "NameFilter");
		this._noVPN = Config.getValue<DeferralsObject>(this.config, "NoVPN");
		this.eventHandler.subscribe("playerConnecting", this.onDefer.bind(this));
	}

	public onUnload(): void {
		this.eventHandler.unsubscribe("playerConnecting", this.onDefer.bind(this));
	}

	/**
	 * Checks if a string is alphanumeric.
	 * @param str - The string to check.
	 * @returns Returns true if the string is alphanumeric, false otherwise.
	 */
	private isAlphaNumeric(str: string): boolean {
		return /^[a-zA-Z0-9!@#\$%\^\&*\)\(+=._-]+$/g.test(str);
	}

	/**
	 * Checks if the given IPv4 address is associated with a VPN.
	 * @param ipv4 The IPv4 address to check.
	 * @returns A Promise that resolves to a boolean indicating whether the IP is associated with a VPN.
	 * @throws An error if the HTTP request to the VPN lookup service fails.
	 */
	private async hasVPN(ipv4: string): Promise<boolean> {
		const response = await axios.get(`https://blackbox.ipinfo.app/lookup/${ipv4}`, {
			method: "GET",
			headers: {
				"User-Agent": "request",
			},
		});
		if (response.status !== 200) {
			Logger.error(`Failed to fetch vpn status for player: ${response.status}`);
			return false;
		}
		return (await response.data)[0] === "Y";
	}

	/**
	 * Checks if a player with the given Steam ID has a VAC ban.
	 * @param steamId The Steam ID of the player.
	 * @returns A promise that resolves to a boolean indicating whether the player has a VAC ban.
	 */
	private async hasVacBan(steamId: string): Promise<boolean> {
		const response = await axios.get(
			`https://api.steampowered.com/ISteamUser/GetPlayerBans/v1/?key=${this._steamApiKey}&steamids=${steamId}`
		);
		if (response.status !== 200) {
			Logger.error(`Failed to fetch vac ban status for player: ${response.status}`);
			return false;
		}
		return (await response.data).players.length > 0;
	}

	/**
	 * Handles deferrals for a given player.
	 * @param name - The name of the player.
	 * @param deferrals - The deferral object for the player.
	 * @returns A Promise that resolves when the deferral is complete.
	 */
	private async onDefer(name: string, _: (reason: string) => void, deferrals: Deferrals): Promise<void> {
		if (this.permissionHandler.hasPermission(source, this.name)) return;
		const ipv4: string = GetPlayerIdentifierByType(source.toString(), "ip").slice(3);
		const steamId: string = GetPlayerIdentifierByType(source.toString(), "steam");

		const doVPNCheck: boolean = this._noVPN.enabled && ipv4 !== "127.0.0.1";
		const doBanCheck: boolean = this._banChecker.enabled && !Utility.isNullOrEmtpy(steamId) && this._steamApiKey !== "none";

		if (this._nameFilter.enabled || doVPNCheck || doBanCheck) {
			deferrals.defer();
			await this.Delay(0);
		}

		try {
			if (this._nameFilter.enabled && !this.isAlphaNumeric(name)) {
				deferrals.done(this._nameFilter.rejectionMsg);
			}
			// Check if the player is using a VPN
			if (doVPNCheck && (await this.hasVPN(ipv4))) {
				deferrals.done(this._noVPN.rejectionMsg);
			}
			// Check if the player has a VAC ban
			if (doBanCheck && (await this.hasVacBan(steamId.slice(6)))) {
				deferrals.done(this._banChecker.rejectionMsg);
			}
			deferrals.done();
		} catch (err: unknown) {
			if (!(err instanceof Error)) return;
			Logger.error(err.message);
		}
	}
}
