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

```bash
git clone https://github.com/EinS4ckZwiebeln/IcarusAdvancedAnticheat.git
```

2. Navigate to the project directory.

3. Install the project dependencies by running `npm install` or `yarn install`.

```bash
npm install
```

4. To build the project, you can use either of the following commands:

_For a one-time build._

```bash
npm run build
```

_To continuously watch the project for changes and rebuild as necessary (recommended)._

```bash
npm run watch
```

## Adding Modules

To alter existing features, modify the corresponding module. If no module exists for the feature you wish to add, create a new module entirely.

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

When creating a new module, please ensure that the module is registered by the module loader in the `App.ts` file. The new module also must have an entry in the `config.lua` file with an `enabled = <boolean>` property. Otherwise, the resource won't run.

```typescript
// Add this below the other modules inside the App.ts file.
ModuleLoader.loadModule(new ExampleModule());
```

```lua
ExampleModule = {
    enabled = true
},
```

## Subscribing to Events

In the `ExampleModule` class, you can see an example of how to subscribe and unsubscribe to events using the `EventHandler` class. The `subscribe` function allows you to register a callback function to be executed when a specific event occurs. The `unsubscribe` function removes the registered callback function from the event.

| Function    | Parameters                                                       | Retval |
| ----------- | ---------------------------------------------------------------- | ------ |
| subscribe   | eventName: string \| string[]; callback: Function \| Function[]; | void   |
| unsubscribe | eventName: string \| string[]; callback: Function \| Function[]; | void   |

Here is an example of subscribing and unsubscribing to the `entityCreating` event:

```typescript
export class ExampleModule extends Module {
    public void onLoad() {
        EventHandler.subscribe("entityCreating", this.onEvent.bind(this));
    }
    public void onUnload() {
        EventHandler.unsubscribe("entityCreating", this.onEvent.bind(this));
    }

    private void onEvent(entity: number) {
        console.log(`Creating: ${entity}`);
    }
}
```
