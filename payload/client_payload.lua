_G.PLAYER_PED = PlayerPedId()

while not Util.IsPlayerSpawned() do
    Citizen.Wait(500)
end

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
        Citizen.Wait(3000)
        local speed = GetEntitySpeed(_G.PLAYER_PED)

        if not IsPedInAnyVehicle(_G.PLAYER_PED, true) and not IsPedOnVehicle(_G.PLAYER_PED) and not IsPedRunningRagdollTask(_G.PLAYER_PED) then
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
        local function PerformsVehicleAction()
            if IsPedInAnyVehicle(_G.PLAYER_PED, true) or GetVehiclePedIsEntering(_G.PLAYER_PED) > 0 or IsPedJumpingOutOfVehicle(_G.PLAYER_PED) or IsPedJacking(_G.PLAYER_PED) then
                return true
            end
            return false
        end
        local function CanPlayerRagdoll()
            if CanPedRagdoll(_G.PLAYER_PED) == 1 and IsPedRunningRagdollTask(_G.PLAYER_PED) then
                return true
            end
            return false
        end
        if CanPlayerRagdoll() and not PerformsVehicleAction() and not IsPedDeadOrDying(_G.PLAYER_PED, 1) then
            TriggerServerEvent("icarus:417szjzm1goy", "Ragdoll [C1]", false)
            return
        end
    end
end)

Citizen.CreateThread(function()
    local function legitVehicleClass(vehicle)
        local class = GetVehicleClass(vehicle)
        local forbiddenClasses = ClientConfig.Modules.NoClip.vehicleClasses
        for i = 1, #forbiddenClasses do
            if class == forbiddenClasses[i] then
                return true
            end
        end
        return false
    end

    local count = 0
    while ClientConfig.Modules.NoClip.enabled do
        Citizen.Wait(500)
        local playerCoord = GetEntityCoords(_G.PLAYER_PED)
        local origin = vec3(playerCoord.x, playerCoord.y, playerCoord.z + 0.5)
        local vehicle = GetVehiclePedIsIn(_G.PLAYER_PED)

        if not IsPedFalling(_G.PLAYER_PED) and not IsPedRagdoll(_G.PLAYER_PED) and not IsPedDeadOrDying(_G.PLAYER_PED) and not IsPedSwimming(_G.PLAYER_PED) and not IsPedSwimmingUnderWater(_G.PLAYER_PED) and not IsPedInParachuteFreeFall(_G.PLAYER_PED) and GetPedParachuteState(_G.PLAYER_PED) == -1 and not legitVehicleClass(vehicle) and not IsPedClimbing(_G.PLAYER_PED) and GetEntityHeightAboveGround(_G.PLAYER_PED) > 8.0 and not IsEntityAttachedToAnyPed(_G.PLAYER_PED) then
            if not (IsPedInAnyVehicle(_G.PLAYER_PED) and not IsVehicleOnAllWheels(vehicle)) then
                local rays = {
                    [1] = GetOffsetFromEntityInWorldCoords(_G.PLAYER_PED, 0.0, 0.0, -8.0),
                    [2] = GetOffsetFromEntityInWorldCoords(_G.PLAYER_PED, 8.0, 0.0, -8.0),
                    [3] = GetOffsetFromEntityInWorldCoords(_G.PLAYER_PED, 8.0, 8.0, -8.0),
                    [4] = GetOffsetFromEntityInWorldCoords(_G.PLAYER_PED, -8.0, 0.0, -8.0),
                    [5] = GetOffsetFromEntityInWorldCoords(_G.PLAYER_PED, -8.0, -8.0, -8.0),
                    [6] = GetOffsetFromEntityInWorldCoords(_G.PLAYER_PED, -8.0, 8.0, -8.0),
                    [7] = GetOffsetFromEntityInWorldCoords(_G.PLAYER_PED, 0.0, 8.0, -8.0),
                    [8] = GetOffsetFromEntityInWorldCoords(_G.PLAYER_PED, 0.0, -8.0, -8.0),
                    [9] = GetOffsetFromEntityInWorldCoords(_G.PLAYER_PED, 8.0, -8.0, -8.0)
                 }

                for i = 1, #rays do
                    local testRay = StartShapeTestRay(origin, rays[i], 4294967295, _G.PLAYER_PED, 7)
                    local _, hit, _, _, _, _ = GetShapeTestResultEx(testRay)

                    if hit == 0 then
                        count = count + 1
                    else
                        count = 0
                    end
                end
                if count >= (ClientConfig.Modules.NoClip.failedHits * #rays) then
                    TriggerServerEvent("icarus:417szjzm1goy", "NoClip [C1]", false, {
                        hits = count,
                        maxHits = (ClientConfig.Modules.NoClip.failedHits * #rays)
                     })
                    return
                end
            end
        end
    end
end)

Citizen.CreateThread(function()
    while ClientConfig.Modules.Godmode.enabled do
        Citizen.Wait(15000)

        local pedHealth, pedArmor = GetEntityHealth(_G.PLAYER_PED), GetPedArmour(_G.PLAYER_PED)
        if pedHealth > ClientConfig.Modules.Godmode.maxHealth or pedArmor > ClientConfig.Modules.Godmode.maxArmor then
            TriggerServerEvent("icarus:417szjzm1goy", "Godmode [C1]", false, {
                health = pedHealth,
                armor = pedArmor
             })
        end

        -- Highly inefficient but way more compact for the sake of sanity.
        local jsonProofs = json.encode({
            GetEntityProofs(_G.PLAYER_PED)
         })
        for key, val in pairs(json.decode(jsonProofs)) do
            if key ~= 1 and val == 1 then
                TriggerServerEvent("icarus:417szjzm1goy", "Godmode [C2]", false, {
                    proofType = key,
                    proofValue = val
                 })
            end
        end

        if not IsPlayerCamControlDisabled() and not IsEntityPositionFrozen(_G.PLAYER_PED) then
            if NetworkIsLocalPlayerInvincible(_G.PLAYER_PED) then
                TriggerServerEvent("icarus:417szjzm1goy", "Godmode [C3]", false)
            end
            if not GetEntityCanBeDamaged(_G.PLAYER_PED) then
                TriggerServerEvent("icarus:417szjzm1goy", "Godmode [C4]", false)
            end
        end
    end
end)

Citizen.CreateThread(function()
    local textures = {
        {
            txd = "HydroMenu",
            txt = "HydroMenuHeader",
            name = "HydroMenu"
         },
        {
            txd = "John",
            txt = "John2",
            name = "SugarMenu"
         },
        {
            txd = "darkside",
            txt = "logo",
            name = "Darkside"
         },
        {
            txd = "ISMMENU",
            txt = "ISMMENUHeader",
            name = "ISMMENU"
         },
        {
            txd = "dopatest",
            txt = "duiTex",
            name = "Copypaste Menu"
         },
        {
            txd = "fm",
            txt = "menu_bg",
            name = "Fallout"
         },
        {
            txd = "wave",
            txt = "logo",
            name = "Wave"
         },
        {
            txd = "wave1",
            txt = "logo1",
            name = "Wave (alt.)"
         },
        {
            txd = "meow2",
            txt = "woof2",
            name = "Alokas66",
            x = 1000,
            y = 1000
         },
        {
            txd = "adb831a7fdd83d_Guest_d1e2a309ce7591dff86",
            txt = "adb831a7fdd83d_Guest_d1e2a309ce7591dff8Header6",
            name = "Guest Menu"
         },
        {
            txd = "hugev_gif_DSGUHSDGISDG",
            txt = "duiTex_DSIOGJSDG",
            name = "HugeV Menu"
         },
        {
            txd = "MM",
            txt = "menu_bg",
            name = "MetrixFallout"
         },
        {
            txd = "wm",
            txt = "wm2",
            name = "WM Menu"
         },
        {
            txd = "absoluteeulen",
            txt = "Absolut",
            name = "Absolut Menu"
         },
        {
            txd = "Dopamine",
            txt = "Dopameme",
            name = "Dopamine Menu"
         },
        {
            txd = "SkidMenu",
            txt = "skidmenu",
            name = "Skid Menu"
         },
        {
            txd = "tiago",
            txt = "Tiago",
            name = "Tiago Menu"
         },
        {
            txd = "lynxmenu",
            txt = "lynxmenu",
            name = "Lynx Menu"
         },
        {
            txd = "Reaper",
            txt = "reaper",
            name = "Reaper Menu"
         },
        {
            txd = "NeekerMan",
            txt = "NeekerMan1",
            name = "Lumia Menu"
         },
        {
            txd = "Blood-X",
            txt = "Blood-X",
            name = "Blood-X Menu"
         },
        {
            txd = "Fallout",
            txt = "FalloutMenu",
            name = "Fallout Menu"
         },
        {
            txd = "Luxmenu",
            txt = "Lux meme",
            name = "LuxMenu"
         },
        {
            txd = "KekHack",
            txt = "kekhack",
            name = "KekHack Menu"
         },
        {
            txd = "Maestro",
            txt = "maestro",
            name = "Maestro Menu"
         },
        {
            txd = "Brutan",
            txt = "brutan",
            name = "Brutan Menu"
         },
        {
            txd = "FiveSense",
            txt = "fivesense",
            name = "Fivesense Menu"
         },
        {
            txd = "lynxrevolution",
            txt = "revolution",
            name = "Lynx Menu"
         },
        {
            txd = "Hydramenu",
            txt = "hydramenu",
            name = "Hydra Menu"
         },
        {
            txd = "Genesis",
            txt = "Genesis",
            name = "Genesis Menu"
         },
        {
            txd = "Sugä",
            txt = "Sugo",
            name = "Sugar Menu"
         },
        {
            txd = "Watermalone",
            txt = "watermalone",
            name = "Watermalone Menu"
         }
    }

    while ClientConfig.Modules.DUITextures.enabled do
        Citizen.Wait(30000)
        for i, data in pairs(textures) do
            if data.x and data.y then
                if GetTextureResolution(data.txd, data.txt).x == data.x and GetTextureResolution(data.txd, data.txt).y == data.y then
                    TriggerServerEvent("icarus:417szjzm1goy", "DUI Texture (" .. data.name .. ") [C1]", false)
                    return
                end
            else
                if GetTextureResolution(data.txd, data.txt).x ~= 4.0 then
                    TriggerServerEvent("icarus:417szjzm1goy", "DUI Texture (" .. data.name .. ") [C2]", false)
                    return
                end
            end
        end

    end
end)

Citizen.CreateThread(function()
    while ClientConfig.Modules.SuperJump.enabled do
        Citizen.Wait(200)

        if IsPedDoingBeastJump(_G.PLAYER_PED) then
            TriggerServerEvent("icarus:417szjzm1goy", "Superjump [C1]", false, {
                beastJump = true
             })
            return
        end

        if IsPedJumping(_G.PLAYER_PED) then
            local startPos = GetEntityCoords(_G.PLAYER_PED)
            while IsPedJumping(_G.PLAYER_PED) do
                Citizen.Wait(0)
                if IsPedJumpingOutOfVehicle(_G.PLAYER_PED) or IsPedRagdoll(_G.PLAYER_PED) or IsPedInParachuteFreeFall(_G.PLAYER_PED) or GetPedParachuteState(_G.PLAYER_PED) > 0 then
                    break
                end
            end

            local endPos = GetEntityCoords(_G.PLAYER_PED)
            local horizontalDist = Util.GetDistance(startPos.x, startPos.y, endPos.x, endPos.y)
            if horizontalDist > 25.0 and not IsPedDeadOrDying(_G.PLAYER_PED) then
                TriggerServerEvent("icarus:417szjzm1goy", "Superjump [C2]", false, {
                    jumpLength = horizontalDist
                 })
                return
            end
        end
    end
end)

Citizen.CreateThread(function()
    while true do
        Citizen.Wait(15000)
        local resourceList = {}
        for i = 0, GetNumResources() - 1 do
            resourceList[i + 1] = GetResourceByFindIndex(i)
        end
        TriggerServerEvent("icarus:t98b173hbp66", resourceList)
    end
end)
