import fetch from "node-fetch";
import FormData from "form-data";
import fs from "fs";
import { Logger } from "../logger/Logger";
/**
 * Represents a webhook request.
 */
export class WebhookRequest {
	private _form: FormData = new FormData();
	private _filePath: string = "";

	/**
	 * Initializes a new instance of the WebhookRequest class.
	 * @param payload The payload to send in the request.
	 * @param filePath The path to a file to include in the request.
	 */
	constructor(payload: object, filePath?: string) {
		if (filePath) {
			this._filePath = filePath;
			this._form.append("file0", fs.readFileSync(this._filePath), this._filePath);
		}
		this._form.append("payload_json", JSON.stringify(payload));
	}

	/**
	 * Sends a POST request to the specified URL with the form data.
	 * @param url - The URL to send the request to.
	 * @returns A Promise that resolves when the request is complete.
	 */
	public async post(url: string): Promise<void> {
		await fetch(url, {
			method: "POST",
			body: this._form,
		});
		Logger.debug(`Posted webhook request to ${url}`);

		if (this._filePath.length > 0) {
			fs.unlink(this._filePath, (err) => {
				if (err) Logger.error(err.message);
			});
		}
	}
}
