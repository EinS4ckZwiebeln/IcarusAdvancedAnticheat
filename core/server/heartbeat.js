const crypto = require("crypto");

var awaitedPlayers = [];
var token = crypto.randomBytes(16).toString("hex");

setInterval(() => {
    const players = getPlayers(); // Why native not capitalized?
    for (let i = 0; i < players.length; i++) {
        if (GetPlayerLastMsg(players[i]) < 65535 && GetPlayerPed(players[i]) != 0) { // Make sure player is connected and has loaded.
            emitNet("icarus:sxgt19l7681o", players[i], token);
            awaitedPlayers.push(players[i]);
        }
    }
    setTimeout(() => {
        for (let i = 0; i < awaitedPlayers.length; i++) {
            if (GetPlayerLastMsg(awaitedPlayers[i]) < 65535 && GetPlayerPing(awaitedPlayers[i]) < 1000) {
                emit("icarus:my602oxd71pv", awaitedPlayers[i], "Client failed to send heartbeat to the server", true);
            }
        }
        awaitedPlayers = [];
        token = crypto.randomBytes(16).toString("hex");
    }, 5000);
}, 25000);

onNet("icarus:08h20rh6jwf0", (clientToken) => {
    if (clientToken === token) {
        awaitedPlayers = awaitedPlayers.filter(entry => entry != source);
    }
});

onNet("playerDropped", (_) => {
    awaitedPlayers = awaitedPlayers.filter(entry => entry != source);
});