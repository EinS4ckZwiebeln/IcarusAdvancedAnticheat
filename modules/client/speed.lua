if not ClientConfig.Modules.Speed.enabled then
    return
end

Citizen.CreateThread(function()
	while not Util.IsPlayerSpawned() do
		Citizen.Wait(500)
	end
	while true do
		Citizen.Wait(250)
		local ped = PlayerPedId()
		local speed = GetEntitySpeed(ped)

		if IsPedInAnyVehicle(ped, true) or IsPedRagdoll(ped) then
			return
		end
		local maxSpeed = 14.0
		if IsEntityInAir(ped) then
			if IsPedFalling(ped) or IsPedInParachuteFreeFall(ped) or GetPedParachuteState(ped) > 0 then
				maxSpeed = 90.0
			end
		else
			if IsPedSwimmingUnderWater(ped) or IsPedSwimming(ped) then
				maxSpeed = 18.0
			else
				if IsPedSprinting(ped) or IsPedWalking(ped) then
					maxSpeed = 10.0
				end
			end
		end

		if speed > maxSpeed then
			TriggerServerEvent("icarus:417szjzm1goy", "Speed [C1]", false, {
				speed = speed,
				maxSpeed = maxSpeed
			})
			return
		end
	end
end)