const events = [
    {
        name: "clearPedTasksEvent",
        modules: [
            [enabled("ClearTasks"), require("./modules/server/eventdata/clear_tasks.js")],
        ]
    },
    {
        name: "explosionEvent",
        modules: [
            [enabled("ExplosionFilter"), require("./modules/server/eventdata/explosions.js")]
        ]
    },
    {
        name: "weaponDamageEvent",
        modules: [
            [enabled("Aimbot"), require("./modules/server/eventdata/aimbot.js")],
            [enabled("Godmode"), require("./modules/server/eventdata/godmode.js")],
            [enabled("WeaponRange"), require("./modules/server/eventdata/weapon_range.js")],
            [enabled("WeaponDamage"), require("./modules/server/eventdata/weapon_damage.js")],
            [enabled("WeaponModifier"), require("./modules/server/eventdata/weapon_modifier.js")],
        ]
    },
    {
        name: "giveWeaponEvent",
        modules: [
            [enabled("GiveWeapon"), require("./modules/server/eventdata/give_weapon.js")]
        ]
    },
    {
        name: "removeWeaponEvent",
        modules: [
            [enabled("RemoveWeapon"), require("./modules/server/eventdata/remove_weapon.js")]
        ]
    },
    {
        name: "removeAllWeaponsEvent",
        modules: [
            [enabled("RemoveWeapon"), require("./modules/server/eventdata/remove_weapon.js")]
        ]
    },
    {
        name: "ptFxEvent",
        modules: [
            [enabled("Particles"), require("./modules/server/eventdata/particles.js")]
        ]
    },
    {
        name: "entityCreated",
        modules: [
            [enabled("EntityCreate"), require("./modules/server/eventdata/entity_create.js")]
        ]
    },
    {
        name: "chatMessage",
        modules: [
            [enabled("ChatFilter"), require("./modules/server/eventdata/chat_filter.js")]
        ]
    },
    {
        name: "playerEnteredScope",
        modules: [
            [enabled("PedBlacklist"), require("./modules/server/eventdata/ped_blacklist.js")]
        ]
    },
    {
        name: "playerLeftScope",
        modules: [
            [enabled("PedBlacklist"), require("./modules/server/eventdata/ped_blacklist.js")]
        ]
    }
]

function enabled(name) {
    return serverConfig.Modules[name].enabled;
}

function listen() {
    for (let i in events) {
        const modules = events[i].modules
        for (let j in modules) {
            if (modules[j][0]) {
                onNet(events[i].name, (...args) => { modules[j][1](args[0], args[1], args[2]); });
            }
        }
    }
}

setImmediate(() => { listen(); });