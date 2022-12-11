if not ServerConfig.Modules.GiveWeapon.enabled then
    return
end

AddEventHandler("giveWeaponEvent", function(source, data)
	source = tonumber(source)
	local entity = NetworkGetEntityFromNetworkId(data.pedId)
	if DoesEntityExist(entity) then
		local owner = NetworkGetEntityOwner(entity)
		if owner ~= source then
			TriggerEvent("icarus:my602oxd71pv", source, "GiveWeapon [C1]", false)
			CancelEvent()
		end
	end
end)