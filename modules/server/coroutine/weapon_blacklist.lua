-- GetSelectedPedWeapon
if not ServerConfig.Modules.WeaponBlacklist.enabled then
	return
end

local hashList = Util.HashifyList(ServerConfig.BlacklistedWeapons)

function OwnsBlacklistedWeapon(ped)
	local currentWeapon = GetSelectedPedWeapon(ped)
	for i=1, #hashList do
		if hashList[i] == currentWeapon then
			return true, currentWeapon
		end
	end
	return false, 0
end

Citizen.CreateThread(function()
	while true do
		Citizen.Wait(10000)
		local players = GetPlayers()
		for i=1, #players do
			Citizen.Wait(10)
			local isOwnerOfBlacklistedWeapon, weaponHash = OwnsBlacklistedWeapon(GetPlayerPed(players[i]))
			if isOwnerOfBlacklistedWeapon then
				TriggerEvent("icarus:my602oxd71pv", players[i], "Illegal Weapon [C1]", false, {
					detectedWeapon = weaponHash
				})
			end
		end
	end
end)