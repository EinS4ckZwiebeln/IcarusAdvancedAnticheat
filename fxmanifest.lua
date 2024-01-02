fx_version "cerulean"

game "gta5"

author "NCRP Scripts"
description "Efficient, modular server-side anticheat script."
version "2.0.1"

lua54 "yes"
ui_page "ui/html/index.html"

files {
    "ui/html/index.html",
    "ui/css/style.css",
    "dist/ui.js",
}

client_script {
    "dist/nui.js"
}

server_script {
    "config.lua",
    "wrapper.lua",
    "dist/app.js"
}

dependencies {
    "/server:6497", 
    "/onesync", 
    "yarn"
}
