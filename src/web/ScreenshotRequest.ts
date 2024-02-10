import crypto from "crypto";
import { Logger } from "../core/logger/Logger";
import { Utility } from "../util/Utility";
import { Screenshot } from "../Types";

/**
 * A class for taking a screenshot in FiveM and returning its name and path.
 */
export class ScreenshotRequest {
	private readonly _source: number;
	private readonly _fileName: string;
	private readonly _filePath: string;
	// Export call timeout millis
	private readonly TIME_OUT: number = 5000;

	/**
	 * Creates a new instance of the Screenshot class.
	 * @param source The source of the screenshot.
	 * @param callback The function to call when the screenshot is taken.
	 */
	constructor(source: number) {
		this._source = source;
		this._fileName = crypto.randomBytes(8).toString("hex");
		this._filePath = `cache/${this._fileName}.jpg`;
	}

	/**
	 * Triggers the screenshot-basic exports and returns screenshot data.
	 */
	public async request() {
		let screenshot: Screenshot | undefined;
		Utility.EXPORTS["screenshot-basic"].requestClientScreenshot(
			this._source,
			{
				fileName: this._filePath,
			},
			(err: unknown) => {
				if (err instanceof Error) Logger.error(err.message);
				screenshot = { fileName: this._fileName, filePath: this._filePath };
			}
		);
		// Regular promises don't seem to work with exports
		const timer = GetGameTimer();
		while (!screenshot) {
			if (GetGameTimer() - timer > this.TIME_OUT) {
				throw Error(`Timeout: Export call to screenshot-basic took longer than ${this.TIME_OUT} milliseconds`);
			}
			await Utility.Delay(0);
		}
		return screenshot;
	}
}
