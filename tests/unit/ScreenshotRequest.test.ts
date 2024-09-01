import "../helper/CfxGlobals";
import "../helper/MockNatives";
import "../helper/MockConfig";
import { ScreenshotRequest } from "../../src/server/web/ScreenshotRequest";

describe("ScreenshotRequest", () => {
	it("should take serialize screenshot parameters correctly", async () => {
		const screenshotRequest = new ScreenshotRequest(1);
		expect(screenshotRequest["_fileName"]).toBeDefined();
		expect(screenshotRequest["_filePath"]).toBeDefined();
		expect(screenshotRequest["_fileName"]).toMatch(/[a-f0-9]{16}/);
		expect(screenshotRequest["_filePath"]).toMatch(/^cache\/[a-f0-9]{16}\.(jpg|png)$/);
	});
});
