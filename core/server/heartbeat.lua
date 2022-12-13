local securityHash = Util.GetRandomVariable(ServerConfig.SecurityHashLength)
local awaitedPlayers, excludedPlayers = {}, {}

Citizen.CreateThread(function()
	while true do
		Citizen.Wait(ServerConfig.HeartbeatInterval)
		local players = GetPlayers()
		securityHash = Util.GetRandomVariable(ServerConfig.SecurityHashLength)

		for i=1, #players do
			local id = tonumber(players[i])
			if not TableContains(awaitedPlayers, id) then
				table.insert(awaitedPlayers, id)
			end
			TriggerClientEvent("icarus:sxgt19l7681o", id, securityHash)
		end

		Citizen.Wait(ServerConfig.HeartbeatInterval)
		players = GetPlayers()

		for i=1, #players do
			local id = tonumber(players[i])
			if AwaitedAndNotExcluded(id) then
				Citizen.CreateThread(function()
					local latency = GetPlayerPing(id)
					if latency >= 0 and latency < ServerConfig.LatencyThreshold then
						TriggerEvent("icarus:my602oxd71pv", id, "Client failed to send heartbeat to the server", true, {})
					end
				end)
			end
		end
	end
end)

function AwaitedAndNotExcluded(source)
	if TableContains(awaitedPlayers, source) and not TableContains(excludedPlayers, source) then
		return true
	end
	return false
end

function ClearPlayer(source)
	RemoveFromTable(excludedPlayers, source)
	RemoveFromTable(awaitedPlayers, source)
end

function TableContains(list, value)
	for i=1, #list do
		if list[i] == value then
			return true
		end
	end
	return false
end

function RemoveFromTable(list, value)
	for index, v in pairs(list) do
		if v == value then
			table.remove(list, index)
		end
	end
end

RegisterNetEvent("icarus:08h20rh6jwf0")
AddEventHandler("icarus:08h20rh6jwf0", function(clientHash)
	if clientHash == securityHash then
		RemoveFromTable(awaitedPlayers, tonumber(source))
	end
end)

RegisterNetEvent("icarus:3ph9kyfcy95n")
AddEventHandler("icarus:3ph9kyfcy95n", function()
	RemoveFromTable(excludedPlayers, tonumber(source))
end)

AddEventHandler("playerJoining", function()
	local id = tonumber(source)
	table.insert(excludedPlayers, id)

	Citizen.Wait(ServerConfig.UntilForcedHearbeat)
	if TableContains(excludedPlayers, id) then
		RemoveFromTable(excludedPlayers, id)
	end
end)

AddEventHandler("playerDropped", function(reason)
	ClearPlayer(tonumber(source))
end)