import fs from "fs";
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
	public async request(): Promise<Screenshot> {
		return new Promise((resolve, reject) => {
			Utility.EXPORTS["screenshot-basic"].requestClientScreenshot(
				this._source,
				{
					fileName: this._filePath,
				},
				(err: unknown) => {
					if (err instanceof Error) {
						Logger.error(err.message);
						reject(err);
					} else {
						resolve({
							fileName: this._fileName,
							filePath: this._filePath,
						});
					}
				}
			);
		});
	}

	/**
	 * Dispose the ScreenshotRequest instance.
	 * If the _filePath property is not empty, it deletes the file from the file system.
	 */
	public dispose(): void {
		if (!(this._filePath.length > 0)) return;
		fs.unlink(`./${this._filePath}`, (err) => {
			if (err) Logger.error(err.message);
		});
	}
}
