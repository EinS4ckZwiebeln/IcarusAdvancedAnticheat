import "./CfxGlobals";
import "./MockNatives";
import { Configuration } from "../../src/server/Types";
import { Config } from "../../src/server/core/config/Config";
import { container } from "tsyringe";

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

jest.spyOn(container.resolve(Config), "getConfig").mockImplementation(() => mockConfig);
