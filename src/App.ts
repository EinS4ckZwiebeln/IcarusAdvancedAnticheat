import fetch from "node-fetch";

import { ModuleLoader } from "./core/ModuleLoader";
import { WebhookRequest } from "./web/WebhookRequest";
import { UpdateEmbed } from "./web/UpdateEmbed";
import { Config } from "./config/Config";
import { Logger } from "./logger/Logger";
import { Utility } from "./util/Utility";

import { ClearTaskModule } from "./modules/ClearTaskModule";
import { GiveWeaponModule } from "./modules/GiveWeaponModule";
import { RemoveWeaponModule } from "./modules/RemoveWeaponModule";
import { ExplosionFilterModule } from "./modules/ExplosionFilterModule";
import { TazerModule } from "./modules/TazerModule";
import { DeferralsModule } from "./modules/DeferralsModule";
import { AimbotModule } from "./modules/AimbotModule";
import { GodmodeModule } from "./modules/GodmodeModule";
import { SuperJumpModule } from "./modules/SuperJumpModule";
import { EntityCreateModule } from "./modules/EntityCreateModule";
import { PedBlacklistModule } from "./modules/PedBlacklistModule";
import { WeaponBlacklistModule } from "./modules/WeaponBlacklistModule";
import { WeaponModifierModule } from "./modules/WeaponModifierModule";
import { ParticlesModule } from "./modules/ParticlesModule";
import { ChatProfanityModule } from "./modules/ChatProfanityModule";
import { PermissionHandler } from "./core/handler/PermissionHandler";
import { ExcuseHandler } from "./core/handler/ExcuseHandler";
import { StartProjectileModule } from "./modules/StartProjectileModule";
import { NoClipModule } from "./modules/NoClipModule";
import { CommandLoader } from "./core/CommandLoader";
import { ScreenshotCommand } from "./commands/ScreenshotCommand";
import { WipeEntitiesCommand } from "./commands/WipeEntitiesCommand";
import { EventBlacklistModule } from "./modules/EventBlacklistModule";

/**
 * Represents the main application class.
 */
class App {
	constructor() {
		// Initialize the logger
		Logger.init();
		Logger.debug(`Starting Icarus v${Utility.CURRENT_VERSION} ...`);
		// Initialize the excuse handler
		ExcuseHandler.init();
		// Initialize the permission handler
		PermissionHandler.init();

		this.registerModules();
		this.registerCommands();
		this.checkForUpdates();
	}

	/**
	 * Registers the modules.
	 */
	private registerModules(): void {
		const moduleLoader = new ModuleLoader();
		// Register modules here
		moduleLoader.loadModule(new DeferralsModule());
		moduleLoader.loadModule(new EntityCreateModule());
		moduleLoader.loadModule(new ClearTaskModule());
		moduleLoader.loadModule(new GiveWeaponModule());
		moduleLoader.loadModule(new RemoveWeaponModule());
		moduleLoader.loadModule(new ExplosionFilterModule());
		moduleLoader.loadModule(new TazerModule());
		moduleLoader.loadModule(new WeaponBlacklistModule());
		moduleLoader.loadModule(new PedBlacklistModule());
		moduleLoader.loadModule(new AimbotModule());
		moduleLoader.loadModule(new GodmodeModule());
		moduleLoader.loadModule(new SuperJumpModule());
		moduleLoader.loadModule(new WeaponModifierModule());
		moduleLoader.loadModule(new ParticlesModule());
		moduleLoader.loadModule(new ChatProfanityModule());
		moduleLoader.loadModule(new StartProjectileModule());
		moduleLoader.loadModule(new NoClipModule());
		moduleLoader.loadModule(new EventBlacklistModule());
		Logger.debug("Finished loading modules");
	}

	/**
	 * Registers the commands.
	 */
	private registerCommands(): void {
		const commandLoader = new CommandLoader("icarus");
		// Register commands here
		commandLoader.registerCommand(new ScreenshotCommand());
		commandLoader.registerCommand(new WipeEntitiesCommand());
		Logger.debug("Finished registering commands");
	}

	/**
	 * Checks for updates.
	 */
	private async checkForUpdates(): Promise<void> {
		try {
			Logger.debug("Checking for updates ...");
			const response = await fetch("https://api.github.com/repos/EinS4ckZwiebeln/IcarusAdvancedAnticheat/releases", {
				method: "GET",
				headers: {
					"User-Agent": "request",
				},
			});

			if (!response.ok) {
				Logger.error(`Update HTTP error! Status: ${response.status}`);
				throw new Error(`Update HTTP error! Status: ${response.status}`);
			}

			const request: any = await response.json();
			const remoteVersion: string = request[0]?.name?.toString().slice(1);

			if (Utility.CURRENT_VERSION !== remoteVersion) {
				console.log(`^3This version of Icarus is outdated. Please update to the latest version!\nLatest Version: ${remoteVersion} | Current Version: ${Utility.CURRENT_VERSION}^0`);

				const webhook: string = Config.getConfig().DiscordWebhook;
				if (webhook && webhook.length > 0) {
					const request = new WebhookRequest({
						username: "Icarus",
						embeds: new UpdateEmbed(remoteVersion).embed,
					});
					request.post(webhook);
				}
				Logger.debug("Version is outdated!");
			}
		} catch (err: any) {
			Logger.error(err.message);
		}
	}
}

// Program entry point
new App();
