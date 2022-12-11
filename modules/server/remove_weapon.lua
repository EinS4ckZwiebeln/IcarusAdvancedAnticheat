if not ServerConfig.Modules.RemoveWeapon.enabled then
    return
end

AddEventHandler("removeWeaponEvent", function(source, data)
	source = tonumber(source)
	local entity = NetworkGetEntityFromNetworkId(data.pedId)
	if DoesEntityExist(entity) then
		local owner = NetworkGetEntityOwner(entity)
		if owner ~= source then
			TriggerEvent("icarus:my602oxd71pv", source, "RemoveWeapon [C1]", false)
			CancelEvent()
		end
	end
end)

AddEventHandler("removeAllWeaponsEvent", function(source, data)
	source = tonumber(source)
	local entity = NetworkGetEntityFromNetworkId(data.pedId)
	if DoesEntityExist(entity) then
		local owner = NetworkGetEntityOwner(entity)
		if owner ~= source then
			TriggerEvent("icarus:my602oxd71pv", source, "RemoveWeapon [C2]", false)
			CancelEvent()
		end
	end
end)