const Delay = (ms) => new Promise(res => setTimeout(res, ms));
const curName = GetCurrentResourceName();
const currentVersion = GetResourceMetadata(curName, "version", 0);

function GetCleanPlayerIdentifier(source, type) {
    const id = GetPlayerIdentifierByType(source, type);
    return typeof id != "string" ? `${type}:unknownlicense` : id;
}

function constructEmbed(source, reason, data, fileName) {
    return [{
        color: "8421631",
        title: `Icarus Anticheat v${currentVersion}`,
        fields: [
            {
                name: "Violation",
                value: reason,
                inline: false
            },
            {
                name: "Optional Data",
                value: data,
                inline: false
            },
            {
                name: "Name",
                value: GetPlayerName(source),
                inline: false
            },
            {
                name: "IP",
                value: GetCleanPlayerIdentifier(source, "ip"),
                inline: false
            },
            {
                name: "Steam",
                value: GetCleanPlayerIdentifier(source, "steam"),
                inline: false
            },
            {
                name: "Discord",
                value: GetCleanPlayerIdentifier(source, "discord"),
                inline: false
            },
            {
                name: "FiveM",
                value: GetCleanPlayerIdentifier(source, "license"),
                inline: false
            }
        ],
        image: {
            url: `attachment://${fileName}`
        },
        footer: {
            text: "Icarus Data Collector"
        }
    }]
}