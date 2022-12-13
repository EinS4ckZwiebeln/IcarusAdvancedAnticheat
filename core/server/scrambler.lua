Citizen.CreateThread(function()
    if GetResourceKvpInt("scrambled") ~= 1 and ServerConfig.Scrambler then
        local events = Util.GetResourceEvents()
        local files = Util.GetFiles({"client_script", "server_script"})

        Citizen.Trace("Scrambling anticheat events...")
        Citizen.Wait(1000)

        local count = 0
        for key, value in pairs(events) do
            local newName = Util.GetRandomVariable(12)
            for i=1, #files do
                Citizen.Wait(10)
                local file = LoadResourceFile(Util.GetResourceName(), files[i])
                file = string.gsub(file, "icarus:" .. value, "icarus:" .. newName)
                SaveResourceFile(Util.GetResourceName(), files[i], file, -1)
            end
            count = count + 1
            Citizen.Trace("Event #" .. count .. " has been scrambled.")
        end
        SetResourceKvpInt("scrambled", 1)
        Citizen.Trace("Scrambling process completed!")
    end
end)