function pow2Vector(a, b) {
    return (a[0] * b[0]) + (a[1] * b[1]) + (a[2] * b[2]);
}

function sqrtPowVector(a) {
    return Math.sqrt((a[0] * a[0]) + (a[1] * a[1]) + (a[2] * a[2]));
}

function getForwardVector2D(pitch, yaw) {
    const cosYaw = Math.cos(yaw);
    const sinPitch = Math.sin(pitch);
    const sinYaw = Math.sin(yaw);
    return [-sinYaw, (sinPitch * cosYaw)];
}

module.exports = (sender, data) => {
    const weaponHash = data.weaponType;
    if (isMeleeWeapon(weaponHash) || isAoeWeapon(weaponHash)) { return; }

    const netId = data.hitGlobalId || data.hitGlobalIds[0];
    const target = NetworkGetEntityFromNetworkId(netId);
    const ped = GetPlayerPed(sender);

    if (!DoesEntityExist(target) || !IsPedAPlayer(target)) { return; }

    const radians = GetPlayerCameraRotation(sender);
    const forwardVector = getForwardVector2D(radians[0], radians[2]);
    const pCoords = GetEntityCoords(ped);
    const tCoords = GetEntityCoords(target);

    const distance = Math.sqrt((pCoords[0] - tCoords[0]) ** 2 + (pCoords[1] - tCoords[1]) ** 2);
    const expandedForward = [pCoords[0] + forwardVector[0] * distance, pCoords[1] + forwardVector[1] * distance, tCoords[3]];
    const ans = Math.acos(pow2Vector(expandedForward, tCoords) / (sqrtPowVector(expandedForward) * sqrtPowVector(tCoords)));
    const degrees = ans * (180 / Math.PI);

    if (degrees > serverConfig.Modules.Aimbot.maxAngle) {
        emitNet("icarus:my602oxd71pv", sender, "Aimbot [C1]", false, { dregrees: degrees });
        CancelEvent();
    }
};