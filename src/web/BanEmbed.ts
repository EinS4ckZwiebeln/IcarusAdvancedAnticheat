import { DiscordEmbed, EmbedField } from "../Types";
import { Utility } from "../util/Utility";

/**
 * Represents a ban embed for Discord.
 */
export class BanEmbed {
	private readonly _embed: DiscordEmbed[];
	// List of identifiers to be displayed in the embed
	private readonly _identifiers = ["license", "steam", "xbl"];

	/**
	 * Initializes a new instance of the BanEmbed class.
	 * @param source The source of the ban.
	 * @param reason The reason for the ban.
	 * @param fileName The name of the file attached to the embed.
	 */
	constructor(source: number, reason: string, fileName: string) {
		this._embed = [this.constructBanEmbed(source, reason, fileName)];
	}

	/**
	 * Gets the embed object.
	 */
	public get embed(): DiscordEmbed[] {
		return this._embed;
	}

	/**
	 * Returns a clean player identifier for the given source and type.
	 * @param source The player source.
	 * @param type The identifier type.
	 * @returns The clean player identifier.
	 */
	private getRawPlayerIdentifier(source: number, type: string): string {
		const id = GetPlayerIdentifierByType(source.toString(), type);
		if (typeof id === "string") {
			return id.slice(id.indexOf(":") + 1);
		} else {
			return "unknown";
		}
	}

	/**
	 * Generates an array of identifier fields for a given source.
	 * @param source - The source number.
	 * @returns An array of identifier fields.
	 */
	private generateIdentifierFields(source: number): EmbedField[] {
		return this._identifiers
			.map((identifier) => ({
				rawId: this.getRawPlayerIdentifier(source, identifier),
				identifier,
			}))
			.filter(({ rawId }) => rawId !== "unknown")
			.map(({ rawId, identifier }) => ({
				name: `${identifier.charAt(0).toUpperCase()}${identifier.slice(1)}`,
				value: `\`\`\`${rawId}\`\`\``,
				inline: false,
			}));
	}

	/**
	 * Constructs a ban embed object.
	 * @param source - The source of the ban.
	 * @param reason - The reason for the ban.
	 * @param fileName - The name of the file to be attached to the embed.
	 * @returns An array containing the ban embed object.
	 */
	private constructBanEmbed(source: number, reason: string, fileName: string): DiscordEmbed {
		return {
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
					name: "Player",
					value: `${GetPlayerName(source.toString())} (${source})`,
					inline: true,
				},
				{
					name: "Discord",
					value: `<@${this.getRawPlayerIdentifier(source, "discord")}>`,
					inline: true,
				},
				...this.generateIdentifierFields(source),
			],
			timestamp: new Date().toISOString(),
			image: {
				url: `attachment://${fileName}`,
			},
			footer: {
				text: "Icarus Ban Alert",
			},
		};
	}
}
