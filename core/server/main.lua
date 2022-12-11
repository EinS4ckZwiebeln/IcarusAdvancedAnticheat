function BanCheater(source, reason, kick, optionalData)
	source = tonumber(source)
	if not IsPlayerAceAllowed(source, ServerConfig.BypassAcePerm) then
		reason = tostring(reason)
		if not kick then
			local webhooks = {}
			if ServerConfig.DiscordWebhook then
				if not optionalData then 
					optionalData = "No optional data received" 
				end
            	local embed = Util.ConstructEmbed(source, reason, json.encode(optionalData))
            	Util.SendEmbedToWebHook(ServerConfig.DiscordWebhook, "Icarus Anticheat", embed)
				table.insert(webhooks, ServerConfig.DiscordWebhook)
			end
			TakeScreenshotAndUpload(source, webhooks)
			Citizen.Wait(500)
			issueBan(source, reason)
		else
			DropPlayer(source, reason)
		end
	end
end

function TakeScreenshotAndUpload(source, urls)
	if GetResourceState("screenshot-basic") == "started" then
		TriggerClientEvent("icarus:52z8hbnkr0h1", source, urls)
	end
end

RegisterNetEvent("icarus:417szjzm1goy")
AddEventHandler("icarus:417szjzm1goy", function(reason, kick, optionalData)
	BanCheater(tonumber(source), reason, kick, optionalData)
end)

RegisterNetEvent("icarus:my602oxd71pv")
AddEventHandler("icarus:my602oxd71pv", function(sender, reason, kick, optionalData)
	BanCheater(tonumber(sender), reason, kick, optionalData)
end)