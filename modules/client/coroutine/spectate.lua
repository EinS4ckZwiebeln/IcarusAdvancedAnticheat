if not ClientConfig.Modules.Spectator.enabled then
    return
end

Citizen.CreateThread(function()
	while true do
		Citizen.Wait(5000)
        if NetworkIsInSpectatorMode() then
			TriggerServerEvent("icarus:417szjzm1goy", "Spectate [C1]", false)
			return
        end
	end
end)