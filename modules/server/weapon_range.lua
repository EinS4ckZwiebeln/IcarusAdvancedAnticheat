if not ServerConfig.Modules.WeaponRange.enabled then
    return
end

local tazer = 911657153

AddEventHandler("weaponDamageEvent", function(sender, data)
	sender = tonumber(sender)
    local rawTargetData, rawHashData = data[16], data[32]
    if not rawTargetData or not rawHashData then return end

    local ped = GetPlayerPed(sender)
    local target, hash = GetPlayerPed(rawTargetData), rawHashData

    if ped and target then
        local pCoords = GetEntityCoords(ped)
        local tCoords = GertEntityCoords(target)
        local dist = Util.GetDistance(pCoords.x, pCoords.y, tCoords.x, tCoords.y)

        if dist > 400.0 then
            TriggerEvent("icarus:my602oxd71pv", sender, "Weapon Range [C1]", false, {range = dist})
        end
        if hash == tazer and dist > ServerConfig.Modules.WeaponRange.maxTazerRange then
            TriggerEvent("icarus:my602oxd71pv", sender, "Weapon Range [C2]", false, {range = dist, maxRange = ServerConfig.Modules.WeaponRange.maxTazerRange})
        end
    end
end)