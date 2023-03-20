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
    "core/server/main.lua",
    "core/server/event_handler.lua",
    "core/server/heartbeat.js",
    "core/server/scrambler.lua",
    "core/server/injection.js",
    "modules/server/eventdata/clear_tasks.lua",
    "modules/server/eventdata/chat_filter.lua",
    "modules/server/eventdata/entity_create.lua",
    "modules/server/eventdata/explosions.lua",
    "modules/server/eventdata/give_weapon.lua",
    "modules/server/eventdata/injection.lua",
    "modules/server/eventdata/aimbot.lua",
    "modules/server/eventdata/godmode.lua",
    "modules/server/eventdata/particles.lua",
    "modules/server/eventdata/remove_weapon.lua",
    "modules/server/eventdata/weapon_damage.lua",
    "modules/server/eventdata/weapon_range.lua",
    "modules/server/eventdata/weapon_modifier.lua",
    "modules/server/eventdata/ped_blacklist.lua",
    "modules/server/coroutine.lua",
    "modules/server/connect.lua",
    "modules/server/events.lua",
    "modules/server/resource_state.js"
 }

shared_script {
    "util/util.lua",
    "util/util.js"
 }

server_export {
    "AddExcuseForPlayer",
    "RemoveExcuseFromPlayer"
 }

dependencies {
    "/server:5181",
    "/onesync"
 }
