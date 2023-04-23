module.exports = (source, data) => {
    const entity = NetworkGetEntityFromNetworkId(data.pedId);
    if (DoesEntityExist(entity)) {
        const owner = NetworkGetEntityOwner(entity);
        if (source != owner) {
            emit("icarus:my602oxd71pv", sender, "Remove Weapon [C1]", false);
            CancelEvent();
        }
    }
};