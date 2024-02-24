# Contributing

First off, thank you for considering contributing to Icarus. It's people like you that make this project such a great tool.

## Where do I go from here?

If you've noticed a bug or have a feature request, make sure to check our [Issues](https://github.com/EinS4ckZwiebeln/IcarusAdvancedAnticheat/issues) if there's already an open issue addressing your concerns. If not, feel free to [open a new one](https://github.com/EinS4ckZwiebeln/IcarusAdvancedAnticheat/issues/new).

# For Developers

## Requirements

Before you start, make sure you have [Node.js](https://nodejs.org/en/download/current) and either npm or [yarn](https://classic.yarnpkg.com/lang/en/docs/install/#windows-stable) installed on your system.

## How to Build

To build the project, follow these steps:

1. Clone the repository to your local machine.
2. Navigate to the project directory.
3. Install the project dependencies by running `npm install` or `yarn install`.
4. To build the project, you can use either of the following commands:
    - `npm run build` for a one-time build.
    - `npm run watch` to continuously watch the project for changes and rebuild as necessary.

## Modifying and Adding Features

If you want to modify existing features, you should modify the corresponding module. If there isn't a module for the feature already you want to add, you should create an entirely new module.

```typescript
export class ExampleModule extends Module {

    public void onLoad() {
        // Executes when the module is loaded.
    }

    public void onUnload() {
        // Executes when the module is unloaded.
    }
}
```

When creating a new module, please ensure that the module is registered by the module loader in the `App.ts` file. Also, the new module must have an entry in the `config.lua` file with an `enabled = <boolean>` property. Otherwise the script won't run.

```typescript
// Add this below the other modules inside the App.ts file.
ModuleLoader.loadModule(new ExampleModule());
```

```lua
ExampleModule = {
    enabled = true
},
```
