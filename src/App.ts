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

/**
 * Represents the main application class.
 */
class App {
	private readonly _moduleLoader: ModuleLoader;

	constructor() {
		// Initialize the logger
		Logger.init();
		Logger.debug(`Starting Icarus v${Utility.CURRENT_VERSION} ...`);
		// Initialize the excuse handler
		ExcuseHandler.init();
		// Initialize the permission handler
		PermissionHandler.init();

		this._moduleLoader = new ModuleLoader();
		// Register modules
		this.registerModules();
		this.checkForUpdates();
	}

	/**
	 * Registers the modules.
	 */
	private registerModules(): void {
		// Register modules here
		this._moduleLoader.loadModule(new DeferralsModule());
		this._moduleLoader.loadModule(new EntityCreateModule());
		this._moduleLoader.loadModule(new ClearTaskModule());
		this._moduleLoader.loadModule(new GiveWeaponModule());
		this._moduleLoader.loadModule(new RemoveWeaponModule());
		this._moduleLoader.loadModule(new ExplosionFilterModule());
		this._moduleLoader.loadModule(new TazerModule());
		this._moduleLoader.loadModule(new WeaponBlacklistModule());
		this._moduleLoader.loadModule(new PedBlacklistModule());
		this._moduleLoader.loadModule(new AimbotModule());
		this._moduleLoader.loadModule(new GodmodeModule());
		this._moduleLoader.loadModule(new SuperJumpModule());
		this._moduleLoader.loadModule(new WeaponModifierModule());
		this._moduleLoader.loadModule(new ParticlesModule());
		this._moduleLoader.loadModule(new ChatProfanityModule());
		this._moduleLoader.loadModule(new StartProjectileModule());
		this._moduleLoader.loadModule(new NoClipModule());

		Logger.debug("Finished loading modules");
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
			const remoteVersion: string = request[0].name.toString().slice(1);

			if (Utility.CURRENT_VERSION !== remoteVersion) {
				console.log(`^3This version of Icarus is outdated. Please update to the latest version!\nLatest Version: ${remoteVersion} | Current Version: ${Utility.CURRENT_VERSION}^0`);

				const webhook: string = Config.getValue(Config.getConfig(), "DiscordWebhook");
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
