/**
 * Represents the configuration object for the application.
 */
export type config = {
	/**
	 * An object containing permission settings.
	 */
	Permission: object;
	/**
	 * The Discord webhook URL for logging.
	 */
	DiscordWebhook: string;
	/**
	 * An object containing module settings.
	 */
	Modules: any;
	/**
	 * An array of blacklisted weapon names.
	 */
	BlacklistedWeapons: string[];
	/**
	 * An array of blacklisted event names.
	 */
	BlacklistedEvents: any;
	/**
	 * An array of illegal model names.
	 */
	IllegalModels: string[];
};
