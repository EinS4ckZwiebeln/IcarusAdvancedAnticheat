const hashedWeapons = hashify(serverConfig.BlacklistedWeapons);

module.exports = (sender, data) => {
    const weaponHash = data.weaponType;
    if (hashedWeapons.includes(weaponHash)) {
        emitNet("icarus:my602oxd71pv", sender, "Illegal Weapon Damage [C1]", false, { weapon: weaponHash });
        CancelEvent();
    }
};