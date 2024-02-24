# Export Documentation

## Available Exports

These exports can be employed to establish a temporary soft-bypass for a specific player. Suppose a script of yours alters the player in a manner that triggers significant false-positives. To mitigate this issue, you can exempt the player by incorporating an excuse just before the problematic code using the provided exports.

| Function               | Parameters                                  | Retval  | Type   |
| ---------------------- | ------------------------------------------- | ------- | ------ |
| AddExcuseForPlayer     | source: int; timeout: int, module?: string; | void    | Server |
| RemoveExcuseFromPlayer | source: int; module?: string;               | void    | Server |
| IsPlayerExcused        | source: int; module?: string;               | boolean | Server |

## Examples

By using the `AddExcuseForPlayer` function, you can temporarily exempt a player from triggering any detections for a specified duration. In the code snippet below, the player is excused for 1 second:

```lua
exports["Icarus"]:AddExcuseForPlayer(source, 1000)
```

If you wish, you can also excuse the player for individual modules, by passing the module name as an optional parameter. For a comprehensive list of all modules, please refer to the [documentation](https://github.com/EinS4ckZwiebeln/IcarusAdvancedAnticheat/blob/docs/docs/MODULES.md).

```lua
exports["Icarus"]:AddExcuseForPlayer(source, 1000, "ExampleModule")
```

To exempt a player from triggering any detections indefinitely, you can use the following code:

```lua
exports["Icarus"]:AddExcuseForPlayer(source, -1)
```

If you want to remove an excuse that was set indefinitely, or simply wish to remove it ahead of time, you'll need to manually remove it as follows:

```lua
exports["Icarus"]:RemoveExcuseFromPlayer(source)
-- Removes the excuse for the specific module
exports["Icarus"]:RemoveExcuseFromPlayer(source, "ExampleModule")
```

Finally, if you want to verify whether a player is excused from everything or just an individual module, proceed as follows:

```lua
exports["Icarus"]:IsPlayerExcused(source)
-- Check if the player is excused for the specific module
exports["Icarus"]:IsPlayerExcused(source, "ExampleModule")
```
