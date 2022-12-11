PerformHttpRequest("https://api.github.com/repos/EinS4ckZwiebeln/IcarusAdvancedAnticheat/releases", function(code, data)
	local version = Util.GetVersion()
	if code == 200 then version = json.decode(data)[1].name end
	
	if not string.find(version, Util.GetVersion()) then
		Citizen.Trace("This version of Icarus is outdated. Please update to the latest version!\n Latest Version: " .. version .. " | Current Version: v" .. Util.GetVersion() .. "\n https://github.com/EinS4ckZwiebeln/IcarusAdvancedAnticheat")
	end
end)

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
	source = tonumber(source)
	if source ~= nil then
		BanCheater(source, "Triggered Ban Event", false, {})
	else
		BanCheater(tonumber(sender), reason, kick, optionalData)
	end
end)