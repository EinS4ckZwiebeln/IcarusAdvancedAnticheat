if not ClientConfig.Modules.TinyPed.enabled then
    return
end

Citizen.CreateThread(function()
    while true do
        Citizen.Wait(5000)
        if GetPedConfigFlag(PlayerPedId(), 223, true) then
            TriggerServerEvent("icarus:417szjzm1goy", "Tiny Ped [C1]", false)
        end
    end
end)