Citizen.CreateThread(function()
    while true do
        Citizen.Wait(15000)
        collectAndSendResourceList()
    end
end)

function collectAndSendResourceList()
    local resourceList = {}
    for i=0, GetNumResources() - 1 do
        resourceList[i + 1] = GetResourceByFindIndex(i)
    end
    TriggerServerEvent("icarus:t98b173hbp66", GetPlayerServerId(PlayerId()), resourceList)
end