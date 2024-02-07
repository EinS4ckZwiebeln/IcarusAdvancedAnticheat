import { Logger } from "../core/logger/Logger";
import { Module } from "../core/Module";
import { Config } from "../core/config/Config";
import { EventHandler } from "../core/handler/EventHandler";
import { Deferrals, DeferralsObject } from "../Types";
import axios from "axios";

export class DeferralsModule extends Module {
	private readonly _nameFilter: DeferralsObject = Config.getValue(this.config, "NameFilter");
	private readonly _noVPN: DeferralsObject = Config.getValue(this.config, "NoVPN");

	public onLoad(): void {
		EventHandler.subscribe("playerConnecting", this.onDefer.bind(this));
	}
	public onUnload(): void {
		EventHandler.unsubscribe("playerConnecting", this.onDefer.bind(this));
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
	 * Handles deferrals for a given player.
	 * @param name - The name of the player.
	 * @param deferrals - The deferral object for the player.
	 * @param source - The player's source ID.
	 * @returns A Promise that resolves when the deferral is complete.
	 */
	private async onDefer(name: string, _: (reason: string) => void, deferrals: Deferrals): Promise<void> {
		const ipv4: string = GetPlayerIdentifierByType(source.toString(), "ip").slice(3);
		const doVPNCheck: boolean = this._noVPN.enabled && ipv4 != "127.0.0.1";

		if (this._nameFilter.enabled || doVPNCheck) {
			deferrals.defer();
			await this.Delay(0);
		}

		if (this._nameFilter.enabled && !this.isAlphaNumeric(name)) {
			deferrals.done(this._nameFilter.rejectionMsg);
		}

		try {
			if (doVPNCheck && (await this.hasVPN(ipv4))) {
				deferrals.done(this._noVPN.rejectionMsg);
			} else {
				deferrals.done();
			}
		} catch (err: unknown) {
			if (!(err instanceof Error)) return;
			Logger.error(err.message);
		}
	}
}
