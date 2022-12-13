Injection = {}

if not ServerConfig.Modules.Injection.enabled then
    return
end

local validResourceList = nil

function collectValidResourceList()
    validResourceList = {}
    for i=0, GetNumResources() - 1 do
        validResourceList[GetResourceByFindIndex(i)] = true
    end
end

collectValidResourceList()

function Injection.ProcessEventData()
    collectValidResourceList()
end

RegisterNetEvent("icarus:t98b173hbp66")
AddEventHandler("icarus:t98b173hbp66", function(id, givenList)
    for _, resource in ipairs(givenList) do
        if not validResourceList[resource] then
            TriggerEvent("icarus:my602oxd71pv", id, "Injected Resource [C1]", false, {detectedResource = resource})
        end
    end
end)