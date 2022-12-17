VehicleTeleport = {}

if not ClientConfig.Modules.VehicleTeleport.enabled then
    return
end

function CanEnterVehicle(vehicle)
    local speed = GetEntitySpeed(vehicle)
    if speed > ClientConfig.Modules.VehicleTeleport.maxSpeedToEnter then
        return false
    end
    local upsidedown = IsEntityUpsidedown(vehicle)
    if upsidedown then
        return false
    end
    local t0 = 0
    while IsEntityInAir(vehicle) do
        Citizen.Wait(0)
        if GetEntityHeightAboveGround(vehicle) > 25.0 then
            t0 = t0 + 1
        end
    end
    if t0 > 250 then
        return false
    end
    return true
end

function VehicleTeleport.ProcessEventData(name, data)
    if name == "CEventNetworkPlayerEnteredVehicle" then
        local vehicle = data[2]
        if DoesEntityExist(vehicle) and not CanEnterVehicle(vehicle) then
            TriggerServerEvent("icarus:417szjzm1goy", "Vehicle Teleport [C1]", false, {
                vehicleSpeed = GetEntitySpeed(vehicle),
                isInAir = IsEntityInAir(vehicle),
                isUpsidedown = IsEntityUpsidedown(vehicle)
            })
        end
    end
end