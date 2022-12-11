if not ServerConfig.Modules.EntityCreate.enabled then
    return
end

function IsIllegalModel(modelHash)
	local models = ServerConfig.IllegalModels 
	for i=1, #models do
		if modelHash == GetHashKey(models[i]) then
			return true
		end
	end
	return false
end

AddEventHandler("entityCreated", function(handle)
    if not DoesEntityExist(handle) then
        return
    end
    local model = GetEntityModel(handle)
    if IsIllegalModel(model) then
        DeleteEntity(handle)
        local owner = NetworkGetFirstEntityOwner(handle)
        if owner > 0 and ServerConfig.Modules.EntityCreate.banNetworkOwner then
            TriggerEvent("icarus:my602oxd71pv", owner, "Illegal Entity Model [C1]", false)
        end
    end
end)

if ServerConfig.Modules.EntityCreate.checkForScriptOwnership then
    AddEventHandler("entityCreating", function(handle)
        if not DoesEntityExist(handle) then
            return
        end
        local script = GetEntityScript(handle)
        if script == nil then
            return
        end

        for i=0, GetNumResources() - 1 do
            local rName = GetResourceByFindIndex(i)
            if rName == script then
                return
            end
        end

        local owner = NetworkGetFirstEntityOwner(handle)
        if owner > 0 then
            TriggerEvent("icarus:my602oxd71pv", owner, "Illegal Entity Ownership [C1]", false)
            CancelEvent()
        end
    end)
end