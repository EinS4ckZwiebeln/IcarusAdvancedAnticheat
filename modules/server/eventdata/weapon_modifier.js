module.exports = (sender, _) => {
    const meleeMod = GetPlayerMeleeWeaponDamageModifier(sender);
    if (meleeMod > 1.0) {
        emit("icarus:my602oxd71pv", sender, "Weapon Modifier [C1]", false, {
            modifier: meleeMod
        });
        CancelEvent();
        return;
    }

    const damageMod = GetPlayerWeaponDamageModifier(sender);
    if (damageMod > 1.0) {
        emit("icarus:my602oxd71pv", sender, "Weapon Modifier [C2]", false, {
            modifier: damageMod
        });
        CancelEvent();
        return;
    }

    const defenseMod = GetPlayerWeaponDefenseModifier_2(sender);
    if (defenseMod > 1.0) {
        emit("icarus:my602oxd71pv", sender, "Weapon Modifier [C3]", false, {
            modifier: defenseMod
        });
        CancelEvent();
        return;
    }
};