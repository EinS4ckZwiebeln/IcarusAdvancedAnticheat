module.exports = (source, data) => {
    if (data.scale > 0 && data.scale > serverConfig.Modules.Particles.maxScale) {
        CancelEvent();
    }
    if (data.isOnEntity) {
        const owner = NetworkGetEntityOwner(NetworkGetEntityFromNetworkId(data.entityNetId));
        if (source == owner) { return; }
        emit("icarus:my602oxd71pv", source, "ptFxEvent [C1]", false, {
            source: source,
            entityNetId: entityNetId
        });
        CancelEvent();
    }
};