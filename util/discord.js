const axios = require("axios");
const FormData = require("form-data");
const fs = require("fs");

const sendFileWithPayload = async (url, path, data) => {
    const form = new FormData();
    form.append("file0", fs.readFileSync(path), path);
    form.append("payload_json", JSON.stringify(data));
    await axios.post(url, form);
    fs.unlinkSync(path);
}

on("icarus:615p5f5ft0i7f17j", (url, path, data) => {
    if (url != "" && url != null) {
        try {
            sendFileWithPayload(url, path, data);
        } catch (err) {
            console.error(err);
        }
    } else {
        console.log("url cannot be null or an empty string");
    }
});