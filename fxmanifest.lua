fx_version "cerulean"

game "gta5"

author "NCRP Scripts"
description "Server sided anti-cheat script that aims for modularity and efficiency."
version "2.0.0"

lua54 "yes"
server_only "yes"

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
