-- TS/Lua wrapper for the config.lua file
local config = Config
local BanPlayer = config.BanPlayer

exports("GetConfig", function()
    return config
end)

exports("BanPlayer", function(source, reason)
    BanPlayer(source, reason)
end)