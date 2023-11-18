import { Utility } from "../../util/Utility";
import { config } from "./ConfigType";

export class Config {
	private static _config: any = JSON.parse(JSON.stringify(Utility.EXPORTS[Utility.RESOURCE_NAME].GetConfig()));

	constructor() {
		throw new Error("Config is a static class and cannot be instantiated.");
	}

	public static getConfig(): config {
		return this._config;
	}

	/**
	 * Returns the value of the given key in the provided object or any of its nested objects.
	 * @param obj - The object to search for the key.
	 * @param key - The key to search for.
	 * @returns The value of the key if found, otherwise undefined.
	 */
	public static getValue(obj: any, key: string): any {
		if (key in obj) return obj[key];
		for (let n of Object.values(obj)
			.filter(Boolean)
			.filter((v) => typeof v === "object")) {
			let found = this.getValue(n, key);
			if (found) return found;
		}
	}
}
