const fs = require("fs");

const version = process.env.TGT_RELEASE_VERSION;
const newVersion = version.replace("v", "");

const manifestFilePath = "fxmanifest.lua";
const manifestFileContent = fs.readFileSync(manifestFilePath, { encoding: "utf8" });
/**
 * The updated file content with the version replaced.
 * @type {string}
 */
const versionRegex = /\bversion\s+(.*)$/gm;
const newFileContent = manifestFileContent.replace(versionRegex, `version "${newVersion}"`);

fs.writeFileSync(manifestFilePath, newFileContent);
