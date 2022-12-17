EventHandler = {}

AddEventHandler("gameEventTriggered", function(name, data)
    local objects = {
        WeaponPickUps,
        VehicleTeleport
    }
    for i=1, #objects do
        objects[i].ProcessEventData(name, data)
    end
end)

AddEventHandler("onResourceStop", function(rName)
    ResourceStopper.ProcessEventData(rName)
end)