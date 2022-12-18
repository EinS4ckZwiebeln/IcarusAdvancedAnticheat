WeaponModifier = {}

if not ServerConfig.Modules.WeaponModifier.enabled then
    return
end

function WeaponModifier.ProcessEventData(sender, data)
	local meleeMod = GetPlayerMeleeWeaponDamageModifier(sender)
	if meleeMod > 1.0 then
		TriggerEvent("icarus:my602oxd71pv", sender, "Weapon Modifier [C1]", false, {
			meleeMod = meleeMod
		})
		CancelEvent()
	end
	local damageMod = GetPlayerWeaponDamageModifier(sender)
	if damageMod > 1.0 then
		TriggerEvent("icarus:my602oxd71pv", sender, "Weapon Modifier [C2]", false, {
			damageMod = damageMod
		})
		CancelEvent()
	end
	local defenseMod2 = GetPlayerWeaponDefenseModifier_2(sender)
	if defenseMod2 > 1.0 then
		TriggerEvent("icarus:my602oxd71pv", sender, "Weapon Modifier [C4]", false, {
			defenseMod2 = defenseMod2
		})
		CancelEvent()
	end
end