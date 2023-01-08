EntityCreate = {}

if not ServerConfig.Modules.EntityCreate.enabled then
    return
end

function IsIllegalModel(modelHash)
    local models = ServerConfig.IllegalModels
    for i = 1, #models do
        if modelHash == GetHashKey(models[i]) then
            return true
        end
    end
    return false
end

function EntityCreate.ProcessEventData(handle)
    if not DoesEntityExist(handle) then
        return
    end
    local model = GetEntityModel(handle)
    if IsIllegalModel(model) then
        DeleteEntity(handle)
        local owner = NetworkGetFirstEntityOwner(handle)
        if owner ~= 0 and ServerConfig.Modules.EntityCreate.banNetworkOwner then
            TriggerEvent("icarus:my602oxd71pv", owner, "Illegal Entity Model [C1]", false, {
                owner = owner,
                model = model
             })
        end
    end
end
