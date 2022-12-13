Godmode = {}

if not ServerConfig.Modules.Godmode.enabled then
    return
end

function Godmode.ProcessEventData(sender, data)
    local rawTargetData = data["hitGlobalId"] or data["hitGlobalIds"][1]
    local ped, target = GetPlayerPed(sender), NetworkGetEntityFromNetworkId(rawTargetData)
    
    if DoesEntityExist(target) and IsPedAPlayer(target) then
        if GetPlayerInvincible(rawTargetData) then
            TriggerEvent("icarus:my602oxd71pv", sender, "Godmode [C3]", false, {})
        end
    end
end