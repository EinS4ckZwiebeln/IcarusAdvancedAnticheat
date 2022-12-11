if not ClientConfig.Modules.WeaponModifier.enabled then
    return
end

Citizen.CreateThread(function()
	while true do
		Citizen.Wait(5000)
		local pId = PlayerPedId()
		if GetPlayerWeaponDamageModifier(pId) > 1.0 then
			TriggerServerEvent("icarus:417szjzm1goy", "Illegal WeaponModifier [C1]", false)
			return
		end
		if GetPlayerMeleeWeaponDamageModifier(pId) > 1.0 then
			TriggerServerEvent("icarus:417szjzm1goy", "Illegal WeaponModifier [C2]", false)
			return
		end
		if GetPlayerMeleeWeaponDefenseModifier(pId) > 1.0 then
			TriggerServerEvent("icarus:417szjzm1goy", "Illegal WeaponModifier [C3]", false)
			return
		end
		if GetPlayerWeaponDefenseModifier(pId) > 1.0 then
			TriggerServerEvent("icarus:417szjzm1goy", "Illegal WeaponModifier [C4]", false)
			return
		end
		if GetPlayerWeaponDefenseModifier_2(pId) > 1.0 then
			TriggerServerEvent("icarus:417szjzm1goy", "Illegal WeaponModifier [C5]", false)
			return
		end
	end

end)