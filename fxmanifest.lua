fx_version "cerulean"

game "gta5"

author "EinS4ckZwiebeln"
description "Lightweight and modular server-side anticheat script."
version "2.1.3"

lua54 "yes"
use_experimental_fxv2_oal "yes"

client_script "dist/rpc_loader/RPCLoader.js"

server_script {
    "config.lua",
    "wrapper.lua",
    "dist/server/App.js"
}

dependencies {
    "/server:12911",
    "/onesync"
}
