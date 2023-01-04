const https = require("https");

const currentVersion = GetResourceMetadata(GetCurrentResourceName(), "version", 0);

const getLatestGithubRelease = (user, repo) => {
    const options = {
        hostname: "api.github.com",
        port: 443,
        path: `/repos/${user}/${repo}/releases`,
        headers: {
            "User-Agent": "request",
        },
    };
    let release;
    return new Promise((resolve, reject) => {
        const request = https.request(options, (res) => {
            let response = "";
            res.on("data", (d) => {
                response += d;
            });
            res.on("end", () => {
                const releases = JSON.parse(response);
                if (releases.length > 0) {
                    release = releases[0].name;
                    resolve(release);
                } else {
                    reject(new Error("No releases found"));
                }
            });
        });
        request.end();
    });
};

function checkForUpdates() {
    const user = "EinS4ckZwiebeln";
    const repo = "IcarusAdvancedAnticheat";
    getLatestGithubRelease(user, repo).then((release) => {
        release = release.slice(1);
        if (release != currentVersion) {
            console.log("This version of Icarus is outdated. Please update to the latest version!\nLatest Version: " + release + " | Current Version: v" + currentVersion + "\nhttps://github.com/EinS4ckZwiebeln/IcarusAdvancedAnticheat/releases\n");
        }
    }).catch((err) => {
        console.error(err);
    });
}

checkForUpdates();