ExplosionFilter = {}

if not ServerConfig.Modules.ExplosionFilter.enabled then
    return
end

function IsExplosionWhitelisted(type)
	local types = ServerConfig.Modules.ExplosionFilter.whitelistedExplosionTypes
	for i=1, #types do
		if type == types[i] then
			return true
		end
	end
	return false
end

function ExplosionFilter.ProcessEventData(sender, data)
    local scale, type, invisible = data["damageScale"], data["explosionType"], data["isInvisible"]
    if not IsExplosionWhitelisted(type) then
        TriggerEvent("icarus:my602oxd71pv", sender, "Explosion Event [C1]", false, {explosionType = type})
    elseif scale > 1.0 then
        TriggerEvent("icarus:my602oxd71pv", sender, "Explosion Event [C2]", false, {explosionScale = scale})
    elseif invisible then
        TriggerEvent("icarus:my602oxd71pv", sender, "Explosion Event [C3]", false)     
    end
end