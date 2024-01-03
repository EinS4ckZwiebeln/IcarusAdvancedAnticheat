import { Config } from "./config/Config";
import { config } from "../types/ConfigType";
import { ModuleStatus } from "../util/enum/ModuleStatus";
import { ModuleType } from "../util/enum/ModuleType";

export abstract class Module {
	private _tick: number = 0;
	private _isTicking: boolean = false;
	// Status and type will be set with meaningful values once the module gets loaded
	private _status: ModuleStatus = ModuleStatus.STATUS_UNKNOWN;
	private _type: ModuleType = ModuleType.TYPE_TICK; // All modules are treated as 'tick' until fully initialized

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
		// Set the tick and let the module decide if it implements it
		this._tick = setTick(async () => this.onTick());
		this._isTicking = true;
	}

	/**
	 * Removes the current tick function from the module's tick list.
	 * @returns void
	 */
	public removeTick(): void {
		clearTick(this._tick);
		this._isTicking = false;
	}

	/**
	 * Asynchronous function that handles the module's tick event.
	 * If the module doesn't implement the tick event, it clears the tick.
	 * @returns A Promise that resolves when the tick event is handled.
	 */
	protected async onTick(): Promise<void> {
		clearTick(this._tick); // Clear the tick if the module doesn't implement it
		this._isTicking = false;
		this._type = ModuleType.TYPE_EVENT;
	}

	public isTicking(): boolean {
		return this._isTicking;
	}

	public getStatus(): ModuleStatus {
		return this._status;
	}

	public setStatus(status: ModuleStatus): void {
		this._status = status;
	}

	public getType(): ModuleType {
		return this._type;
	}

	// Called when the module is loaded
	public abstract onLoad(): void;

	// Called when the module is unloaded
	public abstract onUnload(): void;
}
