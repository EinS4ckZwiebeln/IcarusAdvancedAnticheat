EventHandler = {}

AddEventHandler("gameEventTriggered", function(name, data)
    WeaponPickUps.ProcessEventData(name, data)
    VehicleTeleport.ProcessEventData(name, data)
end)

AddEventHandler("onResourceStop", function(rName)
    ResourceStopper.ProcessEventData(rName)
end)