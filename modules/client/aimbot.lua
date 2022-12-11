if not ClientConfig.Modules.Aimbot.enabled then
    return
end

if ClientConfig.Modules.Aimbot.disableAimAssist then
	Citizen.CreateThread(function()
		while not Util.IsPlayerSpawned() do
			Citizen.Wait(500)
		end
		while true do
			Citizen.Wait(1000)
			SetPlayerTargetingMode(3)
		end
	end)
end

Citizen.CreateThread(function()
	while not Util.IsPlayerSpawned() do
		Citizen.Wait(500)
	end
	while true do
		Citizen.Wait(100)
		while IsAimCamActive() do
			local rot = GetGameplayCamRot(2)
			local pitch, roll, yaw = rot.x, rot.y, rot.z

			Citizen.Wait(0)
			local nRot = GetGameplayCamRot(2)
			local nPitch, nRoll, nYaw = nRot.x, nRot.y, nRot.z
			local diffYaw, diffPitch = Util.GetAngleDiff(yaw, nYaw, 360), Util.GetAngleDiff(pitch, nPitch, 180)

			if diffYaw > 120.0 or diffPitch > 45.0 then
				TriggerServerEvent("icarus:417szjzm1goy", "Aimbot [C2]", false, {
					yaw = yaw, 
					nYaw = nYaw, 
					diffYaw = diffYaw, 
					pitch = pitch,
					nPitch = nPitch,
					diffPitch = diffPitch
				})
			end
		end
	end
end)