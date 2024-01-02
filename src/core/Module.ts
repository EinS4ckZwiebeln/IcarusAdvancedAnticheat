import { Config } from "./config/Config";
import { config } from "../types/ConfigType";
import { ModuleStatus } from "../util/enum/ModuleStatus";

export abstract class Module {
	private _tick: number = 0;
	private _isTicking: boolean = false;
	private _status: ModuleStatus = ModuleStatus.STATUS_UNKNOWN;

	private static readonly _config: config = Config.getConfig();
	// Utility for onTick method
	protected readonly Delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

	/**
	 * Returns the name of the module by splitting the constructor name at the first underscore.
	 * @returns {string} The name of the module.
	 */
	public get name(): string {
		return this.constructor.name.split("_")[0];
	}

	public get isTicking(): boolean {
		return this._isTicking;
	}

	protected get config(): config {
		return Module._config;
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
		this._isTicking = false;
	}

	public getStatus(): ModuleStatus {
		return this._status;
	}

	public setStatus(status: ModuleStatus): void {
		this._status = status;
	}

	// Called when the module is loaded
	public abstract onLoad(): void;

	// Called when the module is unloaded
	public abstract onUnload(): void;
}
