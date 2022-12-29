-- This is the script that is 'injected' into the client through an event.
-- This file cannot be read by clients through a dump.

if not Util.IsPlayerSpawned() then return end

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
    
    if IsIllegalDamage(GetWeaponDamageType(GetSelectedPedWeapon(playerPed))) then
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
    result.tinyPed = GetPedConfigFlag(playerPed, 223, true)
end

if ClientConfig.Modules.FreeCam.enabled then
    local function IsValidSituation()
        if IsPlayerCamControlDisabled() or not IsGameplayCamRendering() then
            return false
        end
        return true
    end

    local contextTable = {
        [0] = 18.0,
        [1] = 20.0,
        [2] = 20.0,
        [3] = 30.0,
        [4] = 30.0,
        [5] = 30.0,
        [6] = 30.0,
        [7] = 20.0,
    }

    local camcoords, contextValue = (GetEntityCoords(playerPed) - GetFinalRenderedCamCoord()), contextTable[GetCamActiveViewModeContext()]
    if IsValidSituation() and ((camcoords.x > contextValue) or (camcoords.y > contextValue) or (camcoords.z > contextValue) or (camcoords.x < -contextValue) or (camcoords.y < -contextValue) or (camcoords.z < -contextValue)) then
        result.freeCam = true
    end
end

if ClientConfig.Modules.Ragdoll.enabled then
    local function CanPlayerRagdoll()
        if CanPedRagdoll(playerPed) ~= 1 and not IsPedInAnyVehicle(playerPed, true) and not IsEntityDead(playerPed) and not IsPedJumpingOutOfVehicle(playerPed) and not IsPedJacking(playerPed) and not IsPedRagdoll(playerPed) then
            return false
        end
        return true
    end
    if not CanPlayerRagdoll() then
        result.ragdoll = true
    end
end

return result