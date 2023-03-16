const payload = LoadResourceFile(curName, "payload/client_payload.lua");

onNet("playerJoining", async (source, _) => {
    let timeout = 0;
    while (GetPlayerPed(source) == 0 && timeout < 300) {
        await Delay(5000);
        timeout += 5;
    }
    emitNet("icarus:p728i449icr3", source, payload);
});

onNet("onResourceStart", async (rName) => {
    await Delay(3000); // Wait for the clients eventhandler to be registered.
    if (rName === curName) {
        for (let i = 1; i <= GetNumPlayerIndices(); i++) {
            emitNet("icarus:p728i449icr3", i, payload);
        }
    }
});