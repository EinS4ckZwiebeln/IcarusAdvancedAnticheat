## Sponsors

### 💖 FiveGuard

For a better paid anticheat check out: [store.fiveguard.ac](https://store.fiveguard.ac/).
Fiveguard is the best FiveM anticheat.

We are able to provide this free product because of help from [fiveguard.net](https://fiveguard.net/).

## Icarus Advanced Anticheat

Icarus is a robust and serversided anti-cheat solution designed for FiveM servers. With unique detections and a diverse range of checks, it's a comprehensive tool to catch cheaters. While occasional bugs or false positives may occur, your feedback through issues and pull requests is crucial to its refinement. Install Icarus today and experience a robust and dependable anti-cheat solution for your server.

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

2. Extract contents into your `/resources/` directory and ensure [dependencies](https://github.com/EinS4ckZwiebeln/IcarusAdvancedAnticheat?tab=readme-ov-file#dependencies) are installed.

3. Read and adjust all configuration files carefully.

### Permission Setup

Following ace permission allows selected players to bypass all anticheat detections and checks.
If wish to have a different permission string, a custom can be set in the configuration file.

| icarus.bypass |
| ------------- |

1. Add the permission to the group you want to have bypass perms.

```bash
add_ace group.<your_group> icarus.bypass allow
```

2. Add the according player license to previous chosen group.

```bash
add_principal identifier.license:<your_license> group.<your_group>
```

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

| FXServer | OneSync  | Screenshot-basic                                          |
| -------- | -------- | --------------------------------------------------------- |
| 7290+    | Required | [Optional](https://github.com/citizenfx/screenshot-basic) |

### Documentation

This section provides some additional resources to help you out, as well as ways to integrate the anticheat system into your own scripts.
The individual resources include details on how to contribute to the project, how to use the developer export API, and how to load and unload modules.

-   [Contributing to the project](https://github.com/EinS4ckZwiebeln/IcarusAdvancedAnticheat/blob/master/docs/CONTRIBUTING.md)
-   [Developer Export API](https://github.com/EinS4ckZwiebeln/IcarusAdvancedAnticheat/blob/master/docs/EXPORTS.md)
-   [Loading/Unloading Modules](https://github.com/EinS4ckZwiebeln/IcarusAdvancedAnticheat/blob/master/docs/MODULES.md)
