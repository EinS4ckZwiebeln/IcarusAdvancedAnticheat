if not ClientConfig.Modules.Vision.enabled then
    return
end

Citizen.CreateThread(function()
	while not Util.IsPlayerSpawned() do
		Citizen.Wait(500)
	end
    while true do
        Citizen.Wait(1000)
        if GetUsingseethrough() or GetUsingnightvision() then
            local inHeli = IsPedInAnyHeli(PlayerPedId())
            if not inHeli then
                TriggerServerEvent("icarus:417szjzm1goy", "Vision [C1]", false, {inHeli = inHeli})
                return
            end
        end
    end
end)