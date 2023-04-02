const serverConfig = exports[curName].GetServerConfig();

function banCheater(source, reason, kick, optional) {
    if (!optional) {
        optional = "No optional data received";
    } else if (serverConfig.debug) {
        console.log(JSON.stringify(optional));
        return;
    }
    const ignoredPlayers = exports[curName].GetExcusedPlayers();
    if (!IsPlayerAceAllowed(source, serverConfig.BypassAcePerm) && !ignoredPlayers.includes(source)) {
        if (kick) {
            DropPlayer(source, reason);
        } else {
            if (serverConfig.DiscordWebhook) {
                takeScreenshot(source, serverConfig.DiscordWebhook, {
                    reason: reason,
                    optional: optional
                });
            }
            setTimeout(() => {
                serverConfig.BanPlayer(source, reason);
            }, 500);
        }
    }
}

function takeScreenshot(source, url, data) {
    if (GetResourceState("screenshot-basic") === "started") {
        let name = crypto.randomBytes(8).toString("hex");
        exports["screenshot-basic"].requestClientScreenshot(source, {
            fileName: `cache/${name}.jpg`
        }, (err, fileName) => {
            if (err) { console.log(err); }
            emit("icarus:615p5f5ft0i7f17j", url, `./${fileName}`, {
                username: "Icarus",
                embeds: constructEmbed(source, data.reason, JSON.stringify(data.optional), `${name}.jpg`)
            })
        });
    }
}

onNet("icarus:417szjzm1goy", (reason, kick, optional) => {
    banCheater(source, reason, kick, optional);
});

onNet("icarus:my602oxd71pv", (target, reason, kick, optional) => {
    if (source) {
        banCheater(source, "Triggered Ban Event", false);
    } else {
        banCheater(target, reason, kick, optional);
    }
});