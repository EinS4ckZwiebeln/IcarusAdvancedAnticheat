import "../helper/CfxGlobals";
import "../helper/ResourceNatives";
import { Configuration } from "../../Types";
import { Config } from "../../core/config/Config";

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
