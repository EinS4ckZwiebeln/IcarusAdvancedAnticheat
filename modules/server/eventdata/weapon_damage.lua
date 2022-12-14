WeaponDamage = {}

if not ServerConfig.Modules.WeaponDamage.enabled then
    return
end

local hashList = Util.HashifyList(ServerConfig.BlacklistedWeapons)

function IsWeaponBlacklisted(weaponHash)
    for i=1, #hashList do
        if hashList[i] == weaponHash then
            return true
        end
    end
    return false
end

function WeaponDamage.ProcessEventData(sender, data)
    local weaponHash = data["weaponType"]
    if IsWeaponBlacklisted(weaponHash) then
        TriggerEvent("icarus:my602oxd71pv", sender, "Illegal Weapon Damage [C1]", false, {
            weaponHash = weaponHash
        })
        CancelEvent() 
    end
end