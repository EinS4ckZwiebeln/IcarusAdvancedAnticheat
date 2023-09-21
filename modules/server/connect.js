onNet("playerConnecting", async (playerName, _, deferrals) => {
    const ipv4 = GetPlayerIdentifierByType(source, "ip").slice(4);
    if (serverConfig.Modules.Connect.NameFilter.enabled || serverConfig.Modules.Connect.NoVPN.enabled) {
        deferrals.defer();
        await Delay(0);
    }

    if (serverConfig.Modules.Connect.NameFilter.enabled && !(/^[a-zA-Z0-9!@#\$%\^\&*\)\(+=._-]+$/g.test(playerName))) {
        deferrals.done(ServerConfig.Modules.Connect.NameFilter.rejectionMsg);
    }

    if (serverConfig.Modules.Connect.NoVPN.enabled) {
        try {
            const request = await axios.get(`https://blackbox.ipinfo.app/lookup/${ipv4}`, config);
            if (request.data[0] == "N") {
                deferrals.done();
            } else {
                deferrals.done(serverConfig.Modules.Connect.NoVPN.rejectionMsg);
            }
        } catch (err) {
            console.log(err);
        }
    } else {
        deferrals.done();
    }
});
