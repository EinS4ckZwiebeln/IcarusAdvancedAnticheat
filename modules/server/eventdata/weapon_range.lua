WeaponRange = {}

if not ServerConfig.Modules.WeaponRange.enabled then
    return
end

local tazer = 911657153

function WeaponRange.ProcessEventData(sender, data)
    local rawTargetData = data["hitGlobalId"] or data["hitGlobalIds"][1]
    local ped, target = GetPlayerPed(sender), NetworkGetEntityFromNetworkId(rawTargetData)

    if DoesEntityExist(target) and IsPedAPlayer(target) then
        local pCoords = GetEntityCoords(ped)
        local tCoords = GetEntityCoords(target)
        local dist = Util.GetDistance(pCoords.x, pCoords.y, tCoords.x, tCoords.y)

        if dist > 400.0 then
            TriggerEvent("icarus:my602oxd71pv", sender, "Weapon Range [C1]", false, {
                range = dist
             })
            CancelEvent()
        end
        if data["weaponType"] == tazer and dist > ServerConfig.Modules.WeaponRange.maxTazerRange then
            TriggerEvent("icarus:my602oxd71pv", sender, "Weapon Range [C2]", false, {
                tazedRange = dist,
                maxRange = ServerConfig.Modules.WeaponRange.maxTazerRange
             })
            CancelEvent()
        end
    end
end
