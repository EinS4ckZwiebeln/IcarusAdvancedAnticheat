import { DiscordEmbed } from "../Types";
import { Utility } from "../util/Utility";

/**
 * Represents an update embed for Icarus Advanced Anticheat.
 */
export class UpdateEmbed {
	private readonly _embed: DiscordEmbed[];

	/**
	 * Creates a new instance of UpdateEmbed.
	 * @param remoteVersion The remote version of Icarus Advanced Anticheat.
	 */
	constructor(remoteVersion: string) {
		this._embed = [this.constructUpdateEmbed(remoteVersion)];
	}

	/**
	 * Gets the embed object.
	 */
	get embed(): DiscordEmbed[] {
		return this._embed;
	}

	/**
	 * Constructs the update embed object.
	 * @param remoteVersion The remote version of Icarus Advanced Anticheat.
	 * @returns The constructed update embed object.
	 */
	private constructUpdateEmbed(remoteVersion: string): DiscordEmbed {
		return {
			color: "8421631",
			author: {
				name: `Icarus Advanced Anticheat v${Utility.CURRENT_VERSION}`,
				icon_url: "https://github.com/EinS4ckZwiebeln/assets/raw/main/icarus_icon.png",
			},
			title: "New Update Available",
			description: `This version of Icarus is outdated. Please update to the latest version!\n\n**Latest Version:** v${remoteVersion} | **Current Version:** v${Utility.CURRENT_VERSION}`,
			url: "https://github.com/EinS4ckZwiebeln/IcarusAdvancedAnticheat/releases",
			footer: {
				text: "Icarus Update Checker",
			},
		};
	}
}
