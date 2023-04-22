module.exports = (sender, data) => {
    if (!serverConfig.Modules.ExplosionFilter.whitelistedExplosionTypes.includes(data.explosionType)) {
        emitNet("icarus:my602oxd71pv", sender, "Explosion Event [C1]", false, {
            type: data.explosionType
        });
    } else if (data.damageScale > 1.0) {
        emitNet("icarus:my602oxd71pv", sender, "Explosion Event [C2]", false, {
            scale: data.damageScale
        });
    } else if (data.isInvisible) {
        emitNet("icarus:my602oxd71pv", sender, "Explosion Event [C3]", false, {
            invisible: data.isInvisible
        });
    }
};