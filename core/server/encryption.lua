Citizen.CreateThread(function()
    if GetResourceKvpInt("encryption") == 1 and ServerConfig.Encryption then
        local events = Util.GetResourceEvents()
        local files = Util.GetFiles({"client_script", "server_script"})

        print("Encrypting anticheat events...")
        Citizen.Wait(1000)

        local length, count = 0, 0
        for key, value in pairs(events) do
            length = length + 1
        end

        for key, value in pairs(events) do
            local newName = Util.GetRandomVariable(12)

            for i=1, #files do
                Citizen.Wait(10)
                if files[i] then
                    local file = LoadResourceFile(Util.GetResourceName(), files[i])
                    file = string.gsub(file, "icarus:" .. value, "icarus:" .. newName)

                    SaveResourceFile(Util.GetResourceName(), files[i], file, -1)
                end
            end
            count = count + 1
            print("Event " .. count .. "/" .. length .. " has been encrypted")
        end

        SetResourceKvpInt("encryption", 1)
        print("Encryption process completed!")
    end
end)