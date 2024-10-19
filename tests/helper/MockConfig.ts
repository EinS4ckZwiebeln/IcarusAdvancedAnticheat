import './CfxGlobals'
import './MockNatives'
import { container } from 'tsyringe'
import type { Configuration } from '../../src/server/Types'
import { Config } from '../../src/server/core/config/Config'

const mockConfig: Configuration = {
	Permission: {
		bypassPermission: 'test.bypass',
		useTxAdmin: true,
	},
	Telemetry: true,
	DiscordWebhook: 'https://example.webhook.com',
	Modules: {
		TestModule: {
			enabled: true,
		},
		TestModuleDisabled: {
			enabled: false,
		},
	},
	BlacklistedWeapons: ['weapon'],
	BlacklistedEvents: {
		resource: ['event'],
	},
	IllegalModels: ['model'],
}

jest.spyOn(container.resolve(Config), 'getConfig').mockImplementation(() => mockConfig)
