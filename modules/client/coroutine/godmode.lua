if not ClientConfig.Modules.Godmode.enabled then
    return
end

Citizen.CreateThread(function()
    while not Util.IsPlayerSpawned() do
        Citizen.Wait(500)
    end
    while true do
        Citizen.Wait(15000)
        local ped = PlayerPedId()
        local modifiedHealth = (GetEntityHealth(ped) - 2)

        SetEntityHealth(ped, modifiedHealth)
        Citizen.Wait(ClientConfig.Modules.Godmode.wait)

        local healthPostModification, isPedDead = GetEntityHealth(ped), IsPedDeadOrDying(ped)
        if healthPostModification > 0 and healthPostModification > modifiedHealth + 1 and not isPedDead then
            TriggerServerEvent("icarus:417szjzm1goy", "Godmode [C1]", false, {
                healthPostModification = healthPostModification,
                modifiedHealth = modifiedHealth,
                isPedDead = isPedDead
             })
        else
            SetEntityHealth(ped, healthPostModification + 2)
        end

        local pedHealth, pedArmor = GetEntityHealth(ped), GetPedArmour(ped)
        if pedHealth > ClientConfig.Modules.Godmode.maxHealth or pedArmor > ClientConfig.Modules.Godmode.maxArmor then
            TriggerServerEvent("icarus:417szjzm1goy", "Godmode [C2]", false, {
                health = pedHealth,
                maxHealth = ClientConfig.Modules.Godmode.maxHealth,
                armor = pedArmor,
                maxArmor = ClientConfig.Modules.Godmode.maxArmor
             })
        end
    end
end)
