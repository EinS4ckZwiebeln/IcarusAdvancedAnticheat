fx_version "cerulean"

game "gta5"

author "NCRP Scripts"
description "Efficient, modular server-side anticheat script."
version "0.0.0"

lua54 "yes"
server_only "yes"

server_script {
    "config.lua",
    "wrapper.lua",
    "dist/app.js"
}

dependencies {
    "/server:7290", 
    "/onesync", 
    "yarn"
}
