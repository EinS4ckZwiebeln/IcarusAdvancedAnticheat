if (serverConfig.Scrambler && GetResourceKvpInt("scrambled") != 1) {

    const path = GetResourcePath(curName);
    const glob = require("fast-glob");
    const content = glob.sync([`${path}/**/*.js`, `${path}/**/*.lua`, "!**/node_modules"], {
        ignore: `${path}/**/scrambler.js`,
        onlyFiles: true,
        dot: false
    });

    function getEvents() {
        let events = [];
        for (let i in content) {
            let file = fs.readFileSync(content[i], { encoding: "utf8" });
            const pattern = file.toString().matchAll(/icarus:\w*\b/g);

            const arr = [...pattern];
            for (let j in arr) {
                if (!events.includes(arr[j][0])) {
                    events.push(arr[j][0]);
                }
            }
        }
        return events;
    }

    function scramble() {
        const events = getEvents();
        for (let i in events) {
            let name = crypto.randomBytes(6).toString("hex");
            for (let j in content) {
                let file = fs.readFileSync(content[j], { encoding: "utf8" });
                file = file.toString().replaceAll(events[i], `icarus:${name}`);
                fs.writeFileSync(content[j], file);
            }
        }
    }

    scramble();
    SetResourceKvpInt("scrambled", 1);
}