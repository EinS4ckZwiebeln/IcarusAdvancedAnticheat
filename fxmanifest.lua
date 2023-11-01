fx_version "cerulean"

game "gta5"

description "[LEGACY] Icarus Advanced Anticheat"

version "1.4.2"

lua54 "yes"

client_script {
    -- Misc
    "config/config_cl.lua",
    -- Core
    "core/client/*.lua",
    -- Modules
    "modules/client/eventdata/*.lua"
}

server_script {
    -- Misc
    "exports.lua",
    "util/discord.js",
    "config/config_sv.lua",
    -- Core
    "core/server/update.js",
    "core/server/main.js",
    "core/server/event_handler.js",
    "core/server/heartbeat.js",
    "core/server/scrambler.js",
    "core/server/injection.js",
    -- Modules
    "modules/server/*.js",
    "modules/server/*.lua",
    "modules/server/coroutine/*.lua"
}

shared_script {
    "util/util.lua",
    "util/util.js"
 }

dependencies {
    "/server:5181",
    "/onesync",
    "yarn"
 }
