if not ClientConfig.Modules.SuperJump.enabled then return end

local IsPedDoingBeastJump = IsPedDoingBeastJump
local GetEntityCoords = GetEntityCoords
local IsPedJumping = IsPedJumping
local IsPedJumpingOutOfVehicle = IsPedJumpingOutOfVehicle
local IsPedRagdoll = IsPedRagdoll
local IsPedInParachuteFreeFall = IsPedInParachuteFreeFall
local GetPedParachuteState = GetPedParachuteState
local IsPedDeadOrDying = IsPedDeadOrDying

CreateThread(function()
    while not Util.IsPlayerSpawned() do
        Wait(500)
    end

    local ped = PlayerPedId()

    while true do
        Wait(200)

        if IsPedDoingBeastJump(ped) then
            TriggerServerEvent("icarus:417szjzm1goy", "Superjump [C1]", false, {
                beastJump = true
            })
            return
        end

        if IsPedJumping(ped) then

            local startPos = GetEntityCoords(ped)

            while IsPedJumping(ped) do
                Wait(0)
                if IsPedJumpingOutOfVehicle(ped) or IsPedRagdoll(ped) or IsPedInParachuteFreeFall(ped) or GetPedParachuteState(ped) > 0 then break end
            end

            local endPos = GetEntityCoords(ped)
            local horizontalDist = Util.GetDistance(startPos.x, startPos.y, endPos.x, endPos.y)

            if horizontalDist > 25.0 and not IsPedDeadOrDying(ped) then
                TriggerServerEvent("icarus:417szjzm1goy", "Superjump [C2]", false, {
                    jumpLength = horizontalDist
                })
                return
            end
        end
    end
end)