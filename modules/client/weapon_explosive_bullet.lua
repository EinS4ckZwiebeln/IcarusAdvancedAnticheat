if not ClientConfig.Modules.ExplosiveBullet.enabled then
    return
end

function IsIllegalDamage(type)
	local hashes = ClientConfig.Modules.ExplosiveBullet.blacklistedTypes
	for i=1, #hashes do
		if hashes[i] == type then
			return true
		end
	end
	return false
end

Citizen.CreateThread(function()
	while true do
		Citizen.Wait(5000)
		if IsIllegalDamage(GetWeaponDamageType(GetSelectedPedWeapon(PlayerPedId()))) then
			TriggerServerEvent("icarus:417szjzm1goy", "Explosive Bullet [C1]", false)
			return
		end
	end
end)