import "./CfxGlobals";
import "./MockNatives";
import { Configuration } from "../../src/Types";
import { Config } from "../../src/core/config/Config";

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
		TestModuleDisabled: {
			enabled: false,
		},
	},
	BlacklistedWeapons: ["weapon"],
	BlacklistedEvents: {
		["resource"]: ["event"],
	},
	IllegalModels: ["model"],
};

jest.spyOn(Config, "getConfig").mockImplementation(() => mockConfig);
