EventHandler = {}

AddEventHandler("weaponDamageEvent", function(sender, data)
    sender = tonumber(sender)
    local objects = {
        Aimbot,
        Godmode,
        WeaponRange,
        WeaponDamage,
        WeaponModifier
    }
    for i=1, #objects do
        objects[i].ProcessEventData(sender, data)
    end
end)

AddEventHandler("clearPedTasksEvent", function(sender, data)
    sender = tonumber(sender)
    ClearTasks.ProcessEventData(sender, data)
end)

AddEventHandler("explosionEvent", function(sender, data)
    sender = tonumber(sender)
    ExplosionFilter.ProcessEventData(sender, data)
end)

AddEventHandler("giveWeaponEvent", function(source, data)
    source = tonumber(source)
    GiveWeapon.ProcessEventData(source, data)
end)

AddEventHandler("removeWeaponEvent", function(source, data)
    source = tonumber(source)
    RemoveWeapon.ProcessEventData(source, data)
end)

AddEventHandler("removeAllWeaponsEvent", function(source, data)
    source = tonumber(source)
    RemoveWeapon.ProcessEventData(source, data)
end)

AddEventHandler("ptFxEvent", function(source, data)
    source = tonumber(source)
    Particles.ProcessEventData(source, data)
end)

AddEventHandler("entityCreated", function(handle)
    EntityCreate.ProcessEventData(handle)
end)

AddEventHandler("chatMessage", function(source, author, text)
    source = tonumber(source)
    ChatFilter.ProcessEventData(source, author, text)
end)

AddEventHandler("onResourceListRefresh", function()
    Injection.ProcessEventData()
end)