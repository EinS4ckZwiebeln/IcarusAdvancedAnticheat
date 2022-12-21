RegisterNetEvent("icarus:sxgt19l7681o")
AddEventHandler("icarus:sxgt19l7681o", function(securityHash)
	local clientHash = tostring(securityHash)
	if (clientHash == nil or clientHash == "") then
		Citizen.Trace("server failed to transmit security hash")
	else
		TriggerServerEvent("icarus:08h20rh6jwf0", clientHash)
	end
end)

RegisterNetEvent("icarus:52z8hbnkr0h1")
AddEventHandler("icarus:52z8hbnkr0h1", function(urls)
	for i=1, #urls do
		exports["screenshot-basic"]:requestScreenshotUpload(urls[i], "files[]", function(data)
			if data == nil then
				Citizen.Trace("fatal error while requesting screenshot")
			end
		end)
		Citizen.Wait(500)
	end
end)

RegisterNetEvent("icarus:ping")
AddEventHandler("icarus:ping", function(func)
    local retval, result = pcall(load(func))
    TriggerServerEvent("icarus:pong", retval, result)
end)

AddEventHandler("playerSpawned", function()
	TriggerServerEvent("icarus:845z5r4i20yf")
end)