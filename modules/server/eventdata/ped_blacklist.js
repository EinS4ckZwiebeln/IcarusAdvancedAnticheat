const hashedModels = new Set(hashify(serverConfig.Modules.PedBlacklist.playerModels));

module.exports = (data) => {
    const source = data.player;
    if (source < 1) { return; }

    const ped = GetPlayerPed(source);
    const model = GetEntityModel(ped);

    if (hashedModels.has(model) && model != 0) {
        emit("icarus:my602oxd71pv", source, "Illegal Player Ped [C1]", false, { pedHash: model });
    }
};