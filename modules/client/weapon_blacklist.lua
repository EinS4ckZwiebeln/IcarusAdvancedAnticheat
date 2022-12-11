if not ClientConfig.Modules.WeaponBlacklist.enabled then
    return
end

local hashList = Util.HashifyList(ClientConfig.BlacklistedWeapons)

Citizen.CreateThread(function()
	while true do
		Citizen.Wait(5000)
		local ped = PlayerPedId()
		for i=1, #hashList do
			if HasPedGotWeapon(ped, hashList[i], false) == 1 then
				TriggerServerEvent("icarus:417szjzm1goy", "Illegal Weapon [C1]", false)
				return
			end
		end
	end
end)