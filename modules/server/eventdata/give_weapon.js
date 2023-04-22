module.exports = (source, data) => {
    const entity = NetworkGetEntityFromNetworkId(data.pedId);
    if (DoesEntityExist(entity)) {
        const owner = NetworkGetEntityOwner(entity);
        if (source != owner) {
            emitNet("icarus:my602oxd71pv", sender, "Give Weapon [C1]", false);
            CancelEvent();
        }
    }
};