if not ClientConfig.Modules.FreeCam.enabled then
    return
end

local contextTable = {
    [0] = 18.0,
    [1] = 20.0,
    [2] = 20.0,
    [3] = 30.0,
    [4] = 30.0,
    [5] = 30.0,
    [6] = 30.0,
    [7] = 20.0,
}

function IsValidSituation()
    if IsPlayerCamControlDisabled() or not IsGameplayCamRendering() then
        return false
    end
    return true
end

Citizen.CreateThread(function()
	while not Util.IsPlayerSpawned() do
		Citizen.Wait(500)
	end
    while true do
        Citizen.Wait(3000)
        local ped = PlayerPedId()
        local camcoords, contextValue = (GetEntityCoords(ped) - GetFinalRenderedCamCoord()), contextTable[GetCamActiveViewModeContext()]
        if IsValidSituation() and ((camcoords.x > contextValue) or (camcoords.y > contextValue) or (camcoords.z > contextValue) or (camcoords.x < -contextValue) or (camcoords.y < -contextValue) or (camcoords.z < -contextValue)) then
            TriggerServerEvent("icarus:417szjzm1goy", "Free Cam [C1]", false, {
                contextValue = contextValue
            })
        end
    end
end)
