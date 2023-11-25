-- TS/Lua wrapper for the config.lua file
local config = Config
local BanPlayer = config.BanPlayer

exports("GetConfig", function()
    return Config
end)
exports("BanPlayer", function()
    BanPlayer(source, reason)
end)