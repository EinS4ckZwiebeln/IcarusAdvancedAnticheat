AddEventHandler("playerConnecting", function (playerName, setKickReason, deferrals)
    source = tonumber(source)
    local ipv4 = Util.GetIdentifier(source, "ip:"):sub(4)
    if ServerConfig.Modules.Connect.NameFilter.enabled or ServerConfig.Modules.Connect.NoVPN.enabled then
        deferrals.defer()
        Citizen.Wait(0)
    end

    if not Util.IsAlphaNumeric(tostring(playerName), " .,?!+-*:/~#_<>|^") and ServerConfig.Modules.Connect.NameFilter.enabled then
        deferrals.done(ServerConfig.Modules.Connect.NameFilter.rejectionMsg)
    end

    if ServerConfig.Modules.Connect.NoVPN.enabled then
        PerformHttpRequest("https://blackbox.ipinfo.app/lookup/" .. ipv4, function(errorCode, usingVPN, resultHeaders)
            if not usingVPN == "N" then
                deferrals.done()
            else
                deferrals.done(ServerConfig.Modules.Connect.NoVPN.rejectionMsg)
            end
        end)
    end
end)