/**
 * Represents the configuration object for the application.
 */
export type Configuration = {
	/**
	 * An object containing permission settings.
	 */
	Permission: {
		bypassPermission: string;
		useTxAdmin: boolean;
	};
	Telemetry: boolean;
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
/**
 * Represents a set of deferral actions.
 */
export type Deferrals = {
	/**
	 * Defers the execution of the script.
	 */
	defer: () => void;
	/**
	 * Updates the deferral message.
	 * @param message - The new message to display.
	 */
	update: (message: string) => void;
	/**
	 * Presents a card to the user.
	 * @param card - The card object or string representation.
	 * @param cb - Optional callback function to handle the card data and raw data.
	 */
	presentCard: (card: object | string, cb?: (data: object, rawData: string) => void) => void;
	/**
	 * Marks the deferral as done.
	 * @param failureReason - Optional reason for deferral failure.
	 */
	done: (failureReason?: string) => void;
};
/**
 * Represents a Discord embed.
 */
export type DiscordEmbed = {
	color: string;
	author: {
		name: string;
		icon_url: string;
	};
	title: string;
	description?: string;
	url?: string;
	fields?: EmbedField[];
	timestamp?: string;
	image?: {
		url: string;
	};
	footer?: {
		text: string;
	};
};
/**
 * Represents a field in an embed.
 */
export type EmbedField = {
	name: string;
	value: string;
	inline: boolean;
};
/**
 * Represents a deferrals config object.
 */
export type DeferralsObject = {
	enabled: boolean;
	rejectionMsg: string;
};
/**
 * Represents a help parameter for a command suggestion.
 */
export type Parameter = {
	name: string;
	help: string;
};
/**
 * Represents a command suggestion object.
 */
export type ChatSuggestion = {
	command: string;
	description: string;
	parameters: Parameter[];
};
/**
 * Represents release version data from github.
 */
export type Release = {
	id: number;
	name: string;
	prerelease: boolean;
};
/**
 * Represents a discord webhook payload object.
 */
export type WebhookPayload = {
	username: string;
	embeds?: object;
};
/**
 * Represents an event that occurs when a weapon causes damage.
 */
export type WeaponDamageEvent = {
	actionResultId: number;
	actionResultName: number;
	damageFlags: number;
	damageTime: number;
	damageType: number;
	f104: number;
	f112: boolean;
	f112_1: number;
	f120: number;
	f133: boolean;
	hasActionResult: boolean;
	hasImpactDir: boolean;
	hasVehicleData: boolean;
	hitComponent: number;
	hitEntityWeapon: boolean;
	hitGlobalId: number;
	hitGlobalIds: number[];
	hitWeaponAmmoAttachment: boolean;
	impactDirX: number;
	impactDirY: number;
	impactDirZ: number;
	isNetTargetPos: boolean;
	localPosX: number;
	localPosY: number;
	localPosZ: number;
	overrideDefaultDamage: boolean;
	parentGlobalId: number;
	silenced: boolean;
	suspensionIndex: number;
	tyreIndex: number;
	weaponDamage: number;
	weaponType: number;
	willKill: boolean;
};
/**
 * Represents an ExplosionEvent.
 */
export type ExplosionEvent = {
	f186: number;
	f208: number;
	ownerNetId: number;
	f214: number;
	explosionType: number;
	damageScale: number;
	posX: number;
	posY: number;
	posZ: number;
	f242: boolean;
	f104: number;
	cameraShake: number;
	isAudible: boolean;
	f189: boolean;
	isInvisible: boolean;
	f126: boolean;
	f241: boolean;
	f243: boolean;
	f210: number;
	unkX: number;
	unkY: number;
	unkZ: number;
	f190: boolean;
	f191: boolean;
	f164: number;
	posX224: number;
	posY224: number;
	posZ224: number;
	f168?: number;
	f240: boolean;
	f218: number;
	f216: boolean;
};
/**
 * Represents the data structure for a FireEvent.
 */
export type FireEvent = {
	v1: number;
	v2: boolean;
	v4: boolean;
	isEntity: boolean;
	entityGlobalId: number;
	v5X: number;
	v5Y: number;
	v5Z: number;
	posX: number;
	posY: number;
	posZ: number;
	v7: number;
	v8: boolean;
	maxChildren: number;
	v10: number;
	v11: number;
	v12: boolean;
	weaponHash: number;
	fireId: number;
	v13: number;
};
/**
 * Represents an event for giving a weapon to a ped.
 */
export type GiveWeaponEvent = {
	pedId: number;
	weaponType: number;
	ammo: number;
	unk1: boolean;
	givenAsPickup: boolean;
};
/**
 * Represents an event for removing a weapon from a ped.
 */
export type RemoveWeaponEvent = {
	pedId: number;
	weaponType: number;
};
/**
 * Represents an event that removes all weapons from a ped.
 */
export type RemoveAllWeaponsEvent = { pedId: number };
/**
 * Represents the event data for starting a projectile.
 */
export type StartProjectileEvent = {
	commandFireSingleBullet: boolean;
	effectGroup: number;
	firePositionX: number;
	firePositionY: number;
	firePositionZ: number;
	initialPositionX: number;
	initialPositionY: number;
	initialPositionZ: number;
	ownerId: number;
	projectileHash: number;
	targetEntity: number;
	throwTaskSequence: number;
	unk10: number;
	unk11: number;
	unk12: number;
	unk13: number;
	unk14: number;
	unk15: number;
	unk16: number;
	unk3: number;
	unk4: number;
	unk5: number;
	unk6: number;
	unk7: number;
	unk9: number;
	unkX8: number;
	unkY8: number;
	unkZ8: number;
	weaponHash: number;
};
/**
 * Represents a PtFxEvent.
 */
export type PtFxEvent = {
	assetHash: number;
	axisBitset: number;
	effectHash: number;
	entityNetId: number;
	f100: number;
	f105: number;
	f106: number;
	f107: number;
	f109: boolean;
	f110: boolean;
	f111: boolean;
	f92: number;
	isOnEntity: boolean;
	offsetX: number;
	offsetY: number;
	offsetZ: number;
	posX: number;
	posY: number;
	posZ: number;
	rotX: number;
	rotY: number;
	rotZ: number;
	scale: number;
};
/**
 * Represents an player enetered/left scope event.
 */
export type PlayerScopeEvent = {
	for: string;
	player: string;
};
/**
 * Represents an event for txAdmin authentication.
 */
export type AdminAuthEvent = {
	netid: number;
	isAdmin: boolean;
	username: string;
};
/**
 * Represents a temporary detection bypass managed by the excuse handler.
 */
export type Excuse = {
	module: string;
};
/**
 * Represents a screenshot taken by screenshot-basic.
 */
export type Screenshot = {
	fileName: string;
	filePath: string;
};
/**
 * Represents a damage record with the amount of damage and the time it occurred.
 */
export type DamageRecord = {
	damage: number;
	time: number;
};

export type ReturnType = "int" | "float" | "string" | "vector";
