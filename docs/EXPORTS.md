# Export Documentation

## Available Exports

| Function               | Parameters                                       | Retval  | Type   | Description                              |
| ---------------------- | ------------------------------------------------ | ------- | ------ | ---------------------------------------- |
| AddExcuseForPlayer     | source: int; duration: int, moduleName?: string; | void    | Server | Add a temporary bypass for a player      |
| RemoveExcuseFromPlayer | source: int; moduleName?: string;                | void    | Server | Remove the temporary bypass manually     |
| IsPlayerExcused        | source: int; moduleName?: string;                | boolean | Server | Check if a player has a temporary bypass |
| SetModuleState         | moduleName: string; state: boolean;              | void    | Server | Enable or disable a certain module       |

## Examples

By using the `AddExcuseForPlayer` function, you can temporarily exempt a player from triggering any detections for a specified duration. In the code snippet below, the player is excused for 1 second:

```lua
exports["Icarus"]:AddExcuseForPlayer(source, 1000)
```

If you wish, you can also excuse the player for individual modules, by passing the module name as an optional parameter. For a comprehensive list of all modules, please refer to the [documentation](https://github.com/EinS4ckZwiebeln/IcarusAdvancedAnticheat/blob/master/docs/MODULES.md).

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
