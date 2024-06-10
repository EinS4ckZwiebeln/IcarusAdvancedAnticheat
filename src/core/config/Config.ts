import { singleton } from "tsyringe";
import { Configuration } from "../../Types";
import { Utility } from "../../util/Utility";

@singleton()
export class Config {
	private readonly _config: Configuration;

	constructor() {
		const exportedConfig: unknown = Utility.EXPORTS[Utility.RESOURCE_NAME].GetConfig();
		this._config = JSON.parse(JSON.stringify(exportedConfig));
	}

	public getConfig(): Configuration {
		return this._config;
	}

	/**
	 * Returns the value of the given key in the provided object.
	 * @param obj - The object to search for the key.
	 * @param key - The key to search for.
	 * @returns The value of the key if found, otherwise undefined.
	 */
	public static getValue<T>(obj: Record<string, unknown>, key: string): T {
		const result = this.findKey<T>(obj, key);
		if (result === undefined) {
			throw new Error(`Key '${key}' not found in configuration object`);
		}
		return result;
	}

	/**
	 * Finds a key in an object and returns its value.
	 * @param obj - The object to search for the key.
	 * @param key - The key to find in the object.
	 * @returns The value associated with the key, or undefined if the key is not found.
	 */
	private static findKey<T>(obj: Record<string, unknown>, key: string): T | undefined {
		if (key in obj) return obj[key] as T;
		for (let n of Object.values(obj)) {
			if (typeof n === "object" && n !== null) {
				let result = this.findKey<T>(n as Record<string, unknown>, key);
				if (result !== undefined) return result;
			}
		}
		return undefined;
	}
}
