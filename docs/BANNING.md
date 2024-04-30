## Punishing Players with EasyAdmin, QBCore, and ESX

This README provides code snippets for banning/kicking players in three popular FiveM frameworks: QBCore, and ESX as well as in some standalone systems.

**Important Note:**

-   Ensure you have the necessary database connection libraries configured for QBCore.

### Kicking

If you simply wish to kick the player, you can accomplish this by using following snippet.

```lua
function Config.BanPlayer(source, reason)
    DropPlayer(source, "You have been banned for cheating")
end
```

### EasyAdmin

This example utilizes the `TriggerEvent` function to call the `EasyAdmin:banPlayer` event, passing the player's source and the reason for the ban.

```lua
function Config.BanPlayer(source, reason)
    TriggerEvent("EasyAdmin:banPlayer", source, "You have been banned for cheating", 1044463300)
end
```

### QBCore

This snippet requires adding `@oxmysql/lib/MySQL.lua` to `server_script` within your `fxmanifest.lua` file. It uses QBCore's functions to retrieve player information and inserts the data into a `bans` table within a MySQL database.

```lua
local QBCore = exports["qb-core"]:GetCoreObject()
function Config.BanPlayer(source, reason)
  MySQL.Async.insert("INSERT INTO bans (name, license, discord, ip, reason, expire, bannedby) VALUES (?, ?, ?, ?, ?, ?, ?)", {
    GetPlayerName(source),
    QBCore.Functions.GetIdentifier(source, "license"),
    QBCore.Functions.GetIdentifier(source, "discord"),
    QBCore.Functions.GetIdentifier(source, "ip"),
    "You have been banned for cheating",
    2145913200,
    "Anticheat (Icarus)"
  })
  DropPlayer(source, "You have been banned for cheating. Check our Discord for more information: " .. QBCore.Config.Server.discord)
end
```

### ESX: El Bwh

This example leverages ESX's `getSharedObject` function and `el_bwh:ban` event to ban a player. The code retrieves player information using `ESX.GetPlayerFromId` and sends the ban details through the event.

```lua
local ESX = exports["es_extended"]:getSharedObject()
function Config.BanPlayer(source, reason)
    TriggerEvent("el_bwh:ban", ESX.GetPlayerFromId(sender), ESX.GetPlayerFromId(target), "You have been banned for cheating", "2100/12/30 12:00", false)
end
```
