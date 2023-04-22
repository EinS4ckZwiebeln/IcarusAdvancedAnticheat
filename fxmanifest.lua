fx_version "cerulean"

game "gta5"

description "Icarus Advanced Anticheat"

version "1.3.2"

lua54 "yes"

client_script {
    "config/config_cl.lua",
    "core/client/transmitter.lua",
    "core/client/event_handler.lua",
    "modules/client/eventdata/pickup.lua",
    "modules/client/eventdata/resource_stopper.lua",
    "modules/client/eventdata/vehicle_teleport.lua"
 }

server_script {
    "exports.lua",
    "util/discord.js",
    "config/config_sv.lua",
    "core/server/update.js",
    "core/server/main.js",
    "core/server/event_handler.js",
    "core/server/heartbeat.js",
    "core/server/scrambler.js",
    "core/server/injection.js",
    "modules/server/coroutine/*.lua",
    "modules/server/connect.js",
    "modules/server/events.lua",
    "modules/server/resource_state.js"
 }

shared_script {
    "util/util.lua",
    "util/util.js"
 }

dependencies {
    "/server:5181",
    "/onesync"
 }
