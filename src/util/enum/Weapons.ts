/**
 * Enum containing all the weapons available in the game.
 */
export enum Weapons {
	// Melee Weapons
	WEAPON_DAGGER = 0x92a27487,
	WEAPON_BAT = 0x958a4a8f,
	WEAPON_BOTTLE = 0xf9e6aa4b,
	WEAPON_CROWBAR = 0x84bd7bfd,
	WEAPON_UNARMED = 0xa2719263,
	WEAPON_FLASHLIGHT = 0x8bb05fd7,
	WEAPON_GOLFCLUB = 0x440e4788,
	WEAPON_HAMMER = 0x4e875f73,
	WEAPON_HATCHET = 0xf9dcbf2d,
	WEAPON_KNUCKLE = 0xd8df3c3c,
	WEAPON_KNIFE = 0x99b507ea,
	WEAPON_MACHETE = 0xdd5df8d9,
	WEAPON_SWITCHBLADE = 0xdfe37640,
	WEAPON_NIGHTSTICK = 0x678b81b1,
	WEAPON_WRENCH = 0x19044ee0,
	WEAPON_BATTLEAXE = 0xcd274149,
	WEAPON_POOLCUE = 0x94117305,
	WEAPON_STONE_HATCHET = 0x3813fc08,
	WEAPON_CANDYCANE = 0x6589186a,

	// Handguns
	WEAPON_PISTOL = 0x1b06d571,
	WEAPON_PISTOL_MK2 = 0xbfe256d4,
	WEAPON_COMBATPISTOL = 0x5ef9fec4,
	WEAPON_APPISTOL = 0x22d8fe39,
	WEAPON_STUNGUN = 0x3656c8c1,
	WEAPON_PISTOL50 = 0x99aeeb3b,
	WEAPON_SNSPISTOL = 0xbfd21232,
	WEAPON_SNSPISTOL_MK2 = 0x88374054,
	WEAPON_HEAVYPISTOL = 0xd205520e,
	WEAPON_VINTAGEPISTOL = 0x83839c4,
	WEAPON_FLAREGUN = 0x47757124,
	WEAPON_MARKSMANPISTOL = 0xdc4db296,
	WEAPON_REVOLVER = 0xc1b3c3d1,
	WEAPON_REVOLVER_MK2 = 0xcb96392f,
	WEAPON_DOUBLEACTION = 0x97ea20b8,
	WEAPON_RAYPISTOL = 0xaf3696a1,
	WEAPON_CERAMICPISTOL = 0x2b5ef5ec,
	WEAPON_NAVYREVOLVER = 0x917f6c8c,
	WEAPON_GADGETPISTOL = 0x57a4368c,
	WEAPON_STUNGUN_MP = 0x45cd9cf3,
	WEAPON_PISTOLXM3 = 0x1bc4fdb9,

	// Submachine Guns
	WEAPON_MICROSMG = 0x13532244,
	WEAPON_SMG = 0x2be6766b,
	WEAPON_SMG_MK2 = 0x78a97cd0,
	WEAPON_ASSAULTSMG = 0xefe7e2df,
	WEAPON_COMBATPDW = 0x0a3d4d34,
	WEAPON_MACHINEPISTOL = 0xdb1aa450,
	WEAPON_MINISMG = 0xbd248b55,
	WEAPON_RAYCARBINE = 0x476bf155,
	WEAPON_TECPISTOL = 0x14e5afd5,

	// Shotguns
	WEAPON_PUMPSHOTGUN = 0x1d073a89,
	WEAPON_PUMPSHOTGUN_MK2 = 0x555af99a,
	WEAPON_SAWNOFFSHOTGUN = 0x7846a318,
	WEAPON_ASSAULTSHOTGUN = 0xe284c527,
	WEAPON_BULLPUPSHOTGUN = 0x9d61e50f,
	WEAPON_MUSKET = 0xa89cb99e,
	WEAPON_HEAVYSHOTGUN = 0x3aabbbaa,
	WEAPON_DBSHOTGUN = 0xef951fbb,
	WEAPON_AUTOSHOTGUN = 0x12e82d3d,
	WEAPON_COMBATSHOTGUN = 0x5a96ba4,

	// Assault Rifles
	WEAPON_ASSAULTRIFLE = 0xbfefff6d,
	WEAPON_ASSAULTRIFLE_MK2 = 0x394f415c,
	WEAPON_CARBINERIFLE = 0x83bf0278,
	WEAPON_CARBINERIFLE_MK2 = 0xfad1f1c9,
	WEAPON_ADVANCEDRIFLE = 0xaf113f99,
	WEAPON_SPECIALCARBINE = 0xc0a3098d,
	WEAPON_SPECIALCARBINE_MK2 = 0x969c3d67,
	WEAPON_BULLPUPRIFLE = 0x7f229f94,
	WEAPON_BULLPUPRIFLE_MK2 = 0x84d6fafd,
	WEAPON_COMPACTRIFLE = 0x624fe830,
	WEAPON_MILITARYRIFLE = 0x9d1f17e6,
	WEAPON_HEAVYRIFLE = 0xc78d71b4,
	WEAPON_TACTICALRIFLE = 0xd1d5f52b,

	// Light Machine Guns
	WEAPON_MG = 0x9d07f764,
	WEAPON_COMBATMG = 0x7fd62962,
	WEAPON_COMBATMG_MK2 = 0xdbbd7280,
	WEAPON_GUSENBERG = 0x61012683,

	// Sniper Rifles
	WEAPON_SNIPERRIFLE = 0x05fc3c11,
	WEAPON_HEAVYSNIPER = 0x0c472fe2,
	WEAPON_HEAVYSNIPER_MK2 = 0xa914799,
	WEAPON_MARKSMANRIFLE = 0xc734385a,
	WEAPON_MARKSMANRIFLE_MK2 = 0x6a6c02e0,
	WEAPON_PRECISIONRIFLE = 0x6e7dddec,

	// Heavy Weapons
	WEAPON_RPG = 0xb1ca77b1,
	WEAPON_GRENADELAUNCHER = 0xa284510b,
	WEAPON_GRENADELAUNCHER_SMOKE = 0x4dd2dc56,
	WEAPON_MINIGUN = 0x42bf8a85,
	WEAPON_FIREWORK = 0x7f7497e5,
	WEAPON_RAILGUN = 0x6d544c99,
	WEAPON_HOMINGLAUNCHER = 0x63ab0442,
	WEAPON_COMPACTLAUNCHER = 0x0781fe4a,
	WEAPON_RAYMINIGUN = 0xb62d1f67,
	WEAPON_EMPLAUNCHER = 0xdb26713a,
	WEAPON_RAILGUNXM3 = 0xfea23564,

	// Throwables
	WEAPON_GRENADE = 0x93e220bd,
	WEAPON_BZGAS = 0xa0973d5e,
	WEAPON_MOLOTOV = 0x24b17070,
	WEAPON_STICKYBOMB = 0x2c3731d9,
	WEAPON_PROXMINE = 0xab564b93,
	WEAPON_SNOWBALL = 0x787f0bb,
	WEAPON_PIPEBOMB = 0xba45e8b8,
	WEAPON_BALL = 0x23c9f95c,
	WEAPON_SMOKEGRENADE = 0xfdbc8a50,
	WEAPON_FLARE = 0x497facc3,
	WEAPON_ACIDPACKAGE = 0xf7f1e25e,

	// Miscellaneous
	WEAPON_PETROLCAN = 0x34a67b97,
	WEAPON_PARACHUTE = 0xfbab5776,
	WEAPON_FIREEXTINGUISHER = 0x060ec506,
	WEAPON_HAZARDCAN = 0xba536372,
	WEAPON_FERTILIZERCAN = 0x184140a1,
	WEAPON_ELECTRIC_FENCE = 0x92bd4ebb,
	WEAPON_EXHAUSTION = 0x364a29ec,
	WEAPON_HIT_BY_WATER_CANNON = 0xcc34325e,
	WEAPON_ANIMAL = 0xf9fbaebe,
	WEAPON_COUGAR = 0x08d4be52,
	WEAPON_NIGHTVISION = 0xa720365c,

	// Vehicle Weapons
	VEHICLE_WEAPON_ROTORS = 2971687502,
	VEHICLE_WEAPON_TANK = 1945616459,
	VEHICLE_WEAPON_SEARCHLIGHT = 3450622333,
	VEHICLE_WEAPON_RADAR = 3530961278,
	VEHICLE_WEAPON_PLAYER_BULLET = 1259576109,
	VEHICLE_WEAPON_PLAYER_LAZER = 4026335563,
	VEHICLE_WEAPON_ENEMY_LASER = 1566990507,
	VEHICLE_WEAPON_PLAYER_BUZZARD = 1186503822,
	VEHICLE_WEAPON_PLAYER_HUNTER = 2669318622,
	VEHICLE_WEAPON_PLANE_ROCKET = 3473446624,
	VEHICLE_WEAPON_SPACE_ROCKET = 4171469727,
	VEHICLE_WEAPON_APC_CANNON = 328167896,
	VEHICLE_WEAPON_APC_MISSILE = 1151689097,
	VEHICLE_WEAPON_APC_MG = 190244068,
	VEHICLE_WEAPON_WATER_CANNON = 1741783703,
	VEHICLE_WEAPON_TURRET_INSURGENT = 1155224728,
	VEHICLE_WEAPON_PLAYER_SAVAGE = 1638077257,
	VEHICLE_WEAPON_TURRET_TECHNICAL = 2144528907,
	VEHICLE_WEAPON_NOSE_TURRET_VALKYRIE = 1097917585,
	VEHICLE_WEAPON_TURRET_VALKYRIE = 2756787765,
	VEHICLE_WEAPON_CANNON_BLAZER = 3959029566,
	VEHICLE_WEAPON_TURRET_BOXVILLE = 3041872152,
	VEHICLE_WEAPON_RUINER_BULLET = 50118905,
	VEHICLE_WEAPON_RUINER_ROCKET = 84788907,
	VEHICLE_WEAPON_HUNTER_MG = 1119518887,
	VEHICLE_WEAPON_HUNTER_MISSILE = 153396725,
	VEHICLE_WEAPON_HUNTER_CANNON = 704686874,
	VEHICLE_WEAPON_HUNTER_BARRAGE = 785467445,
	VEHICLE_WEAPON_TULA_NOSEMG = 1100844565,
	VEHICLE_WEAPON_TULA_MG = 1217122433,
	VEHICLE_WEAPON_TULA_DUALMG = 2966510603,
	VEHICLE_WEAPON_TULA_MINIGUN = 376489128,
	VEHICLE_WEAPON_SEABREEZE_MG = 1371067624,
	VEHICLE_WEAPON_MICROLIGHT_MG = 3303022956,
	VEHICLE_WEAPON_DOGFIGHTER_MG = 1595421922,
	VEHICLE_WEAPON_DOGFIGHTER_MISSILE = 3393648765,
	VEHICLE_WEAPON_MOGUL_NOSE = 4128808778,
	VEHICLE_WEAPON_MOGUL_DUALNOSE = 3857952303,
	VEHICLE_WEAPON_MOGUL_TURRET = 3808236382,
	VEHICLE_WEAPON_MOGUL_DUALTURRET = 3123149825,
	VEHICLE_WEAPON_ROGUE_MG = 158495693,
	VEHICLE_WEAPON_ROGUE_CANNON = 3878337474,
	VEHICLE_WEAPON_ROGUE_MISSILE = 1820910717,
	VEHICLE_WEAPON_BOMBUSHKA_DUALMG = 741027160,
	VEHICLE_WEAPON_BOMBUSHKA_CANNON = 3628350041,
	VEHICLE_WEAPON_HAVOK_MINIGUN = 855547631,
	VEHICLE_WEAPON_VIGILANTE_MG = 4094131943,
	VEHICLE_WEAPON_VIGILANTE_MISSILE = 1347266149,
	VEHICLE_WEAPON_TURRET_LIMO = 729375873,
	VEHICLE_WEAPON_DUNE_MG = 3507816399,
	VEHICLE_WEAPON_DUNE_GRENADELAUNCHER = 2700898573,
	VEHICLE_WEAPON_DUNE_MINIGUN = 1416047217,
	VEHICLE_WEAPON_TAMPA_MISSILE = 2656583842,
	VEHICLE_WEAPON_TAMPA_MORTAR = 1015268368,
	VEHICLE_WEAPON_TAMPA_FIXEDMINIGUN = 3670375085,
	VEHICLE_WEAPON_TAMPA_DUALMINIGUN = 1744687076,
	VEHICLE_WEAPON_HALFTRACK_DUALMG = 1331922171,
	VEHICLE_WEAPON_HALFTRACK_QUADMG = 1226518132,
}
