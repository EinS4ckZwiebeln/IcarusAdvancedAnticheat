AddEventHandler("playerConnecting", function (playerName, setKickReason, deferrals)
    if ServerConfig.Modules.Connect.NameFilter.enabled or ServerConfig.Modules.Connect.NoVPN.enabled then
        deferrals.defer()
        Citizen.Wait(0)
    end

    if not Util.IsAlphaNumeric(tostring(playerName), " .,?!+-*:/~#_<>|^") and ServerConfig.Modules.Connect.NameFilter.enabled then
        deferrals.done(ServerConfig.Modules.Connect.NameFilter.rejectionMsg)
    end

    if ServerConfig.Modules.Connect.NoVPN.enabled then
        PerformHttpRequest("https://blackbox.ipinfo.app/lookup/" .. GetPlayerEndpoint(source), function(errorCode, usingVPN, resultHeaders)
            if not usingVPN == "N" then
                deferrals.done()
            else
                deferrals.done(ServerConfig.Modules.Connect.NoVPN.rejectionMsg)
            end
        end)
    end
end)