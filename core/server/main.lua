function BanCheater(source, reason, kick, optionalData)
    if not optionalData then
        optionalData = "No optional data received"
    end
    if ServerConfig.Debug then
        Citizen.Trace(json.encode({
            source = source,
            reason = reason,
            kicked = kick,
            data = optionalData
         }))
        return
    end
    if not IsPlayerAceAllowed(source, ServerConfig.BypassAcePerm) then
        if not kick then
            if ServerConfig.DiscordWebhook ~= "" then
                TakeScreenshotAndUpload(source, ServerConfig.DiscordWebhook, {
                    reason = reason,
                    optionalData = optionalData
                 })
            end
            Citizen.Wait(500)
            issueBan(source, reason)
        else
            DropPlayer(source, reason)
        end
    end
end

function TakeScreenshotAndUpload(source, url, data)
    if GetResourceState("screenshot-basic") == "started" then
        local name = Util.GetRandomVariable(16)
        exports["screenshot-basic"]:requestClientScreenshot(source, {
            fileName = "cache/" .. name .. ".jpg"
         }, function(err, fileName)
            if not err then
                TriggerEvent("icarus:615p5f5ft0i7f17j", url, "./" .. fileName, {
                    username = "Icarus",
                    embeds = Util.ConstructEmbed(source, data.reason, json.encode(data.optionalData), name .. ".jpg")
                 })
            else
                Citizen.Trace("fatal error occured while taking a screenshot")
            end
        end)
    end
end

RegisterNetEvent("icarus:417szjzm1goy")
AddEventHandler("icarus:417szjzm1goy", function(reason, kick, optionalData)
    BanCheater(tonumber(source), reason, kick, optionalData)
end)

RegisterNetEvent("icarus:my602oxd71pv")
AddEventHandler("icarus:my602oxd71pv", function(sender, reason, kick, optionalData)
    source = tonumber(source)
    if source ~= nil then
        BanCheater(source, "Triggered Ban Event", false, {})
    else
        BanCheater(tonumber(sender), reason, kick, optionalData)
    end
end)
