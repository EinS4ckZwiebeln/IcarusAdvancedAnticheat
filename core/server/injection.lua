CreateThread(function()
    -- This loads the script as a string, and sends it to the client for processing, the result is returned in the event on line 30.
    local script = LoadResourceFile(Util.GetResourceName(), "payload/client_payload.lua")
    if not script then
        Citizen.Trace("failed to load client payload script")
        return 
    end

    while true do
        for _, src in ipairs(GetPlayers()) do
            src = tonumber(src)
            if GetPlayerLastMsg(src) >= 65535 then goto continue end -- if the player is not connected.
            TriggerClientEvent("icarus:p728i449icr3", src, script)
            ::continue::
        end
        Wait(5000)
    end
end)

-- The results returned from the client_payload.lua file.
local detections = {
    blips = {false, "Player Blips [C1]"},
    nightVision = {false, "Nightvision [C1]"},
    thermalVision = {false, "Thermalvision [C1]"},
    blacklistedDamageType = {false, "Explosive Bullet [C1]"},
    brokeMaxSpeed = {false, "Speed [C1]"},
    spectate = {false, "Spectate [C1]"},
    tinyPed = {false, "Tiny Ped [C1]"},
    freeCam = {false, "FreeCam [C1]"},
    ragdoll = {false, "No Ragdoll [C1]"}
}

RegisterNetEvent("icarus:w7t8gc7dps21", function(retval, result)
    local src = source
    assert(retval, ("%s returned error: %s"):format(GetPlayerName(src), tostring(result)))

    if type(result) ~= "table" then return end

    for detection, banReason in pairs(detections) do 
        if result[detection] == true then 
            BanCheater(src, banReason[2], banReason[1])
            return
        end
    end
end)