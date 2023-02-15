PedBlacklist = {}

if not ServerConfig.Modules.PedBlacklist.enabled then
    return
end

local hashList = Util.HashifyList(ServerConfig.Modules.PedBlacklist.playerModels)

function PedBlacklist.ProcessEventData(data)
    local player = tonumber(data["player"])
    if player > 0 then
        local ped = GetPlayerPed(player)
        local model = GetEntityModel(ped)

        if not IsWhitelistedModel(model) and model ~= 0 then
            TriggerEvent("icarus:my602oxd71pv", player, "Illegal Player Ped [C1]", false, {
                detectedPed = model
             })
        end
    end
end

function IsWhitelistedModel(model)
    for i = 1, #hashList do
        if model == hashList[i] then
            return true
        end
    end
    return false
end
