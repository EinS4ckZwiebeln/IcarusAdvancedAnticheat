ServerConfig = {}

ServerConfig.Debug = GetConvar("IcarusDebug", "false") == "true"

ServerConfig.BypassAcePerm = "icarus.bypass"

-- Ban data and game screenshots are send to this webhook.
-- Screenshot-basic is necessary for this feature to work.
ServerConfig.DiscordWebhook = ""

-- Add your own ban logic here.
function issueBan(source, reason)
	TriggerEvent("EasyAdmin:banPlayer", source, "Cheating (" .. reason .. ")", 1044463300) -- EasyAdmin for the sake of simplicity.
end

-- Server to client heartbeat settings.
-- Do not touch if you have no clue what you are doing!
ServerConfig.LatencyThreshold = 1000 -- ms

-- How often a heartbeat is requested from the players.
ServerConfig.HeartbeatInterval = 30000 -- ms

ServerConfig.UntilForcedHearbeat = 10 * 60000 -- ms

-- The char length of the security hash which is used to verify heartbeats.
ServerConfig.SecurityHashLength = 16

-- EXPERIMENTAL: Scrambles all anticheat events on first server start.
ServerConfig.Scrambler = false

-- Configure any module/detection to your servers needs.
-- Beware that some values are very sensitive and could break everything.
ServerConfig.Modules = {

	-- Checks if the player runs any unknown resources.
	Injection = {
		enabled = true
	},
	
	-- Everything connection related.
	Connect = {
		-- Prevents players using a VPN client from connecting.
		NoVPN = {
			enabled = false,
			rejectionMsg = "Connecting via a VPN is not allowed. Please disable your VPN in order to connect."
		},
		
		-- Filters non alphanumeric playernames.
		NameFilter = {
			enabled = false,
			rejectionMsg = "Your name contains non alphanumeric (a-Z, 0-9) characters. Please consider changing your name in order to connect."
		}
	},
	
	-- Filters non alphanumeric chat messages.
	ChatFilter = {
		enabled = false
	},
	
	-- Used for 'rape' or 'troll' functions in mod menus.
	-- Leaving this enabled is highly recommended.
	ClearTasks = {
		enabled = true
	},
	
	-- Detects if a player has a non whitelisted playermodel (eg. monkey).
	PedBlacklist = {
		enabled = true,
		-- List of all allowed player models. You may add some.
		playerModels = {
			"player_one",
			"player_two",
			"player_zero",
			"mp_m_freemode_01",
			"mp_f_freemode_01",
			"a_m_y_skater_01",
			"a_m_y_skater_02",
			"a_m_y_hipster_01",
			"a_m_y_hipster_02"
		}
	},
	
	-- Detects if the shooter is somewhat looking at his target.
	Aimbot = {
		enabled = true,
		-- Increment this by 1.0 (up to 6.0) if Aimbot C1 false positives occur.
		maxAngle = 3.0
	},
	
	-- Detects if a cheater gives weapons to others.
	GiveWeapon = {
		enabled = true
	},
	
	-- Detects if a cheater removes weapons from others.
	RemoveWeapon = {
		enabled = true
	},
	
	-- Take a look at 'ServerConfig.BlacklistedWeapons'.
	WeaponBlacklist = {
		enabled = true
	},
	
	-- Filters damage data for blacklisted weapons.
	WeaponDamage = {
		enabled = true
	},
	
	-- Detects weapon modifier greater than the 1.0 default.
	-- Disable this if you have any resources that increase weapon damage or similar.
	WeaponModifier = {
		enabled = true,
	},
	
	-- Basic check for invincibility on player damage.
	Godmode = {
		enabled = true
	},
	
	-- Checks for various suspicious particle scenarios.
	Particles = {
		enabled = true,
		-- Detects unsually large particle effects (greater 10.0).
		maxScale = 10.0
	},
	
	-- Detects blacklisted entities/vehicles.
	-- Take a look at 'ServerConfig.IllegalModels'.
	EntityCreate = {
		enabled = true,
		-- Automatically bans the network owner of the illegal entity.
		banNetworkOwner = true
	},
	
	-- Bans players for causing a non whitelisted explosion.
	ExplosionFilter = {
		enabled = true,
		-- Explosion Types: https://docs.fivem.net/natives/?_0xE3AD2BDBAEE269AC
		whitelistedExplosionTypes = {
			6, -- HI_OCTANE
			7, -- CAR
			8, -- PLANE
			9, -- PETROL_PUMP
			10, -- BIKE
			11, -- DIR_STEAM
			12, -- DIR_FLAME
			13, -- DIR_WATER_HYDRANT
			14, -- DIR_GAS_CANISTER
			15, -- BOAT
			16, -- SHIP_DESTROY
			17, -- TRUCK
			22, -- FLARE
			23, -- GAS_CANISTER
			24, -- EXTINGUISHER
			27, -- EXP_TAG_BARREL
			28, -- EXP_TAG_PROPANE
			30, -- EXP_TAG_DIR_FLAME_EXPLODE
			31, -- EXP_TAG_TANKER
			34, -- EXP_TAG_GAS_TANK
			38, -- EXP_TAG_FIREWORK
			39, -- EXP_TAG_SNOWBALL
			78, -- EXP_TAG_FLASHGRENADE
			79 -- EXP_TAG_STUNGRENADE
		}
	},
	
	-- Checks if a player tries to damage a too far away entity.
	WeaponRange = {
		enabled = true,
		-- Max distance to taze somebody.
		maxTazerRange = 15.0
	},
	
	-- Hooks into pre-existing events and bans the player if the condition is met.
	-- A good startingpoint is always to add events that can be exploited by cheaters.
	Events = {
		enabled = true,
		honeyPots = {
			--[[
			{
				event = "your:event",
				condition = function()
					if <your_condition> then
						-- If met bans the player/source.
						return true
					end
					-- Everything is alright.
					return false
				end
			}
			--]]
			{
				event = "esx-qalle-jail:jailPlayer",
				condition = function()
					ESX = nil
					TriggerEvent("esx:getSharedObject", function(obj)
						ESX = obj 
					end)
					local xPlayer = ESX.GetPlayerFromId(source)
					if xPlayer.getJob().name ~= "police" then
						return true
					end
					return false
				end
			}
		}
	}
}

-- Possesion of these weapons will get a player instantly banned.
-- Please check if any weapons on this list are accessible by legit players and remove them if so.
ServerConfig.BlacklistedWeapons = {
	"WEAPON_RAILGUN",
	"WEAPON_GARBAGEBAG",
	"WEAPON_MINIGUN",
	"WEAPON_RPG",
	"WEAPON_RAYMINIGUN",
	"WEAPON_STICKYBOMB",
	"WEAPON_HOMINGLAUNCHER",
	"WEAPON_GRENADE",
	"WEAPON_MG",
	"WEAPON_PIPEBOMB",
	"WEAPON_COMBATMG_MK2",
	"WEAPON_PROXMINE",
	"WEAPON_MOLOTOV",
	"WEAPON_BZGAS",
	"WEAPON_HAZARDCAN",
	"WEAPON_MARKSMANPISTOL",
	"WEAPON_MICROSMG",
	"WEAPON_MINISMG",
	"WEAPON_SMG_MK2",
	"WEAPON_RAYPISTOL",
	"WEAPON_FIREWORK",
	"WEAPON_MARKSMANPISTOL",
	"WEAPON_RAYCARBINE",
	"WEAPON_AUTOSHOTGUN",
	"WEAPON_MACHINEPISTOL",
	"WEAPON_ASSAULTSHOTGUN",
	"WEAPON_MINISMG",
	"WEAPON_GRENADELAUNCHER",
	"WEAPON_COMPACTLAUNCHER",
	"WEAPON_GRENADELAUNCHER_SMOKE",
}

-- Objects that get instantly deleted (including vehicles).
-- Please make sure non of these are spawned by any of your scripts or in npc traffic.
ServerConfig.IllegalModels = {
    "tug",
    "jet",
    "pyro",
    "tula",
    "rhino",
    "titan",
    "dune3",
    "dune2",
    "dune5",
    "issi4",
    "issi5",
    "issi6",
    "blimp",
    "mogul",
    "rogue",
    "zr380",
    "mule4",
    "blimp",
    "police",
    "tampa3",
    "ardent",
    "jb7002",
    "dukes2",
    "nokota",
    "blimp2",
    "blimp3",
    "raptor",
    "zr3802",
    "zr3803",
    "comet4",
    "brutus",
    "blimp2",
    "blimp3",
    "buzzard",
    "skylift",
    "shotaro",
    "ruiner3",
    "ruiner2",
    "bruiser",
    "menacer",
    "impala2",
    "impala3",
    "impala4",
    "avenger",
    "molotok",
    "volatol",
    "kuruma2",
    "voltic2",
    "freight",
    "tractor",
    "brutus2",
    "brutus3",
    "khanjali",
    "phantom2",
    "minitank",
    "thruster",
    "slamvan4",
    "slamvan5",
    "slamvan6",
    "faction3",
    "bruiser2",
    "bruiser3",
    "monster4",
    "monster5",
    "monster3",
    "avenger2",
    "paragon2",
    "revolter",
    "starling",
    "alkonost",
    "scramjet",
    "pounder2",
    "marshall",
    "vigilante",
    "oppressor",
    "boxville5",
    "halftrack",
    "insurgent",
    "imperator",
    "technical",
    "bombushka",
    "deathbike",
    "tankercar",
    "slamtruck",
    "boxville5",
    "oppressor2",
    "seasparrow",
    "deathbike2",
    "deathbike3",
    "dominator6",
    "cargoplane",
    "dominator4",
    "dominator5",
    "dominator6",
    "imperator2",
    "imperator3",
    "nightshark",
    "technical2",
    "technical3",
    "freightcar",
    "seasparrow2",
    "seasparrow3",
    "wastelander",
    "p_cablecar_s",
    "p_ferris_car_01",
    "prop_carcreeper",
    "prop_cj_big_boat",
    "prop_rock_4_big2",
    "dt1_lod_f2_slod3",
    "dt1_lod_f3_slod3",
    "dt1_lod_f4_slod3",
    "prop_cattlecrush",
    "prop_gold_cont_01",
    "prop_steps_big_01",
    "p_spinning_anus_s",
    "apa_mp_h_bed_wide_05",
    "prop_cs_documents_01",
    "stt_prop_stunt_tube_l",
    "prop_dt1_20_mp_door_l",
    "prop_dt1_20_mp_door_r",
    "v_ilev_lest_bigscreen",
    "stt_prop_stunt_jump15",
    "stt_prop_stunt_jump30",
    "stt_prop_stunt_jump45",
    "apa_mp_h_bed_double_09",
    "stt_prop_hoop_tyre_01a",
    "hei_prop_carrier_ord_03",
    "stt_prop_stunt_bblock_qp",
    "stt_prop_stunt_jump_loop",
    "stt_prop_stunt_bblock_qp2",
    "stt_prop_stunt_bblock_qp3",
    "stt_prop_stunt_track_fork",
    "stt_prop_stunt_track_hill",
    "stt_prop_stunt_track_jump",
    "hei_prop_carrier_cargo_02a",
    "stt_prop_stunt_soccer_goal",
    "stt_prop_stunt_track_bumps",
    "stt_prop_stunt_track_hill2",
    "stt_prop_stunt_track_otake",
    "stt_prop_stunt_track_start",
    "stt_prop_stunt_track_cutout",
    "stt_prop_stunt_track_dwlink",
    "stt_prop_stunt_track_dwsh15",
    "stt_prop_stunt_track_dwturn",
    "stt_prop_stunt_track_funlng",
    "stt_prop_stunt_track_funnel",
    "dt1_lod_5_20_emissive_proxy",
    "dt1_lod_5_21_emissive_proxy",
    "dt1_lod_6_19_emissive_proxy",
    "dt1_lod_6_20_emissive_proxy",
    "dt1_lod_6_21_emissive_proxy",
    "dt1_lod_7_20_emissive_proxy",
    "stt_prop_stunt_track_dwuturn",
    "stt_prop_stunt_track_dwshort",
    "stt_prop_stunt_track_exshort",
    "stt_prop_stunt_track_slope15",
    "stt_prop_stunt_track_slope30",
    "stt_prop_stunt_track_slope45",
    "stt_prop_stunt_bblock_hump_01",
    "stt_prop_stunt_bblock_hump_02",
    "stt_prop_stunt_track_dwlink_02",
    "stt_prop_stunt_track_dwslope15",
    "stt_prop_stunt_track_dwslope30",
    "stt_prop_stunt_track_dwslope45",
    "dt1_05_build1_damage",
    "dt1_05_build1_damage_lod",
    "dt1_01_props_l_002",
    "dt1_03_mp_door",
    "prop_container_01a",
    "dt1_05_build1_damage",
    "dt1_05_build1_damage_lod",
    "dt1_05_build1_repair_slod",
    "dt1_05_damage_slod",
    "dt1_05_fib_cut_slod",
    "dt1_05_hc_end_slod",
    "dt1_05_hc_remove_slod",
    "dt1_05_hc_req_slod",
    "dt1_05_logos_emissive_slod",
    "dt1_05_office_lobbyfake_lod",
    "dt1_05_office_lobby_milo_lod",
    "dt1_05_reflproxy",
    "dt1_09_billboards_lod",
    "dt1_12_props_combo_slod",
    "dt1_20_didier_mp_door",
    "dt1_21_props_combo0201_slod",
    "dt1_21_props_dt1_21_s01_slod",
    "dt1_21_reflproxy",
    "dt1_lod_f1b_slod3",
    "dt1_lod_f1_slod3",
    "dt1_lod_f2b_slod3",
    "dt1_lod_slod3",
    "dt1_props_combo0555_15_lod",
    "dt1_rd1_r1_38_s_lod",
    "hei_dt1_03_mph_door_01",
    "hei_dt1_tcmods_ce",
    "hei_dt1_tcmods_ce2_lod",
    "hei_dt1_tcmods_ces2",
    "hei_dt1_tcmods_ce_lod",
    "hei_prop_dt1_20_mph_door_l",
    "hei_prop_dt1_20_mph_door_r",
    "hei_prop_dt1_20_mp_gar2",
    "prop_dt1_13_groundlight",
    "prop_dt1_13_walllightsource",
    "prop_dt1_20_mp_gar",
}