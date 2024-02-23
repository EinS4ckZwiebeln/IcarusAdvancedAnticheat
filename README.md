## Sponsors

### 💖 FiveGuard

For a better paid anticheat check out: [store.fiveguard.ac](https://store.fiveguard.ac/).
Fiveguard is the best FiveM anticheat.

We are able to provide this free product because of help from [**fiveguard.net**](https://fiveguard.net/).

# Icarus Advanced Anticheat

Icarus is a robust anti-cheat solution designed for FiveM role-playing servers. With unique detections and a diverse range of checks, it's a comprehensive tool to catch cheaters. While occasional bugs or false positives may occur, your feedback through issues and pull requests is crucial to its refinement. Dive into Icarus, recognizing its evolving state, as it strives to be a powerful and reliable anti-cheat solution for your server.

### Features

| Detections           | Other           |
| -------------------- | --------------- |
| Anti Aimbot          | No VPN          |
| Anti Clear Tasks     | No Bad Words    |
| Anti Entity Creation | Forbidden Names |
| Anti Explosions      | Event Blacklist |
| Anti GiveWeapon      |                 |
| Anti RemoveWeapon    |                 |
| Anti Godmode         |                 |
| Anti Particles       |                 |
| Anti Illegal Peds    |                 |
| Anti Super Jump      |                 |
| Anti Tazer Mods      |                 |
| Anti Illegal Weapons |                 |
| Anti Damage Modifier |                 |
| Anti NoClip          |                 |
| Anti Projectiles     |                 |
| Anti Fire            |                 |
| Anti Fold            |                 |

### Installation

1. Download the [latest release](https://github.com/EinS4ckZwiebeln/IcarusAdvancedAnticheat/releases) for this repository.

2. Extract contents into your `/resources/` directory and ensure dependencies are installed.

3. Read and adjust all configuration files carefully.

### Permission Setup

Following ace permission allows selected players to bypass the anticheat detections and checks.

| icarus.bypass |
| ------------- |

1. Add the permission to the group you want to have bypass perms.

`add_ace group.<yourgroup> icarus.bypass allow`

2. Add the according player license to previous chosen group.

`add_principal identifier.license:<yourlicense> group.<yourgroup>`

### Banning

Numerous anticheat solutions are burdened by extensive ban systems and databases. Icarus, however, sidesteps these complexities to enhance compatibility and eliminate redundant code. To maximize the effectiveness of Icarus, it is imperative to integrate your own ban logic into the script, a process conveniently accomplished through the configuration file.

```lua
-- << config.lua >>
-- This function gets called when a cheater has been caught.
function Config.BanPlayer(source, reason)
    -- Your own banning logic goes here!
end
```

### Dependencies

| FXServer | OneSync  | Yarn     | Screenshot-basic                                          |
| -------- | -------- | -------- | --------------------------------------------------------- |
| 7290+    | Required | Required | [Optional](https://github.com/citizenfx/screenshot-basic) |
