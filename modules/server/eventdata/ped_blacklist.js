const hashedModels = hashify(serverConfig.Modules.PedBlacklist.playerModels);

module.exports = (data) => {
    const source = data.player;
    if (source < 1) { return; }

    const ped = GetPlayerPed(source);
    const model = GetEntityModel(ped);

    if (hashedModels.includes(model) && model != 0) {
        emit("icarus:my602oxd71pv", source, "Illegal Player Ped [C1]", false, { pedHash: model });
    }
};