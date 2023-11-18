import crypto from "crypto";
import { Logger } from "../core/logger/Logger";
import { Utility } from "../util/Utility";

/**
 * A class for taking a screenshot in FiveM and returning its name and path.
 */
export class Screenshot {
	/**
	 * Creates a new instance of the Screenshot class.
	 * @param source The source of the screenshot.
	 * @param callback The function to call when the screenshot is taken.
	 */
	constructor(source: number, callback: Function) {
		const name: string = crypto.randomBytes(12).toString("hex");
		const path: string = `cache/${name}.jpg`;
		Utility.EXPORTS["screenshot-basic"].requestClientScreenshot(
			source,
			{
				fileName: path,
			},
			(err: any, _: string) => {
				if (err) Logger.error(err.message);
				callback(name, path);
			}
		);
	}
}
