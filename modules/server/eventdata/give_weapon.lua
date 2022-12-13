GiveWeapon = {}

if not ServerConfig.Modules.GiveWeapon.enabled then
    return
end

function GiveWeapon.ProcessEventData(source, data)
	local entity = NetworkGetEntityFromNetworkId(data["pedId"])
	if DoesEntityExist(entity) then
		local owner = NetworkGetEntityOwner(entity)
		if owner ~= source then
			TriggerEvent("icarus:my602oxd71pv", source, "GiveWeapon [C1]", false)
			CancelEvent()
		end
	end
end