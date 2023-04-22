/*
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

*/

const tazerHash = 911657153;

module.exports = (sender, data) => {
    const weaponHash = data.weaponType;
    const netId = data.hitGlobalId || data.hitGlobalIds[0];
    const target = NetworkGetEntityFromNetworkId(netId);
    const ped = GetPlayerPed(sender);

    if (!DoesEntityExist(target) || !IsPedAPlayer(target)) { return; }

    const pCoords = GetEntityCoords(ped);
    const tCoords = GetEntityCoords(target);
    const distance = Math.sqrt((pCoords.x - tCoords.x) ** 2 + (pCoords.y - tCoords.y) ** 2);

    if (distance > 400.0) {
        emitNet("icarus:my602oxd71pv", sender, "Weapon Range [C1]", false, {
            distance: distance
        });
        CancelEvent();
    } else if (weaponHash == tazerHash && distance > serverConfig.Modules.WeaponRange.maxTazerRange) {
        emitNet("icarus:my602oxd71pv", sender, "Weapon Range [C2]", false, {
            distance: distance,
            tazer: serverConfig.Modules.WeaponRange.maxTazerRange
        });
        CancelEvent();
    }
};