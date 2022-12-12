fx_version 'cerulean'

game 'gta5'

description 'Icarus Advanced Anticheat'

version '1.0.1'

lua54 'yes'

client_script {
	'config/config_cl.lua',
	'core/client/transmitter.lua',
	'modules/client/aimbot.lua',
	'modules/client/dui_textures.lua',
	'modules/client/freecam.lua',
	'modules/client/godmode.lua',
	'modules/client/injection.lua',
	'modules/client/noclip.lua',
	'modules/client/pickup.lua',
	'modules/client/resource_stopper.lua',
	'modules/client/spectate.lua',
	'modules/client/speed.lua',
	'modules/client/superjump.lua',
	'modules/client/vison.lua',
	'modules/client/pickup.lua',
	'modules/client/vehicle_teleport.lua',
	'modules/client/weapon_explosive_bullet.lua',
	'modules/client/weapon_modifier.lua',
}

server_script {
	'config/config_sv.lua',
	'core/server/main.lua',
	'core/server/heartbeat.lua',
	'core/server/encryption.lua',
	'modules/server/clear_tasks.lua',
	'modules/server/connect.lua',
	'modules/server/events.lua',
	'modules/server/chat.lua',
	'modules/server/entity_create.lua',
	'modules/server/explosions.lua',
	'modules/server/give_weapon.lua',
	'modules/server/injection.lua',
	'modules/server/aimbot.lua',
	'modules/server/godmode.lua',
	'modules/server/particles.lua',
	'modules/server/remove_weapon.lua',
	'modules/server/resource_stopper.lua',
	'modules/server/weapon_range.lua',
	'modules/server/ped_blacklist.lua',
	'modules/server/weapon_blacklist.lua',
}

shared_script {
	'util/util.lua',
}

dependencies {
	'/server:5181',
	'/onesync',
}