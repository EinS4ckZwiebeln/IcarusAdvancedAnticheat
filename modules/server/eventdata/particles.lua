Particles = {}

if not ServerConfig.Modules.Particles.enabled then
    return
end

function Particles.ProcessEventData(source, data)
	local entityNetId = data[4]
	local entity = NetworkGetEntityFromNetworkId(entityNetId)

	if DoesEntityExist(entity) then
		local owner = NetworkGetEntityOwner(entity)
		if owner ~= source then
			TriggerEvent("icarus:my602oxd71pv", source, "ptFxEvent [C1]", false)
			CancelEvent()
		end
	end

	local scale = tonumber(data[24])
	if scale ~= nil and scale > ServerConfig.Modules.Particles.maxScale then
		TriggerEvent("icarus:my602oxd71pv", source, "ptFxEvent [C2]", false, {fxScale = scale})
		CancelEvent()
	end
end