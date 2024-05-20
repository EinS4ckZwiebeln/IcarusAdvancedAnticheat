import { Configuration } from "../Types";
import { Config } from "./config/Config";
import { Logger } from "./logger/Logger";
import { Module } from "./Module";

export class ModuleLoader {
	private static readonly _modules: Map<string, Module> = new Map<string, Module>();
	private static readonly _unloadedModules: Map<string, Module> = new Map<string, Module>();
	private static readonly _config: Configuration = Config.getConfig();

	constructor() {
		throw new Error("ModuleLoader is a static class cannot be instantiated");
	}

	/**
	 * Loads a module into the module loader.
	 * @param module The module to be loaded.
	 * @returns void
	 * @throws Error if the module is already loaded or if config is missing.
	 */
	public static loadModule(module: Module): void {
		const name = module.name;
		// Prevent loading the same module twice
		if (this._modules.has(name)) {
			throw new Error(`Module ${name} is already loaded`);
		} else if (this._unloadedModules.has(name)) {
			this._unloadedModules.delete(name);
		}
		if (this.isModuleEnabled(name)) {
			module.onLoad();
			module.setTick();
			this._modules.set(name, module);
			Logger.debug(`Module ${name} loaded successfully`);
		}
	}

	/**
	 * Unloads a module from the module loader.
	 * @param module - The module to unload.
	 */
	public static unloadModule(module: Module): void {
		module.onUnload();
		module.removeTick();
		this._modules.delete(module.name);
		this._unloadedModules.set(module.name, module);
		Logger.debug(`Module ${module.name} unloaded successfully`);
	}

	/**
	 * Returns if module is enabled in the configuration.
	 * @param name - The name of the module.
	 */
	private static isModuleEnabled(name: string): boolean {
		const enabled = this._config.Modules[name].enabled;
		// Ensure module has configuration set up
		if (enabled === false) {
			Logger.debug(`Module ${name} is disabled in the config`);
		} else if (enabled === undefined) {
			throw new Error(`Module ${name} is missing 'enabled' property in the config file`);
		}
		return enabled;
	}

	/**
	 * Returns the module with the specified name, if it exists.
	 * @param moduleName The name of the module to retrieve.
	 * @returns The module with the specified name, or undefined if it does not exist.
	 */
	public static getModule(moduleName: string): Module | undefined {
		return this._modules.get(moduleName);
	}

	/**
	 * Returns the unloaded module with the specified name, if it exists.
	 * @param moduleName The name of the module to retrieve.
	 * @returns The unloaded module with the specified name, or undefined if it does not exist.
	 */
	public static getUnloadedModule(moduleName: string): Module | undefined {
		return this._unloadedModules.get(moduleName);
	}

	/**
	 * Returns an array of all loaded modules.
	 * @returns {Module[]} An array of all loaded modules.
	 */
	public static getModules(): Module[] {
		return Array.from(this._modules.values());
	}
}
