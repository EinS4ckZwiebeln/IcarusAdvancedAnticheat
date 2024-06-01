import { singleton } from "tsyringe";
import { Configuration } from "../../Types";
import { Utility } from "../../util/Utility";

@singleton()
export class Config {
	private readonly _config: Configuration;

	constructor() {
		this._config = JSON.parse(JSON.stringify(Utility.EXPORTS[Utility.RESOURCE_NAME].GetConfig()));
	}

	public getConfig(): Configuration {
		return this._config;
	}

	/**
	 * Returns the value of the given key in the provided object or any of its nested objects.
	 * @param obj - The object to search for the key.
	 * @param key - The key to search for.
	 * @returns The value of the key if found, otherwise undefined.
	 */
	public getValue(obj: any, key: string): any {
		if (key in obj) return obj[key];
		for (let n of Object.values(obj)
			.filter(Boolean)
			.filter((v) => typeof v === "object")) {
			let found = this.getValue(n, key);
			if (found) return found;
		}
	}
}
