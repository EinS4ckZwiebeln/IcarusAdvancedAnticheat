# Icarus Advanced Anticheat
Icarus is a brand-new work in progress anticheat solution for your FiveM role-playing server. It offers many unique detections and a great variety of checks to catch cheaters. Currently, Icarus is still in an alpha state, so don't expect a silver bullet from this. False positives or bugs may occur, but giving this a shot might be worth it to you. Issues and pull requests are always appreciated!

### Features
| Client | Server | Other |
|--------|--------|---------|
| Anti NoClip | Anti Aimbot | Heartbeat |
| Anti DUI | Anti ClearTasks | Regex Filters |
| Anti FreeCam | Anti EntityCreate | No VPN |
| Anti PickUp | Anti Explosions | Honeypots |
| Anti Godmode | Anti Godmode | Event Scrambler |
| Anti Injection | Anti WeaponRange |  |
| Anti Speed | Anti GiveWeapon |  |
| Anti SuperJump | Anti RemoveWeapon |  |
| Anti VehicleTP | Anti IllegalPeds |  |
| Anti Vision | Anti Particles |  |
| Anti Explosives | Anti Weapons |  |
| Anti ResourceStopper | Anti IllegalDamage |  |
| Anti Spectate | Anti WeaponModifier |  |
| Anti TinyPed |  |  |
| Anti Ragdoll |  |  |

### Installation
1. Clone or download this repository.

2. Extract contents into your `/resources/` directory and ensure dependencies.

3. Read and adjust all configuration files carefully. 

### Permission Setup
Following ace permission allows selected players to bypass the anticheat detections and checks.

| icarus.bypass |
|---------------|

1. Add the permission to the group you want to have bypass perms.

``` add_ace group.<yourgroup> icarus.bypass allow  ```

2. Add the according player license to previous chosen group.

``` add_principal identifier.license:<yourlicense> group.<yourgroup>  ```

### Banning
Many anticheats come with custom ban-systems or databases. Icarus avoids such systems to improve compatibility and to steer clear of bloated code. To use Icarus properly it is necessary to add your own ban logic to the script. This can be done in the server confuguration file.

```lua 
function issueBan(source, reason)
  -- Your own ban logic goes here.
  -- EXAMPLE: TriggerEvent("EasyAdmin:banPlayer", source, reason, 1044463300)
end
```

### Dependencies
| Onesync | FXServer | Screenshot-basic |
|---------|----------|------------------|
| Required | 5181+ | Optional |

### Exports
These exports can be used in order to create a temporary soft-bypass for a given player. Let's say some script of yours modifies the player in such a way that it causes severe false-positives. To avoid this behavior, you can ignore the player by adding an excuse right before the problematic code via following exports.
```lua 
exports[<resource_name>]:<function>(param1, param2, ...)
```
| Function | Parameters | Type |
|---------|----------|------------------|
| AddExcuseForPlayer | source: int; timeout: int | Server |
| RemoveExcuseFromPlayer | source: int | Server |
```lua
-- Player won't be able to trigger any detections for 1000ms.
exports["IcarusAdvancedAnticheat"]:AddExcuseForPlayer(source, 1000)

-- Player won't be able to trigger any detections until his excuse is removed.
exports["IcarusAdvancedAnticheat"]:AddExcuseForPlayer(source, -1)

-- Player can now trigger various detections again.
exports["IcarusAdvancedAnticheat"]:RemoveExcuseFromPlayer(source)
```
