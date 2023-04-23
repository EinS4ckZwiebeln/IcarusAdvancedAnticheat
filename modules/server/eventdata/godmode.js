module.exports = (sender, data) => {
    const netId = data.hitGlobalId || data.hitGlobalIds[0];
    const target = NetworkGetEntityFromNetworkId(netId);

    if (DoesEntityExist(target) && IsPedAPlayer(target) && GetPlayerInvincible(netId)) {
        emit("icarus:my602oxd71pv", sender, "Godmode [C5]", false);
        CancelEvent();
    }
};