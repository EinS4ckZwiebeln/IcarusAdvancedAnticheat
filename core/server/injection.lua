CreateThread(function()
    if not ServerConfig.Modules.InjectClient.enabled then return end
    while true do
        -- This loads the script as a string, and sends it to the client for processing, the result is returned in icarus:pong on line 30
        local script = LoadResourceFile(GetCurrentResourceName(), "anticheat_injector.lua")
        if not script then return end
        for _, src in ipairs(GetPlayers()) do
            src = tonumber(src)
            if GetPlayerLastMsg(src) >= 65535 then goto continue end -- if the player is not connected.
            TriggerClientEvent("icarus:ping", src, script)
            ::continue::
        end
        Wait(5000)
    end
end)


-- The results returned from the anticheat_injector.lua file
local detections = {
    blips = {false, "Player blips"},
    nightVision = {false, "Vision [C1]"},
    thermalVision = {false, "Vision [C1]"},
    blacklistedDamageType = {false, "Explosive Bullet [C1]"},
    brokeMaxSpeed = {false, "Speed [C1]"},
    spectate = {false, "Spectate [C1]"},
    tinyPed = {false, "Tiny Ped [C1]"}
}

RegisterNetEvent("icarus:pong", function(retval, result)
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