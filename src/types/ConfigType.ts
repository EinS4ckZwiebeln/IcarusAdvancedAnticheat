/**
 * Represents the configuration object for the application.
 */
export type config = {
	/**
	 * An object containing permission settings.
	 */
	Permission: {
		bypassPermission: string;
		useTxAdmin: boolean;
	};
	/**
	 * The Discord webhook URL for logging.
	 */
	DiscordWebhook: string;
	/**
	 * An object containing module settings.
	 */
	Modules: {
		[key: string]: {
			/**
			 * Obviously there is more data being hold by a module,
			 * but as of now there is no need to represent it here.
			 */
			enabled: boolean;
		};
	};
	/**
	 * An array of blacklisted weapon names.
	 */
	BlacklistedWeapons: string[];
	/**
	 * An array of blacklisted event names.
	 */
	BlacklistedEvents: {
		[key: string]: string[];
	};
	/**
	 * An array of illegal model names.
	 */
	IllegalModels: string[];
};
