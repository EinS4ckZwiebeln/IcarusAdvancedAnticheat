-- TS/Lua wrapper for the config.lua file
local BanPlayer = Config.BanPlayer

exports("GetConfig", function()
    return Config
end)

exports("BanPlayer", function(source, reason)
    BanPlayer(source, reason)
end)