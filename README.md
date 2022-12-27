# Icarus Advanced Anticheat
Open source anticheat developed for FiveM.

Icarus is a brand-new work in progress anticheat solution for your FiveM role-playing server. It offers many unique detections and a great variety of checks to catch cheaters. Currently, Icarus is still in an alpha state, so don't expect a silver bullet from this. False positives or bugs may occur, but giving this a shot might be worth it to you. Issues and pull requests are always appreciated!

### Features
| Client | Server | Other |
|--------|--------|---------|
| Anti Aimbot | Anti Aimbot | Heartbeat |
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
| Anti NoClip |  |  |
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
Many anticheats come with custom ban-systems or databases. Icarus avoids such systems to improve compatibility and reduce code overload. To use Icarus properly it is necessary to add your own ban logic to the script. This can be done in the server confuguration file.

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
