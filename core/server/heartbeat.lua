local securityHash = Util.GetRandomVariable(ServerConfig.SecurityHashLength)
local awaitedPlayers, excludedPlayers = {}, {}

Citizen.CreateThread(function()
    while true do
        Citizen.Wait(ServerConfig.HeartbeatInterval)
        local players = GetPlayers()
        securityHash = Util.GetRandomVariable(ServerConfig.SecurityHashLength)

        for i = 1, #players do
            local id = tonumber(players[i])
            if not Util.TableContains(awaitedPlayers, id) then
                table.insert(awaitedPlayers, id)
            end
            TriggerClientEvent("icarus:sxgt19l7681o", id, securityHash)
        end

        Citizen.Wait(ServerConfig.HeartbeatInterval)
        players = GetPlayers()

        for i = 1, #players do
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
    if Util.TableContains(awaitedPlayers, source) and not Util.TableContains(excludedPlayers, source) then
        return true
    end
    return false
end

function ClearPlayer(source)
    Util.RemoveFromTable(excludedPlayers, source)
    Util.RemoveFromTable(awaitedPlayers, source)
end

RegisterNetEvent("icarus:08h20rh6jwf0")
AddEventHandler("icarus:08h20rh6jwf0", function(clientHash)
    if clientHash == securityHash then
        Util.RemoveFromTable(awaitedPlayers, tonumber(source))
    end
end)

RegisterNetEvent("icarus:3ph9kyfcy95n")
AddEventHandler("icarus:3ph9kyfcy95n", function()
    Util.RemoveFromTable(excludedPlayers, tonumber(source))
end)

AddEventHandler("playerJoining", function()
    local id = tonumber(source)
    table.insert(excludedPlayers, id)

    Citizen.Wait(ServerConfig.UntilForcedHearbeat)
    if Util.TableContains(excludedPlayers, id) then
        Util.RemoveFromTable(excludedPlayers, id)
    end
end)

AddEventHandler("playerDropped", function(reason)
    ClearPlayer(tonumber(source))
end)
