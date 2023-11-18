import fetch from "node-fetch";
import { Logger } from "../core/logger/Logger";
import { Module } from "../core/Module";
import { Config } from "../core/config/Config";
import { EventHandler } from "../core/handler/EventHandler";

export class DeferralsModule extends Module {
	private readonly _nameFilter: any = Config.getValue(this.config, "NameFilter");
	private readonly _noVPN: any = Config.getValue(this.config, "NoVPN");

	public onLoad(): void {
		EventHandler.subscribe("playerConnecting", (name: string, _: (reason: string) => void, deferrals: any) => this.onDefer(name, deferrals, source));
	}
	public onUnload(): void {
		EventHandler.unsubscribe("playerConnecting", (name: string, _: (reason: string) => void, deferrals: any) => this.onDefer(name, deferrals, source));
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
		const response = await fetch(`https://blackbox.ipinfo.app/lookup/${ipv4}`, {
			method: "GET",
			headers: {
				"User-Agent": "request",
			},
		});
		if (!response.ok) {
			Logger.error(`Defer HTTP error! Status: ${response.status}`);
			throw new Error(`Defer HTTP error! Status: ${response.status}`);
		}
		return (await response.text())[0] == "Y";
	}

	/**
	 * Handles deferrals for a given player.
	 * @param name - The name of the player.
	 * @param deferrals - The deferral object for the player.
	 * @param source - The player's source ID.
	 * @returns A Promise that resolves when the deferral is complete.
	 */
	private async onDefer(name: string, deferrals: any, source: number): Promise<void> {
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
		} catch (err: any) {
			Logger.error(err.message);
		}
	}
}
