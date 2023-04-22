const hashedEntities = hashify(serverConfig.IllegalModels);

module.exports = (handle) => {
    if (!DoesEntityExist(handle)) { return; }
    const model = GetEntityModel(handle);
    if (hashedEntities.includes(model)) {
        DeleteEntity(handle);
        const owner = NetworkGetFirstEntityOwner(handle);
        if (owner != 0 && serverConfig.Modules.EntityCreate.banNetworkOwner) {
            emitNet("icarus:my602oxd71pv", owner, "Illegal Entity Model [C1]", false, {
                owner: owner,
                model: model
            });
        }
    }
};