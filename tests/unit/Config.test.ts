import "../helper/CfxGlobals";
import "../helper/MockNatives";
import { Config } from "../../src/server/core/config/Config";
import { Configuration } from "../../src/server/Types";

const mockConfig: Configuration = {
	Permission: {
		bypassPermission: "test.bypass",
		useTxAdmin: true,
	},
	Telemetry: true,
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

describe("Config", () => {
	it("should return the value of a key in the provided object or any of its nested objects", () => {
		expect(Config.getValue(mockConfig, "DiscordWebhook")).toBe("https://example.webhook.com");
		expect(Config.getValue(mockConfig, "Telemetry")).toBe(true);
		expect(Config.getValue(mockConfig, "bypassPermission")).toBe("test.bypass");
		expect(Config.getValue(mockConfig, "useTxAdmin")).toBe(true);
		expect(Config.getValue(mockConfig, "TestModule")).toEqual({ enabled: true });
	});
	it("should throw error if the key is not found", () => {
		expect(() => Config.getValue(mockConfig, "non-existent")).toThrowError();
	});
});
