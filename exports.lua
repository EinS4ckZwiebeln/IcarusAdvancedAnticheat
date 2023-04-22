API = {}

API.excusedPlayers = {}

exports("AddExcuseForPlayer", function(source, time)
    if Util.TableContains(API.excusedPlayers, source) then return end
    if time == -1 then
        table.insert(API.excusedPlayers, source)
    else
        Citizen.CreateThread(function()
            table.insert(API.excusedPlayers, source)
            Citizen.Wait(time)
            Util.RemoveFromTable(API.excusedPlayers, source)
        end)
    end
end)

exports("RemoveExcuseFromPlayer", function(source)
    Util.RemoveFromTable(API.excusedPlayers, source)
end)

exports("GetExcusedPlayers", function()
    return API.excusedPlayers
end)
