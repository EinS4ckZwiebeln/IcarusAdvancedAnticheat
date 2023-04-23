const hashedWeapons = new Set(hashify(serverConfig.BlacklistedWeapons));

module.exports = (sender, data) => {
    const weaponHash = data.weaponType;
    if (hashedWeapons.has(weaponHash)) {
        emit("icarus:my602oxd71pv", sender, "Illegal Weapon Damage [C1]", false, { weapon: weaponHash });
        CancelEvent();
    }
};