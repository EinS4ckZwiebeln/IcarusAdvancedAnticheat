import "../helper/CfxGlobals";
import "../helper/MockNatives";
import "../helper/MockConfig";
import { Logger } from "../../src/server/core/logger/Logger";
import { Config } from "../../src/server/core/config/Config";
import { ScreenshotCommand } from "../../src/server/commands/ScreenshotCommand";
import { Utility } from "../../src/server/util/Utility";
import { container } from "tsyringe";

Logger.init();
const config = container.resolve(Config);

describe("ScreenshotCommand", () => {
	Utility.EXPORTS["screenshot-basic"].requestClientScreenshot = jest.fn();
	it("should handle invalid target argument", async () => {
		global.GetResourceState = () => "started";
		const command = new ScreenshotCommand();
		await command.onExecute(1, ["invalid"]);
		expect(Utility.EXPORTS["screenshot-basic"].requestClientScreenshot).not.toHaveBeenCalled();
	});
	it("should handle missing screenshot-basic resource", async () => {
		global.GetResourceState = () => "stopped";
		const command = new ScreenshotCommand();
		await command.onExecute(1, ["1"]);
		expect(Utility.EXPORTS["screenshot-basic"].requestClientScreenshot).not.toHaveBeenCalled();
	});
	it("should handle missing discord webhook", async () => {
		global.GetResourceState = () => "started";
		const command = new ScreenshotCommand();
		const mockConfig = config.getConfig();
		mockConfig.DiscordWebhook = "";
		jest.spyOn(config, "getConfig").mockReturnValue(mockConfig);
		await command.onExecute(1, ["1"]);
		expect(Utility.EXPORTS["screenshot-basic"].requestClientScreenshot).not.toHaveBeenCalled();
	});
});
