# Icarus Advanced Anticheat

Icarus is a brand-new work in progress anticheat solution for your FiveM role-playing server. It offers many unique detections and a great variety of checks to catch cheaters. Currently, Icarus is still in an alpha state, so don't expect a silver bullet from this. False positives or bugs may occur, but giving this a shot might be worth it to you. Issues and pull requests are always appreciated!

### Features

| Detections           | Other              |
| -------------------- | ------------------ |
| Anti Aimbot          | Anti VPN           |
| Anti Clear Tasks     | Anti Illegal Names |
| Anti Entity Creation | Anti Bad Words     |
| Anti Explosions      |                    |
| Anti GiveWeapon      |                    |
| Anti RemoveWeapon    |                    |
| Anti Godmode         |                    |
| Anti Particles       |                    |
| Anti Illegal Peds    |                    |
| Anti Super Jump      |                    |
| Anti Tazer Mods      |                    |
| Anti Illegal Weapons |                    |
| Anti Damage Modifier |                    |

### Installation

1. Download the latest release for this repository.

2. Extract contents into your `/resources/` directory and ensure dependencies are installed.

3. Read and adjust all configuration files carefully.

### Permission Setup

Following ace permission allows selected players to bypass the anticheat detections and checks.

| icarus.bypass |
| ------------- |

1. Add the permission to the group you want to have bypass perms.

`add_ace group.<yourgroup> icarus.bypass allow `

2. Add the according player license to previous chosen group.

`add_principal identifier.license:<yourlicense> group.<yourgroup> `

### Banning

Many anticheats come with custom ban-systems or databases. Icarus avoids such systems to improve compatibility and to steer clear of bloated code. To use Icarus properly it is necessary to add your own ban logic to the script. This can be done in the confuguration file.

```lua
-- << config.lua >>
-- This export gets called when a cheater has been caught.
exports("BanPlayer", function (source, reason)
    -- Your own banning logic goes here!
end)
```

### Dependencies

| FXServer | OneSync  | Yarn     | Screenshot-basic |
| -------- | -------- | -------- | ---------------- |
| 5181+    | Required | Required | Optional         |

### Exports

These exports can be used in order to create a temporary soft-bypass for a given player. Let's say some script of yours modifies the player in such a way that it causes severe false-positives. To avoid this behavior, you can ignore the player by adding an excuse right before the problematic code via following exports.

```lua
exports[<resource_name>]:<function>(param1, param2, ...)
```

| Function               | Parameters                                  | Retval  | Type   |
| ---------------------- | ------------------------------------------- | ------- | ------ |
| AddExcuseForPlayer     | source: int; timeout: int, module?: string; | void    | Server |
| RemoveExcuseFromPlayer | source: int; module?: string;               | void    | Server |
| IsPlayerExcused        | source: int; module?: string;               | boolean | Server |

```lua
-- Player won't be able to trigger any detections for 1000ms.
exports["IcarusAdvancedAnticheat"]:AddExcuseForPlayer(source, 1000)
exports["IcarusAdvancedAnticheat"]:AddExcuseForPlayer(source, 1000, "TestModule") -- Excuse individual module

-- Player won't be able to trigger any detections until his excuse is manually removed.
exports["IcarusAdvancedAnticheat"]:AddExcuseForPlayer(source, -1)

-- Player can now trigger all detections again.
exports["IcarusAdvancedAnticheat"]:RemoveExcuseFromPlayer(source)
exports["IcarusAdvancedAnticheat"]:RemoveExcuseFromPlayer(source, "TestModule") -- Remove excuse for individual module

-- Verify if player is excused for everything or indivual module.
exports["IcarusAdvancedAnticheat"]:IsPlayerExcused(source)
exports["IcarusAdvancedAnticheat"]:IsPlayerExcused(source, "TestModule")
```
