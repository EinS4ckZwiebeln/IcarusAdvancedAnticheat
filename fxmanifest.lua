fx_version "cerulean"

game "gta5"

author "EinS4ckZwiebeln"
description "Efficient, modular server-side anticheat script."
version "2.0.6b"

lua54 "yes"
server_only "yes"

server_script {
    "config.lua",
    "wrapper.lua",
    "dist/app.js"
}

dependencies {
    "/server:7290", 
    "/onesync"
}
