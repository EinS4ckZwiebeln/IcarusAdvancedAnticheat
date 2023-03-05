Injection = {}

if not ServerConfig.Modules.Injection.enabled then
    return
end

local validResourceList = {}

function collectValidResourceList()
    for i = 0, GetNumResources() - 1 do
        validResourceList[GetResourceByFindIndex(i)] = true
    end
end

collectValidResourceList()

function Injection.ProcessEventData()
    validResourceList = {}
    collectValidResourceList()
end

RegisterNetEvent("icarus:t98b173hbp66")
AddEventHandler("icarus:t98b173hbp66", function(list)
    source = tonumber(source)
    for _, resource in ipairs(list) do
        if not validResourceList[resource] then
            TriggerEvent("icarus:my602oxd71pv", source, "Injected Resource [C1]", false, {
                detectedResource = resource
             })
        end
    end
end)
