import "../helper/CfxGlobals";
import "../helper/ResourceNatives";
import { Config } from "../../core/config/Config";
import { Configuration } from "../../Types";

const mockConfig: Configuration = {
	Permission: {
		bypassPermission: "test.bypass",
		useTxAdmin: true,
	},
	DiscordWebhook: "https://example.webhook.com",
	Modules: {
		TestModule: {
			enabled: true,
		},
	},
	BlacklistedWeapons: ["weapon"],
	BlacklistedEvents: {
		["resource"]: ["event"],
	},
	IllegalModels: ["model"],
};

jest.spyOn(Config, _config, '_config').mockReturnValue(() => mockConfig);
jest.spyOn(Config, "getConfig").mockImplementation(() => mockConfig);

describe("Config", () => {
	it("should return the value of a key in the provided object or any of its nested objects", () => {
		expect(Config.getValue(mockConfig, "bypassPermission")).toBe("test.bypass");
		expect(Config.getValue(mockConfig, "DiscordWebhook")).toBe("https://example.webhook.com");
	});
});
