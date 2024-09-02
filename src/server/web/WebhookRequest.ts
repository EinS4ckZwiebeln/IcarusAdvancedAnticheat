import FormData from "form-data";
import axios from "axios";
import fs from "fs";
import { Logger } from "../core/logger/Logger";
import { WebhookPayload } from "../Types";

/**
 * Represents a webhook request.
 */
export class WebhookRequest {
	private readonly _form: FormData = new FormData();
	private readonly _filePath: string = "";

	/**
	 * Initializes a new instance of the WebhookRequest class.
	 * @param payload The payload to send in the request.
	 * @param filePath The path to a file to include in the request.
	 */
	constructor(payload: WebhookPayload, filePath?: string) {
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
		const response = await axios.post(url, this._form);
		if (response.status !== 200) {
			Logger.debug(`Failed to post webhook request: ${response.status}`);
		} else {
			Logger.debug("Successfully posted webhook request");
		}
	}
}
