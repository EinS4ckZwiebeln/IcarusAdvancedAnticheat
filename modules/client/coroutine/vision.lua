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
            if not (inHeli and ClientConfig.Modules.Vision.ignoreInHeli) then
                TriggerServerEvent("icarus:417szjzm1goy", "Vision [C1]", false, {
                    playerInHeli = inHeli
                })
            end
        end
    end
end)