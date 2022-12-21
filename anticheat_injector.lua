-- This is the script that is 'injected' into the client throught the 'icarus:ping' event.
-- This file cannot be read by clients through a dump

if not NetworkIsSessionStarted() then return end

local result = {}
local playerPed = PlayerPedId()

if ClientConfig.Modules.Blips.enabled then
    -- Entity Blips
    for _, player in ipairs(GetActivePlayers()) do 
        local playerPed = GetPlayerPed(player)
        if DoesBlipExist(GetBlipFromEntity(playerPed)) then
            result.blips = true
            break
        end
    end
end

-- Damage Type Checker
if ClientConfig.Modules.ExplosiveBullet.enabled then
    local function IsIllegalDamage(type)
        local hashes = ClientConfig.Modules.ExplosiveBullet.blacklistedTypes
        for i=1, #hashes do
            if hashes[i] == type then
                return true
            end
        end
        return false
    end
    
    if IsIllegalDamage(GetWeaponDamageType(GetSelectedPedWeapon(PlayerPedId()))) then
        result.blacklistedDamageType = true
    end
end

if not IsPedInAnyHeli(playerPed) and ClientConfig.Modules.Vision.enabled then
    -- Night vision/Thermal Checker
    if GetUsingnightvision() then 
        result.nightVision = true
    end
    if GetUsingseethrough() then 
        result.thermalVision = true
    end
end



if ClientConfig.Modules.Speed.enabled then 
    local speed = GetEntitySpeed(playerPed)
    
    if not IsPedInAnyVehicle(playerPed, true) or IsPedRagdoll(playerPed) then
        local maxSpeed = 14.0
        if IsEntityInAir(playerPed) then
            if IsPedFalling(playerPed) or IsPedInParachuteFreeFall(playerPed) or GetPedParachuteState(playerPed) > 0 then
                maxSpeed = 90.0
            end
        else
            if IsPedSwimmingUnderWater(playerPed) or IsPedSwimming(playerPed) then
                maxSpeed = 18.0
            else
                if IsPedSprinting(playerPed) or IsPedWalking(playerPed) then
                    maxSpeed = 10.0
                end
            end
        end
    
        if speed > maxSpeed then
            result.brokeMaxSpeed = true
        end
    end
end

if ClientConfig.Modules.Spectator.enabled then 
    result.spectate = NetworkIsInSpectatorMode()
end


if ClientConfig.Modules.TinyPed.enabled then
    result.tinyPed = GetPedConfigFlag(PlayerPedId(), 223, true)
end


return result