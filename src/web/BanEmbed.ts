import { Utility } from "../util/Utility";

/**
 * Represents a ban embed for Discord.
 */
export class BanEmbed {
	private readonly _embed: object[];

	/**
	 * Initializes a new instance of the BanEmbed class.
	 * @param source The source of the ban.
	 * @param reason The reason for the ban.
	 * @param fileName The name of the file attached to the embed.
	 */
	constructor(source: number, reason: string, fileName: string) {
		this._embed = this.constructBanEmbed(source, reason, fileName);
	}

	/**
	 * Gets the embed object.
	 */
	get embed(): object[] {
		return this._embed;
	}

	/**
	 * Returns a clean player identifier for the given source and type.
	 * @param source The player source.
	 * @param type The identifier type.
	 * @returns The clean player identifier.
	 */
	private getCleanPlayerIdentifier(source: number, type: string): string {
		const id = GetPlayerIdentifierByType(source.toString(), type);
		return typeof id != "string" ? `${type}:unknownlicense` : id;
	}

	/**
	 * Constructs a ban embed object.
	 * @param source - The source of the ban.
	 * @param reason - The reason for the ban.
	 * @param fileName - The name of the file to be attached to the embed.
	 * @returns An array containing the ban embed object.
	 */
	private constructBanEmbed(source: number, reason: string, fileName: string): object[] {
		return [
			{
				color: "8421631",
				author: {
					name: `Icarus Advanced Anticheat v${Utility.CURRENT_VERSION}`,
					icon_url: "https://github.com/EinS4ckZwiebeln/assets/raw/main/icarus_icon.png",
				},
				title: "Cheater Detected",
				fields: [
					{
						name: "Violation",
						value: reason,
						inline: true,
					},
					{
						name: "Name",
						value: `${GetPlayerName(source.toString())} (${source})`,
						inline: true,
					},
					{
						name: "Discord",
						value: `<@${this.getCleanPlayerIdentifier(source, "discord").slice(8)}>`,
						inline: true,
					},
					{
						name: "FiveM",
						value: this.getCleanPlayerIdentifier(source, "license"),
						inline: false,
					},
				],
				timestamp: new Date().toISOString(),
				image: {
					url: `attachment://${fileName}`,
				},
				footer: {
					text: "Icarus Ban Alert",
				},
			},
		];
	}
}
