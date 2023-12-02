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
	f242: number;
	f104: number;
	cameraShake: number;
	isAudible: boolean;
	f189: number;
	isInvisible: boolean;
	f126: number;
	f241: number;
	f243: number;
	f210: number;
	unkX: number;
	unkY: number;
	unkZ: number;
	f190: number;
	f191: number;
	f164: number;
	posX224: number;
	posY224: number;
	posZ224: number;
	f168?: number;
	f240: number;
	f218: number;
	f216: number;
};

/**
 * Represents the data structure for a FireEvent.
 */
export type FireEvent = {
	isEntity: boolean;
	entityGlobalId: number;
	v5X: number;
	v5Y: number;
	v5Z: number;
	posX: number;
	posY: number;
	posZ: number;
	v7: number;
	v8: number;
	maxChildren: number;
	v10: number;
	v11: number;
	weaponHash: number;
	fireId: number;
};

/**
 * Represents an event for giving a weapon to a ped.
 */
export type GiveWeaponEvent = {
	/**
	 * The ID of the ped to give the weapon to.
	 */
	pedId: number;
	/**
	 * The type of weapon to give.
	 */
	weaponType: number;
	/**
	 * The amount of ammo to give with the weapon.
	 */
	ammo: number;
	/**
	 * Indicates whether the weapon is given as an unknown value.
	 */
	unk1: boolean;
	/**
	 * Indicates whether the weapon is given as a pickup.
	 */
	givenAsPickup: boolean;
};

/**
 * Represents an event for removing a weapon from a ped.
 */
export type RemoveWeaponEvent = {
	/**
	 * The ID of the ped.
	 */
	pedId: number;
	/**
	 * The type of weapon to be removed.
	 */
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
 * Represents an event for txAdmin authentication.
 */
export type AdminAuthEvent = {
	netid: number;
	isAdmin: boolean;
	username: string;
};
