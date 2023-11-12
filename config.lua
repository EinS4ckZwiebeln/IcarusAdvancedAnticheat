Config = {}

Config.Permission = {
    -- Classic ace permission to bypass the detections.
    bypassPermission = "icarus.bypass",
    -- Players with txAdmin permissions will be granted bypass permission automatically (v6.0.1 required).
    useTxAdmin = true
}

-- Where ban information and screenshots are send to.
Config.DiscordWebhook = ""

-- Implement your custom banning function here.
exports("BanPlayer", function (source, reason)
    -- TriggerEvent("EasyAdmin:banPlayer", source, "You have been banned for cheating", 1044463300) -- EasyAdmin for the sake of simplicity.
end)

Config.Modules = {
    -- Filter for bad words in chat messages.
    ChatProfanityModule = {
        enabled = false,
        -- Wether or not to use a preconfigured bad words blacklist.
        useDefaultBlacklist = true,
        -- List of all bad words.
        badWords = {"Foo", "Bar", "Foobar"},
        -- The message to send to the player if he uses a bad word.
        warningMsg = "^1Please refrain from using profanity in your messages.^0"
    },
    -- Everything connection related.
    DeferralsModule = {
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
    -- Prevents spawning of every model in the IllegalModels list.
    EntityCreateModule = {
        enabled = true,
        -- Wether or not the player should be banned.
        banNetworkOwner = true,
        -- Checks peds if they carry blacklisted weapons.
        checkPedsForWeapons = true,
    },
    -- Bans everyone that causes a non-whitelisted explosion.
    ExplosionFilterModule = {
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
    -- Detects various tazer cheats.
    TazerModule = {
        enabled = true,
        -- The maximum distance a player can be tazed from.
        maxDistance = 12.0,
        -- How long it takes for the tazer to recharge.
        tazerCooldown = 12000 -- 12 seconds
    },
    -- Detects if a player has a non whitelisted playermodel (eg. monkey).
    PedBlacklistModule = {
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
    AimbotModule = {
        enabled = true,
        -- Increment this if Aimbot false positives occur.
        -- In case you use any 'drug effects' or 'drunk' resources increase this to at least 6.0.
        offsetDist = 4.5
    },
    -- Detects if a cheater gives weapons to others.
    GiveWeaponModule = {
        enabled = true,
        -- Allow players to use weapon pick ups.
        allowPickUp = false
    },
    -- Detects if a cheater removes weapons from others.
    RemoveWeaponModule = {
        enabled = true
    },
    -- Take a look at 'Config.BlacklistedWeapons'.
    WeaponBlacklistModule = {
        enabled = true
    },
    -- Used for 'rape' or 'troll' functions in mod menus.
    -- Leaving this enabled is highly recommended.
    ClearTaskModule = {
        enabled = true
    },
    -- Detects if a cheater uses super jump.
    SuperJumpModule = {
        enabled = true
    },
    -- Basic check for invincibility on player damage.
    GodmodeModule = {
        enabled = true
    },
    -- Detects if a cheater modifies weapon damage.
    -- If you have any scripts that modify weapon damage, adjust this or disable the module.
    WeaponModifierModule = {
        enabled = true,
        -- The maximum damage modifier a player can have for a weapon.
        damageModifier = 1.0
    },
    -- Checks spawned particles for abnormal values.
    ParticlesModule = {
        enabled = true,
        -- The maximum scale a particle effect can have.
        maxParticleScale = 5.0
    },
    -- Prevents projectile spam (eg. missiles).
    StartProjectileModule = {
        enabled = true,
        -- The maximum interval in which a player can shoot projectiles.
        projectileCooldown = 50, --ms
    },
    -- Detects NoClip esque player movement.
    -- Beware that this might cause false positives with other client scripts that modify ped movement.
    NoClipModule = {
        enabled = true,
        -- Miscellaneous player speed limit.
        -- Don't touch this unless you know what you are doing.
        speedThreshold = 20.0,
    },
    -- Take a look at 'Config.BlacklistedEvents'.
    EventBlacklistModule = {
        enabled = true
    }
}

-- Possesion of these weapons will get a player instantly banned.
-- Please check if any weapons on this list are accessible by legit players and remove them if so.
Config.BlacklistedWeapons = {
    "WEAPON_MG",
    "WEAPON_RPG",
    "WEAPON_BZGAS",
    "WEAPON_RAILGUN",
    "WEAPON_MINIGUN",
    "WEAPON_GRENADE",
    "WEAPON_MOLOTOV",
    "WEAPON_MINISMG",
    "WEAPON_SMG_MK2",
    "WEAPON_MINISMG",
    "WEAPON_PIPEBOMB",
    "WEAPON_PROXMINE",
    "WEAPON_MICROSMG",
    "WEAPON_FIREWORK",
    "WEAPON_HAZARDCAN",
    "WEAPON_RAYPISTOL",
    "WEAPON_RAILGUNXM3",
    "WEAPON_GARBAGEBAG",
    "WEAPON_RAYMINIGUN",
    "WEAPON_STICKYBOMB",
    "WEAPON_RAYCARBINE",
    "WEAPON_AUTOSHOTGUN",
    "WEAPON_EMPLAUNCHER",
    "WEAPON_COMBATMG_MK2",
    "WEAPON_MACHINEPISTOL",
    "WEAPON_HOMINGLAUNCHER",
    "WEAPON_MARKSMANPISTOL",
    "WEAPON_MARKSMANPISTOL",
    "WEAPON_ASSAULTSHOTGUN",
    "WEAPON_GRENADELAUNCHER",
    "WEAPON_COMPACTLAUNCHER",
    "WEAPON_GRENADELAUNCHER_SMOKE",
}

-- Events that will get a player instantly banned when triggered.
-- Feel free to add resources you don't use and their events to this list.
Config.BlacklistedEvents = {
    ["esx_jail"] = {
        "esx_jail:sendToJail",
        "esx_jail:unjailQuest",
    },
    ["esx_jailer"] = {
        "esx_jailer:sendToJail",
        "esx_jailer:unjailTime",
        "esx_jailer:unjailTiDFWMme",
    },
    ["esx-qalle-jail"] = {
        "esx-qalle-jail:jailPlayer",
        "esx-qalle-jail:jailPlayerNew",
        "esx-qalle-jail:jailPDFWMlayer",
    },
    ["esx-qalle-hunting"] = {
        "esx-qalle-hunting:reward",
        "esx-qalle-hunting:sell",
        "esx-qalle-hunting:DFWMreward",
        "esx-qalle-hunting:seDFWMll",
    },
    ["esx_pizza"] = {
        "esx_pizza:pay",
        "esx_pizza:pDFWMay",
    },
    ["esx_drugs"] = {
        "esx_drugs:startHarvestWDFWMeed",
        "esx_drugs:startTransfoDFWMrmWeed",
        "esx_drugs:startSellWeDFWMed",
        "esx_drugs:startHarvestDFWMCoke",
        "esx_drugs:startTransDFWMformCoke",
        "esx_drugs:startSellCDFWMoke",
        "esx_drugs:startHarDFWMvestMeth",
        "esx_drugs:startTDFWMransformMeth",
        "esx_drugs:startSellMDFWMeth",
        "esx_drugs:startHDFWMarvestOpium",
        "esx_drugs:startSellDFWMOpium",
        "esx_drugs:starDFWMtTransformOpium",
        "esx_drugs:stopHarvDFWMestCoke",
        "esx_drugs:stopTranDFWMsformCoke",
        "esx_drugs:stopSellDFWMCoke",
        "esx_drugs:stopHarvesDFWMtMeth",
        "esx_drugs:stopTranDFWMsformMeth",
        "esx_drugs:stopSellMDFWMeth",
        "esx_drugs:stopHarDFWMvestWeed",
        "esx_drugs:stopTDFWMransformWeed",
        "esx_drugs:stopSellWDFWMeed",
        "esx_drugs:stopHarvestDFWMOpium",
        "esx_drugs:stopTransDFWMformOpium",
        "esx_drugs:stopSellOpiuDFWMm",
        "esx_drugs:pickedUpCDFWMannabis",
        "esx_drugs:processCDFWMannabis",
    },
    ["esx_garbagejob"] = {
        "esx_garbagejob:pay",
        "esx_garbageDFWMjob:pay",
    },
    ["esx_ambulancejob"] = {
        "esx_ambulancejob:revive",
        "esx_ambulancejob:setDeathStatus",
    },
    ["esx_billing"] = {
        "esx_billing:sendBill",
    },
    ["esx_carthief"] = {
        "esx_carthief:alertcops",
        "esx_carthief:pay",
    },
    ["esx_dmvschool"] = {
        "esx_dmvschool:addLicense",
        "esx_dmvschool:pay",
        "esx_dmvschool:pDFWMay",
        "esx_dmvschool:addLiceDFWMnse",
        "dmv:succeDFWMss",
        "dmv:success",
    },
    ["esx_policejob"] = {
        "esx_policejob:handcuff",
        "esx_policejob:haDFWMndcuff",
        "esx_policejob:requestarrest",
        "esx:enterpolicecar",
        "police:cuffGDFWMranted",
        "police:cuffGranted",
    },
    ["mellotrainer"] = {
        "mellotrainer:adminTempBan",
        "mellotrainer:adminKick",
        "mellotrainer:s_adminKill",
    },
    ["LegacyFuel"] = {
        "LegacyFuel:PayFuel",
        "LegacyFuel:PayFuDFWMel",
    },
    ["DFWM"] = {
        "DFWM:adminmenuenable",
        "DFWM:askAwake",
        "DFWM:checkup",
        "DFWM:cleanareaentity",
        "DFWM:cleanareapeds",
        "DFWM:cleanareaveh",
        "DFWM:enable",
        "DFWM:invalid",
        "DFWM:log",
        "DFWM:openmenu",
        "DFWM:spectate",
        "DFWM:ViolationDetected",
    },
    ["LegacyFuel"] = {
        "LegacyFuel:PayFuel",
        "LegacyFuel:PayFuDFWMel",
    },
    ["gcphone"] = {
        "gcPhone:_internalAddMessageDFWM",
        "gcPhone:tchat_channelDFWM",
    },
}

-- Objects that get instantly deleted (including vehicles).
-- Please make sure non of these are spawned by any of your scripts or in npc traffic.
Config.IllegalModels = {
    "apc",
    "tug",
    "jet",
    "pyro",
    "tula",
    "hydra",
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
    "akula",
    "lazer",
    "raiju",
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
    "scarab",
    "hunter",
    "savage",
    "scarab2",
    "scarab3",
    "barrage",
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
    "dinghy5",
    "kosatka",
    "conada2",
    "avenger3",
    "avenger4",
    "valkyrie",
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
    "valkyrie2",
    "chernobog",
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
    "patrolboat",
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
    "strikeforce",
    "annihilator",
    "seasparrow2",
    "seasparrow3",
    "wastelander",
    "annihilator2",
    "p_cablecar_s",
    "trailersmall2",
    "dt1_lod_slod3",
    "dt1_03_mp_door",
    "prop_beach_fire",
    "p_ferris_car_01",
    "prop_carcreeper",
    "prop_cj_big_boat",
    "prop_rock_4_big2",
    "dt1_lod_f2_slod3",
    "dt1_lod_f3_slod3",
    "dt1_lod_f4_slod3",
    "prop_cattlecrush",
    "dt1_05_reflproxy",
    "dt1_21_reflproxy",
    "dt1_lod_f1_slod3",
    "prop_gold_cont_01",
    "prop_steps_big_01",
    "p_spinning_anus_s",
    "dt1_lod_f1b_slod3",
    "dt1_lod_f2b_slod3",
    "hei_dt1_tcmods_ce",
    "prop_dt1_20_mp_gar"
    "dt1_01_props_l_002",
    "prop_container_01a",
    "dt1_05_damage_slod",
    "dt1_05_hc_end_slod",
    "dt1_05_hc_req_slod",
    "dt1_05_fib_cut_slod",
    "dt1_rd1_r1_38_s_lod",
    "hei_dt1_tcmods_ces2",
    "apa_mp_h_bed_wide_05",
    "prop_cs_documents_01",
    "prop_fnclink_05crnr1",
    "dt1_05_build1_damage",
    "dt1_05_build1_damage",
    "stt_prop_stunt_tube_l",
    "prop_dt1_20_mp_door_l",
    "prop_dt1_20_mp_door_r",
    "v_ilev_lest_bigscreen",
    "stt_prop_stunt_jump15",
    "stt_prop_stunt_jump30",
    "stt_prop_stunt_jump45",
    "dt1_05_hc_remove_slod",
    "dt1_09_billboards_lod",
    "dt1_20_didier_mp_door",
    "hei_dt1_tcmods_ce_lod",
    "apa_mp_h_bed_double_09",
    "stt_prop_hoop_tyre_01a",
    "hei_dt1_03_mph_door_01",
    "hei_dt1_tcmods_ce2_lod",
    "hei_prop_carrier_ord_03",
    "dt1_12_props_combo_slod",
    "hei_prop_dt1_20_mp_gar2",
    "prop_dt1_13_groundlight",
    "stt_prop_stunt_bblock_qp",
    "stt_prop_stunt_jump_loop",
    "dt1_05_build1_damage_lod",
    "dt1_05_build1_damage_lod",
    "stt_prop_stunt_bblock_qp2",
    "stt_prop_stunt_bblock_qp3",
    "stt_prop_stunt_track_fork",
    "stt_prop_stunt_track_hill",
    "stt_prop_stunt_track_jump",
    "dt1_05_build1_repair_slod",
    "hei_prop_carrier_cargo_02a",
    "stt_prop_stunt_soccer_goal",
    "stt_prop_stunt_track_bumps",
    "stt_prop_stunt_track_hill2",
    "stt_prop_stunt_track_otake",
    "stt_prop_stunt_track_start",
    "dt1_05_logos_emissive_slod",
    "dt1_props_combo0555_15_lod",
    "hei_prop_dt1_20_mph_door_l",
    "hei_prop_dt1_20_mph_door_r",
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
    "dt1_05_office_lobbyfake_lod",
    "dt1_21_props_combo0201_slod",
    "prop_dt1_13_walllightsource",
    "stt_prop_stunt_track_dwuturn",
    "stt_prop_stunt_track_dwshort",
    "stt_prop_stunt_track_exshort",
    "stt_prop_stunt_track_slope15",
    "stt_prop_stunt_track_slope30",
    "stt_prop_stunt_track_slope45",
    "dt1_05_office_lobby_milo_lod",
    "dt1_21_props_dt1_21_s01_slod",
    "stt_prop_stunt_bblock_hump_01",
    "stt_prop_stunt_bblock_hump_02",
    "stt_prop_stunt_track_dwlink_02",
    "stt_prop_stunt_track_dwslope15",
    "stt_prop_stunt_track_dwslope30",
    "stt_prop_stunt_track_dwslope45",
}

exports("GetConfig", function ()
    return Config
end)