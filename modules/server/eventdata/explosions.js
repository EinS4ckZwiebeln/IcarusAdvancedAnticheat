const whitelistedExplosionTypes = new Set(serverConfig.Modules.ExplosionFilter.whitelistedExplosionTypes);

module.exports = (sender, data) => {
    if (!whitelistedExplosionTypes.has(data.explosionType)) {
        emit("icarus:my602oxd71pv", sender, "Explosion Event [C1]", false, {
            type: data.explosionType
        });
    } else if (data.damageScale > 1.0) {
        emit("icarus:my602oxd71pv", sender, "Explosion Event [C2]", false, {
            scale: data.damageScale
        });
    } else if (data.isInvisible) {
        emit("icarus:my602oxd71pv", sender, "Explosion Event [C3]", false, {
            invisible: data.isInvisible
        });
    }
};