const Delay = (ms) => new Promise(res => setTimeout(res, ms));
const curName = GetCurrentResourceName();
const currentVersion = GetResourceMetadata(curName, "version", 0);

const meleeWeapons = [-1569615261, -1716189206, 1737195953, 1317494643, -1786099057, -2067956739, 1141786504, -102323637, -1834847097, -102973651, -656458692, -581044007, -1951375401, -538741184, -1810795771, 419712736, -853065399];

const aoeWeapons = [911657153, 1198879012, -1568386805, -1312131151, 2138347493, 1834241177, 1672152130, 1305664598, 125959754, -1813897027, 741814745, -1420407917, -1600701090, 615608432, 101631238, 883325847, 1233104067, -37975472, -1169823560];

const softWeapons = [911657153, 1198879012, 1233104067, 600439132, 126349499, -37975472, 101631238];

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

function isMeleeWeapon(hash) {
    return meleeWeapons.includes(hash);
}

function isAoeWeapon(hash) {
    return aoeWeapons.includes(hash);
}

function isSoftWeapon(hash) {
    return softWeapons.includes(hash);
}

function hashify(array) {
    let hashed = [];
    for (let str of array) {
        hashed.push(GetHashKey(str));
    }
    return hashed;
}