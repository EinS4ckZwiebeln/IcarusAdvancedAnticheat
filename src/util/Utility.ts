import { Projectiles } from "./enum/Projectiles";
import { Weapons } from "./enum/Weapons";
/**
 * A utility class containing various static methods and properties.
 */
export class Utility {
	/**
	 * Throws an error if an attempt is made to instantiate the class.
	 */
	constructor() {
		throw new Error("Utility is a static class and cannot be instantiated.");
	}

	/**
	 * The name of the current resource.
	 */
	public static readonly RESOURCE_NAME = GetCurrentResourceName();

	/**
	 * The current version of the resource.
	 */
	public static readonly CURRENT_VERSION = GetResourceMetadata(Utility.RESOURCE_NAME, "version", 0);

	/**
	 * The number of degrees in one radian.
	 */
	public static readonly RADIANS = 180 / Math.PI;

	/**
	 * The exports object from the global scope.
	 */
	public static readonly EXPORTS = (<any>global).exports;

	/**
	 * Set of melee weapons.
	 */
	public static readonly WEAPONS_MELEE = new Set([
		// Melee Weapons
		Weapons.WEAPON_DAGGER,
		Weapons.WEAPON_BAT,
		Weapons.WEAPON_BOTTLE,
		Weapons.WEAPON_CROWBAR,
		Weapons.WEAPON_UNARMED,
		Weapons.WEAPON_FLASHLIGHT,
		Weapons.WEAPON_GOLFCLUB,
		Weapons.WEAPON_HAMMER,
		Weapons.WEAPON_HATCHET,
		Weapons.WEAPON_KNUCKLE,
		Weapons.WEAPON_KNIFE,
		Weapons.WEAPON_MACHETE,
		Weapons.WEAPON_SWITCHBLADE,
		Weapons.WEAPON_NIGHTSTICK,
		Weapons.WEAPON_WRENCH,
		Weapons.WEAPON_BATTLEAXE,
		Weapons.WEAPON_POOLCUE,
		Weapons.WEAPON_STONE_HATCHET,
		Weapons.WEAPON_CANDYCANE,
	]);

	/**
	 * Set of area-of-effect weapons.
	 */
	public static readonly WEAPONS_AOE = new Set([
		// Heavy Weapons
		Weapons.WEAPON_RPG,
		Weapons.WEAPON_GRENADELAUNCHER,
		Weapons.WEAPON_GRENADELAUNCHER_SMOKE,
		Weapons.WEAPON_MINIGUN,
		Weapons.WEAPON_FIREWORK,
		Weapons.WEAPON_RAILGUN,
		Weapons.WEAPON_HOMINGLAUNCHER,
		Weapons.WEAPON_COMPACTLAUNCHER,
		Weapons.WEAPON_RAYMINIGUN,
		Weapons.WEAPON_EMPLAUNCHER,
		Weapons.WEAPON_RAILGUNXM3,

		// Throwables
		Weapons.WEAPON_GRENADE,
		Weapons.WEAPON_BZGAS,
		Weapons.WEAPON_MOLOTOV,
		Weapons.WEAPON_STICKYBOMB,
		Weapons.WEAPON_PROXMINE,
		Weapons.WEAPON_PIPEBOMB,
		Weapons.WEAPON_SMOKEGRENADE,
		Weapons.WEAPON_FLARE,
		Weapons.WEAPON_FLAREGUN,
		Weapons.WEAPON_ACIDPACKAGE,

		// Miscellaneous
		Weapons.WEAPON_PETROLCAN,
		Weapons.GADGET_PARACHUTE,
		Weapons.WEAPON_FIREEXTINGUISHER,
		Weapons.WEAPON_HIT_BY_WATER_CANNON,
	]);

	/**
	 * Set of non-lethal weapons.
	 */
	public static readonly WEAPONS_NON_LETHAL = new Set([
		// Harmless Weapons
		Weapons.WEAPON_SNOWBALL,
		Weapons.WEAPON_BALL,
		Weapons.WEAPON_HAZARDCAN,
		Weapons.WEAPON_FERTILIZERCAN,
		Weapons.WEAPON_STUNGUN,
		Weapons.WEAPON_STUNGUN_MP,
		Weapons.WEAPON_SMOKEGRENADE,
	]);

	/**
	 * Set of non-lethal projectiles.
	 */
	public static readonly PROJECTILES_NON_LETHAL = new Set([
		// Harmless Weapons
		Projectiles.PROJECTILE_FLARE,
		Projectiles.PROJECTILE_SNOWBALL,
		Projectiles.PROJECTILE_BALL,
	]);

	/**
	 * Set of missile projectiles.
	 */
	public static readonly PROJECTILES_MISSILE = new Set([
		// Missiles
		Projectiles.PROJECTILE_RPGMISSILE,
		Projectiles.PROJECTILE_HOMINGMISSILE,
		Projectiles.PROJECTILE_HYDRAMISSILE,
		Projectiles.PROJECTILE_LAZERMISSILE,
		Projectiles.PROJECTILE_RHINOMISSILE,
		Projectiles.PROJECTILE_FIREWORKMISSILE,
	]);

	/**
	 * Set of throwable projectiles.
	 */
	public static readonly PROJECTILES_THROWABLE = new Set([
		// Throwables
		Projectiles.PROJECTILE_GRENADE,
		Projectiles.PROJECTILE_MOLOTOV,
		Projectiles.PROJECTILE_BZGAS,
		Projectiles.PROJECTILE_TEARGAS,
		Projectiles.PROJECTILE_PIPEBOMB,
		Projectiles.PROJECTILE_PROXIMITYMINE,
		Projectiles.PROJECTILE_STICKYBOMB,
	]);

	/**
	 * Delays the execution of a function by a specified number of milliseconds.
	 * @param ms The number of milliseconds to delay the execution.
	 * @returns A promise that resolves after the specified delay.
	 */
	public static Delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

	/**
	 * Converts an array of strings to an array of their corresponding hash keys.
	 * @param arr The array of strings to convert.
	 * @returns An array of hash keys.
	 */
	public static hashify(arr: string[]) {
		return arr.map((x) => GetHashKey(x)); // No joaat available in TS :(
	}

	/**
	 * Calculates the Euclidean distance between two points in 2D space.
	 * @param x An array containing the x and y coordinates of the first point.
	 * @param y An array containing the x and y coordinates of the second point.
	 * @returns The Euclidean distance between the two points.
	 */
	public static getDistance(x: number[], y: number[]): number {
		const x1: number = x[0];
		const x2: number = x[1];
		const y1: number = y[0];
		const y2: number = y[1];
		return Math.sqrt(y1 - x1) * (y1 - x1) + (y2 - x2) * (y2 - x2);
	}
}