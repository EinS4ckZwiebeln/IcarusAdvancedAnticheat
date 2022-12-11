if not ServerConfig.Modules.PedBlacklist.enabled then
    return
end

local hashList = Util.HashifyList(ServerConfig.Modules.PedBlacklist.playerModels)

Citizen.CreateThread(function()
	while true do
		Citizen.Wait(10000)
        local players = GetPlayers()
		for i=1, #players do
            Citizen.Wait(10)
            local ped = GetPlayerPed(players[i])
            local model = GetEntityModel(ped)

            if not IsWhitelistedModel(model) and model ~= 0 then
                TriggerEvent("icarus:my602oxd71pv", players[i], "Illegal Player Ped [C1]", false, {
                    detectedPed = model
                })
		    end
        end
	end
end)

function IsWhitelistedModel(model)
	for i=1, #hashList do
		if model == hashList[i] then
			return true
		end
	end
	return false
end