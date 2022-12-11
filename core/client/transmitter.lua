RegisterNetEvent("icarus:sxgt19l7681o")
AddEventHandler("icarus:sxgt19l7681o", function(securityHash)
	local clientHash = tostring(securityHash)
	if (clientHash == nil or clientHash == "") then
		print("server failed to transmit security hash")
	else
		TriggerServerEvent("icarus:08h20rh6jwf0", clientHash)
		while NetworkGetAveragePacketLossForPlayer(PlayerId()) > 0.1 do
			TriggerServerEvent("icarus:08h20rh6jwf0", clientHash)
			Citizen.Wait(500)
		end
	end
end)

RegisterNetEvent("icarus:52z8hbnkr0h1")
AddEventHandler("icarus:52z8hbnkr0h1", function(urls)
	for i=1, #urls do
		exports["screenshot-basic"]:requestScreenshotUpload(urls[i], "files[]", function(data)
			if data == nil then
				print("fatal error while requesting screenshot")
			end
		end)
		Citizen.Wait(500)
	end
end)

AddEventHandler("playerSpawned", function()
	TriggerServerEvent("icarus:845z5r4i20yf")
end)