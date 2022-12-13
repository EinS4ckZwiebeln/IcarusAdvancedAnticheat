if not ClientConfig.Modules.SuperJump.enabled then
    return
end

local ped = nil

Citizen.CreateThread(function()
    while true do
        Citizen.Wait(500)
        ped = PlayerPedId()
    end
end)

Citizen.CreateThread(function()
	while not Util.IsPlayerSpawned() do
		Citizen.Wait(500)
	end
	while true do
		Citizen.Wait(100)

        if IsPedDoingBeastJump(ped) then
            TriggerServerEvent("icarus:417szjzm1goy", "Superjump [C1]", false, {beastJump = true})
            return
        end

        local startPos = GetEntityCoords(ped)
        while IsPedJumping(ped) do
            Citizen.Wait(0)
            if IsPedJumpingOutOfVehicle(ped) or IsPedRagdoll(ped) or IsPedInParachuteFreeFall(ped) or GetPedParachuteState(ped) > 0 then
                break
            end
        end

        local endPos = GetEntityCoords(ped)
        local horizontalDist = Util.GetDistance(startPos.x, startPos.y, endPos.x, endPos.y)

        if horizontalDist > 25.0 and not IsPedDeadOrDying(ped) then
            TriggerServerEvent("icarus:417szjzm1goy", "Superjump [C2]", false, {jumpLength = horizontalDist})
            return
		end
	end
end)