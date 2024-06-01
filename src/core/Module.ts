import { Config } from "./config/Config";
import { EventHandler } from "./handler/EventHandler";

export abstract class Module {
	private _tick: number = 0;
	private _isTicking: boolean = false;
	// Utility for onTick method
	protected readonly Delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

	constructor(private readonly _config?: Config, private readonly _eventHandler?: EventHandler) {}

	/**
	 * Returns the name of the module by splitting the constructor name at the first underscore.
	 * @returns {string} The name of the module.
	 */
	public get name(): string {
		return this.constructor.name.split("_")[0];
	}

	public get tick(): number {
		return this._tick;
	}

	protected get config(): Config {
		if (!this._config) {
			throw new Error("Module is missing injection for Config");
		}
		return this._config;
	}

	protected get eventHandler(): EventHandler {
		if (!this._eventHandler) {
			throw new Error("Module is missing injection for EventHandler");
		}
		return this._eventHandler;
	}

	/**
	 * Sets the tick for the module.
	 * @throws Error if the module is already ticking.
	 */
	public setTick(): void {
		if (this._isTicking) {
			throw new Error(`Module ${this.name} is already ticking`);
		}
		// Set the tick if the module implements it
		this._tick = setTick(() => this.onTick());
		this._isTicking = true;
	}

	/**
	 * Removes the current tick function from the module's tick list.
	 * @returns void
	 */
	public removeTick(): void {
		clearTick(this._tick);
		this._isTicking = false;
		this._tick = -1;
	}

	/**
	 * Asynchronous function that handles the module's tick event.
	 * If the module doesn't implement the tick event, it clears the tick.
	 * @returns A Promise that resolves when the tick event is handled.
	 */
	protected async onTick(): Promise<void> {
		clearTick(this._tick); // Clear the tick if the module doesn't implement it
	}

	// Called when the module is loaded
	public abstract onLoad(): void;

	// Called when the module is unloaded
	public abstract onUnload(): void;
}
