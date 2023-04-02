ClientConfig = {}

-- Configure any module/detection to your servers needs.
-- Beware that some values are very sensitive and could break everything.
ClientConfig.Modules = {

    -- Detects if the player stops a resource (client).
    ResourceStopper = {
        enabled = true
     },

    -- Looks for suspicious texture dictionaries that can indicate a mod menu.
    DUITextures = {
        enabled = true
     },

    -- Checks if the player has player blips.
    Blips = {
        enabled = true
     },

    -- Checks if the player is invincible.
    Godmode = {
        enabled = true,
        -- The default max health on your server.
        maxHealth = 200,
        -- The default max armor on your server.
        maxArmor = 100
    },

    -- Detects if the player is flying/noclipping around.
    NoClip = {
        enabled = true,
        -- Players in these vehicle classed are ignored (e.g. helicopter or planes).
        vehicleClasses = {
            21,
            19,
            18,
            16,
            15,
            14
         },
        -- Increment this by one if you run into a lot of false positives.
        failedHits = 3
    },

    -- Checks if the player spectates somebody.
    -- Disable this if players are allowed to enter spectator mode.
    Spectator = {
        enabled = true
     },

    -- Detects TinyPed cheat.
    TinyPed = {
        enabled = true
     },

    -- Detects unusually fast movement.
    -- Maybe be prone to some false positives depending on your servers scripts.
    Speed = {
        enabled = true
     },

    -- Detects unusually high & fast jumps performed by the player.
    SuperJump = {
        enabled = true
     },

    -- Checks for blacklisted damage types.
    ExplosiveBullet = {
        enabled = true,
        -- Damage Types: https://docs.fivem.net/natives/?_0x3BE0BB12D25FB305
        blacklistedTypes = {
            4, -- Force ragdoll fall
            5, -- Explosive (RPG, Railgun, grenade) 
            6, -- Fire (molotov) 
            10, -- Electricity 
            13 -- Gas
        }
    },

    -- Detects if a weapon pickup is picked up.
    -- Disable this if you use pickups on your server.
    WeaponPickUps = {
        enabled = true
     },

    -- Detects Thermal and Nightvision cheats.
    Vision = {
        enabled = true
     },

    -- Checks if the player camera is too far away.
    -- Might cause issues with camera scripts.
    FreeCam = {
        enabled = true,
        ignoreCamera = false -- Enable this if using camera scripts (eg. qbcore spawing menu)
    },

    -- Detects if the player teleports into a vehicle.
    VehicleTeleport = {
        enabled = true,
        -- The maximum speed at which a player may can still enter the vehicle.
        -- If you have super fast vehicles (like 400kmh/250mph or more) on your server you want to increase this.
        maxSpeedToEnter = 16.0
    },

    -- Detects no/anti ragdoll cheats.
    -- Disable this if any of your scripts modify player ragdoll behaviour.
    Ragdoll = {
        enabled = true
     },

    -- Deletes vehicles that are only networked locally.
    -- Might cause issues with vehicle dealership scripts.
    GhostVehicle = {
        enabled = true,
        -- Only enable this if you are using entity lockdown on "strict" mode.
        banPlayer = false
    }
}

-- DO NOT REMOVE
function GetClientConfig()
    if GetCurrentResourceName() == GetInvokingResource() then
        return ClientConfig
    end
end
