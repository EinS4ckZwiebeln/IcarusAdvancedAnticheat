Aimbot = {}

if not ServerConfig.Modules.Aimbot.enabled then
    return
end

function Pow2Vector(a, b)
    return (a[1] * b[1]) + (a[2] * b[2]) + (a[3] * b[3])
end

function SqrtPowVector(a)
    return math.sqrt((a[1] * a[1]) + (a[2] * a[2]) + (a[3] * a[3]))
end

function GetForwardVector2D(pitch, yaw)
    local cosYaw, sinPitch, sinYaw = math.cos(yaw), math.sin(pitch), math.sin(yaw)
    return vec2(-sinYaw, (sinPitch * cosYaw))
end

function Aimbot.ProcessEventData(sender, data)
    local weaponHash = data["weaponType"]
    if Util.IsMeleeWeapon(weaponHash) or Util.IsAOEWeapon(weaponHash) then
        return
    end

    local rawTargetData = data["hitGlobalId"] or data["hitGlobalIds"][1]
    local ped, target = GetPlayerPed(sender), NetworkGetEntityFromNetworkId(rawTargetData)
    
    if DoesEntityExist(target) and IsPedAPlayer(target) then
        local radians = GetPlayerCameraRotation(sender)
        local pitch, yaw = radians[1], radians[3]
        local forwardVector = GetForwardVector2D(pitch, yaw)

        local pCoords, tCoords = GetEntityCoords(ped), GetEntityCoords(target)
        local dist = Util.GetDistance(pCoords.x, pCoords.y, tCoords.x, tCoords.y)
        local expForward = vec3(pCoords.x + forwardVector.x * dist, pCoords.y + forwardVector.y * dist, tCoords.z)
        local ans = math.acos(Pow2Vector(expForward, tCoords) / (SqrtPowVector(expForward) * SqrtPowVector(tCoords)))

        local degrees = math.deg(ans)
        if degrees > ServerConfig.Modules.Aimbot.maxAngle then
            TriggerEvent("icarus:my602oxd71pv", sender, "Aimbot [C1]", false, {
                degrees = degrees
            })
            CancelEvent()
        end
    end
end