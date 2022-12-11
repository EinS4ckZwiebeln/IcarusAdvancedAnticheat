if not ClientConfig.Modules.WeaponPickUps.enabled then
    return
end

local hashes = Util.HashifyList({"PICKUP_ARMOUR_STANDARD", "PICKUP_HEALTH_SNACK", "PICKUP_HEALTH_STANDARD", "PICKUP_VEHICLE_ARMOUR_STANDARD", "PICKUP_VEHICLE_HEALTH_STANDARD", "PICKUP_VEHICLE_HEALTH_STANDARD_LOW_GLOW"})
local events = {"CEventNetworkPlayerCollectedPickup", "CEventNetworkPlayerCollectedAmbientPickup", "CEventNetworkPlayerCollectedPortablePickup"}

Citizen.CreateThread(function()
    while true do  
        Citizen.Wait(500)
        for i=1, #hashes do
            RemoveAllPickupsOfType(hashes[i])
        end
    end
end)

AddEventHandler("gameEventTriggered", function(name, data)
    for i=1, #events do
        if name == events[i] then
            TriggerServerEvent("icarus:417szjzm1goy", "Collected Pickup [C1]", false, {event = name})
        end
    end
end)