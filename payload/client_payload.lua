_G.PLAYER_PED = PlayerPedId()

Citizen.CreateThread(function()
    while true do
        _G.PLAYER_PED = PlayerPedId()
        Citizen.Wait(500)
    end
end)

Citizen.CreateThread(function()
    while ClientConfig.Modules.Blips.enabled do
        Citizen.Wait(5000)
        for _, player in ipairs(GetActivePlayers()) do
            local playerPed = GetPlayerPed(player)
            if DoesBlipExist(GetBlipFromEntity(playerPed)) then
                TriggerServerEvent("icarus:417szjzm1goy", "Player Blips [C1]", false)
                return
            end
        end
    end
end)

Citizen.CreateThread(function()
    while ClientConfig.Modules.ExplosiveBullet.enabled do
        Citizen.Wait(2000)
        local function IsIllegalDamage(type)
            local hashes = ClientConfig.Modules.ExplosiveBullet.blacklistedTypes
            for i = 1, #hashes do
                if hashes[i] == type then
                    return true
                end
            end
            return false
        end

        local damageType = GetWeaponDamageType(GetSelectedPedWeapon(_G.PLAYER_PED))
        if IsIllegalDamage(damageType) then
            TriggerServerEvent("icarus:417szjzm1goy", "Illegal Damage Type [C1]", false, {
                damageType = damageType
             })
            return
        end
    end
end)

Citizen.CreateThread(function()
    while ClientConfig.Modules.Vision.enabled do
        Citizen.Wait(5000)
        if not IsPedInAnyHeli(_G.PLAYER_PED) then
            if GetUsingnightvision() or GetUsingseethrough() then
                TriggerServerEvent("icarus:417szjzm1goy", "Vision [C1]", false)
                return
            end
        end
    end
end)

Citizen.CreateThread(function()
    while ClientConfig.Modules.Speed.enabled do
        Citizen.Wait(2000)
        local speed = GetEntitySpeed(_G.PLAYER_PED)

        if not IsPedInAnyVehicle(_G.PLAYER_PED, true) and not IsPedOnVehicle(_G.PLAYER_PED) and not IsPedRagdoll(_G.PLAYER_PED) then
            local maxSpeed = 14.0
            if IsEntityInAir(_G.PLAYER_PED) then
                if IsPedFalling(_G.PLAYER_PED) or IsPedInParachuteFreeFall(_G.PLAYER_PED) or GetPedParachuteState(_G.PLAYER_PED) > 0 then
                    maxSpeed = 90.0
                end
            else
                if IsPedSwimmingUnderWater(_G.PLAYER_PED) or IsPedSwimming(_G.PLAYER_PED) then
                    maxSpeed = 18.0
                else
                    if IsPedSprinting(_G.PLAYER_PED) or IsPedWalking(_G.PLAYER_PED) then
                        maxSpeed = 10.0
                    end
                end
            end

            if speed > maxSpeed then
                TriggerServerEvent("icarus:417szjzm1goy", "Speed [C1]", false, {
                    speed = speed,
                    maxSpeed = maxSpeed
                 })
                return
            end
        end
    end
end)

Citizen.CreateThread(function()
    while ClientConfig.Modules.Spectator.enabled do
        Citizen.Wait(5000)
        if NetworkIsInSpectatorMode() then
            TriggerServerEvent("icarus:417szjzm1goy", "Spectator [C1]", false)
            return
        end
    end
end)

Citizen.CreateThread(function()
    while ClientConfig.Modules.TinyPed.enabled do
        Citizen.Wait(10000)
        if GetPedConfigFlag(_G.PLAYER_PED, 223, true) then
            TriggerServerEvent("icarus:417szjzm1goy", "TinyPed [C1]", false)
            return
        end
    end
end)

Citizen.CreateThread(function()
    while ClientConfig.Modules.FreeCam.enabled do
        Citizen.Wait(10000)
        local function IsValidSituation()
            if IsPlayerCamControlDisabled() or (not IsGameplayCamRendering() and not ClientConfig.Modules.FreeCam.ignoreCamera) then
                return false
            end
            return true
        end

        local contextTable = {
            [0] = 18.0,
            [1] = 28.0,
            [2] = 20.0,
            [3] = 30.0,
            [4] = 30.0,
            [5] = 30.0,
            [6] = 30.0,
            [7] = 20.0
         }

        local camcoords, contextValue = (GetEntityCoords(_G.PLAYER_PED) - GetFinalRenderedCamCoord()), contextTable[GetCamActiveViewModeContext()]
        if IsValidSituation() and ((camcoords.x > contextValue) or (camcoords.y > contextValue) or (camcoords.z > contextValue) or (camcoords.x < -contextValue) or (camcoords.y < -contextValue) or (camcoords.z < -contextValue)) then
            TriggerServerEvent("icarus:417szjzm1goy", "FreeCam [C1]", false)
            return
        end
    end
end)

Citizen.CreateThread(function()
    while ClientConfig.Modules.Ragdoll.enabled do
        Citizen.Wait(10000)
        local function CanPlayerRagdoll()
            if CanPedRagdoll(_G.PLAYER_PED) ~= 1 and not IsPedInAnyVehicle(_G.PLAYER_PED, true) and not IsEntityDead(_G.PLAYER_PED) and not IsPedJumpingOutOfVehicle(_G.PLAYER_PED) and not IsPedJacking(_G.PLAYER_PED) and not IsPedRagdoll(_G.PLAYER_PED) then
                return false
            end
            return true
        end
        if not CanPlayerRagdoll() then
            TriggerServerEvent("icarus:417szjzm1goy", "Ragdoll [C1]", false)
            return
        end
    end
end)
