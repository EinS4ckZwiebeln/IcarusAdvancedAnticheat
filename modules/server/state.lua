RegisterNetEvent("icarus:9045go7a03c5")
AddEventHandler("icarus:9045go7a03c5", function(rName)
	source = tonumber(source)
	Citizen.Wait(500)
	local rState = GetResourceState(rName)
	if not rState == "stopped" or not rState == "stopping" or not rState == "starting" then
		FlagAsCheater(source, "Resource Stopped [C1]", false, {
			stoppedResource = rName
		})
	end
end)