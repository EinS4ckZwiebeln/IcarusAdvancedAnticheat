import { Projectiles } from "../enum/Projectiles";
import { Weapons } from "../enum/Weapons";
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
	public static readonly EXPORTS = global.exports;

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
		Weapons.WEAPON_PARACHUTE,
		Weapons.WEAPON_FIREEXTINGUISHER,
		Weapons.WEAPON_HIT_BY_WATER_CANNON,
	]);

	/**
	 * Set of vehicle weapons.
	 */
	public static readonly WEAPONS_VEHICLE = new Set([
		// Vehicle Weapons
		Weapons.VEHICLE_WEAPON_TANK,
		Weapons.VEHICLE_WEAPON_PLAYER_BUZZARD,
		Weapons.VEHICLE_WEAPON_PLAYER_HUNTER,
		Weapons.VEHICLE_WEAPON_PLANE_ROCKET,
		Weapons.VEHICLE_WEAPON_SPACE_ROCKET,
		Weapons.VEHICLE_WEAPON_APC_CANNON,
		Weapons.VEHICLE_WEAPON_APC_MISSILE,
		Weapons.VEHICLE_WEAPON_APC_MG,
		Weapons.VEHICLE_WEAPON_TURRET_INSURGENT,
		Weapons.VEHICLE_WEAPON_TURRET_TECHNICAL,
		Weapons.VEHICLE_WEAPON_NOSE_TURRET_VALKYRIE,
		Weapons.VEHICLE_WEAPON_TURRET_VALKYRIE,
		Weapons.VEHICLE_WEAPON_CANNON_BLAZER,
		Weapons.VEHICLE_WEAPON_TURRET_BOXVILLE,
		Weapons.VEHICLE_WEAPON_RUINER_BULLET,
		Weapons.VEHICLE_WEAPON_RUINER_ROCKET,
		Weapons.VEHICLE_WEAPON_HUNTER_MG,
		Weapons.VEHICLE_WEAPON_HUNTER_MISSILE,
		Weapons.VEHICLE_WEAPON_HUNTER_CANNON,
		Weapons.VEHICLE_WEAPON_HUNTER_BARRAGE,
		Weapons.VEHICLE_WEAPON_TULA_NOSEMG,
		Weapons.VEHICLE_WEAPON_TULA_MG,
		Weapons.VEHICLE_WEAPON_TULA_DUALMG,
		Weapons.VEHICLE_WEAPON_TULA_MINIGUN,
		Weapons.VEHICLE_WEAPON_SEABREEZE_MG,
		Weapons.VEHICLE_WEAPON_MICROLIGHT_MG,
		Weapons.VEHICLE_WEAPON_DOGFIGHTER_MG,
		Weapons.VEHICLE_WEAPON_DOGFIGHTER_MISSILE,
		Weapons.VEHICLE_WEAPON_MOGUL_NOSE,
		Weapons.VEHICLE_WEAPON_MOGUL_DUALNOSE,
		Weapons.VEHICLE_WEAPON_MOGUL_TURRET,
		Weapons.VEHICLE_WEAPON_MOGUL_DUALTURRET,
		Weapons.VEHICLE_WEAPON_ROGUE_MG,
		Weapons.VEHICLE_WEAPON_ROGUE_CANNON,
		Weapons.VEHICLE_WEAPON_ROGUE_MISSILE,
		Weapons.VEHICLE_WEAPON_BOMBUSHKA_DUALMG,
		Weapons.VEHICLE_WEAPON_BOMBUSHKA_CANNON,
		Weapons.VEHICLE_WEAPON_HAVOK_MINIGUN,
		Weapons.VEHICLE_WEAPON_VIGILANTE_MG,
		Weapons.VEHICLE_WEAPON_VIGILANTE_MISSILE,
		Weapons.VEHICLE_WEAPON_TURRET_LIMO,
		Weapons.VEHICLE_WEAPON_DUNE_MG,
		Weapons.VEHICLE_WEAPON_DUNE_GRENADELAUNCHER,
		Weapons.VEHICLE_WEAPON_DUNE_MINIGUN,
		Weapons.VEHICLE_WEAPON_TAMPA_MISSILE,
		Weapons.VEHICLE_WEAPON_TAMPA_MORTAR,
		Weapons.VEHICLE_WEAPON_TAMPA_FIXEDMINIGUN,
		Weapons.VEHICLE_WEAPON_TAMPA_DUALMINIGUN,
		Weapons.VEHICLE_WEAPON_HALFTRACK_DUALMG,
		Weapons.VEHICLE_WEAPON_HALFTRACK_QUADMG,
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
		Weapons.WEAPON_NIGHTVISION,
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
		return arr.map((x) => GetHashKey(x));
	}

	/**
	 * Calculates the Euclidean distance between two points in 2D space.
	 * @param coords1 An array containing the x and y coordinates of the first point.
	 * @param coords2 An array containing the x and y coordinates of the second point.
	 * @returns The Euclidean distance between the two points.
	 */
	public static getDistance(coords1: number[], coords2: number[], includeZ: boolean = false): number {
		const [x1, y2, z2] = coords1;
		const [x2, y1, z1] = coords2;
		// Euclidean distance formula
		if (!includeZ) {
			return Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
		}
		return Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1) + (z2 - z1) * (z2 - z1));
	}

	/**
	 * Checks if a string value is null, undefined, or empty.
	 *
	 * @param value - The string value to check.
	 * @returns `true` if the value is null, undefined, or empty; otherwise, `false`.
	 */
	public static isNullOrEmtpy(value: string): boolean {
		return value === null || value === undefined || value === "";
	}
}
