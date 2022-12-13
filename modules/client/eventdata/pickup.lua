WeaponPickUps = {}

if not ClientConfig.Modules.WeaponPickUps.enabled then
    return
end

local events = {"CEventNetworkPlayerCollectedPickup", "CEventNetworkPlayerCollectedAmbientPickup", "CEventNetworkPlayerCollectedPortablePickup"}

function WeaponPickUps.ProcessEventData(name, data)
    for i=1, #events do
        if name == events[i] then
            TriggerServerEvent("icarus:417szjzm1goy", "Collected Pickup [C1]", false, {event = name})
        end
    end
end