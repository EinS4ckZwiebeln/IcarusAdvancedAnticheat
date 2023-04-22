module.exports = (sender, data) => {
    const rawTargetData = data.hitGlobalId ? data.hitGlobalId : data.hitGlobalIds[0];
    const target = NetworkGetEntityFromNetworkId(rawTargetData);

    if (DoesEntityExist(target) && IsPedAPlayer(target) && GetPlayerInvincible(rawTargetData)) {
        emitNet("icarus:my602oxd71pv", sender, "Godmode [C5]", false);
        CancelEvent();
    }
};