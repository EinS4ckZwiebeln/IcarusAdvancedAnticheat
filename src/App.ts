import axios from "axios";

import { ModuleLoader } from "./core/ModuleLoader";
import { WebhookRequest } from "./web/WebhookRequest";
import { UpdateEmbed } from "./web/UpdateEmbed";
import { Config } from "./core/config/Config";
import { Logger } from "./core/logger/Logger";
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
import { LoadModuleCommand } from "./commands/LoadModuleCommand";
import { UnloadModuleCommand } from "./commands/UnloadModuleCommand";
import { FireModule } from "./modules/FireModule";
import { Release } from "./Types";
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
		this.checkForUnsafeConvars();
		this.checkForUpdates();
	}

	/**
	 * Registers the modules.
	 */
	private registerModules(): void {
		// Register modules here
		ModuleLoader.loadModule(new DeferralsModule());
		ModuleLoader.loadModule(new EntityCreateModule());
		ModuleLoader.loadModule(new ClearTaskModule());
		ModuleLoader.loadModule(new GiveWeaponModule());
		ModuleLoader.loadModule(new RemoveWeaponModule());
		ModuleLoader.loadModule(new ExplosionFilterModule());
		ModuleLoader.loadModule(new TazerModule());
		ModuleLoader.loadModule(new WeaponBlacklistModule());
		ModuleLoader.loadModule(new PedBlacklistModule());
		ModuleLoader.loadModule(new AimbotModule());
		ModuleLoader.loadModule(new GodmodeModule());
		ModuleLoader.loadModule(new SuperJumpModule());
		ModuleLoader.loadModule(new WeaponModifierModule());
		ModuleLoader.loadModule(new ParticlesModule());
		ModuleLoader.loadModule(new ChatProfanityModule());
		ModuleLoader.loadModule(new StartProjectileModule());
		ModuleLoader.loadModule(new NoClipModule());
		ModuleLoader.loadModule(new EventBlacklistModule());
		ModuleLoader.loadModule(new FireModule());
		Logger.debug("Finished loading modules");
	}

	/**
	 * Registers the commands.
	 */
	private registerCommands(): void {
		// Register commands here
		CommandLoader.registerCommand(new LoadModuleCommand());
		CommandLoader.registerCommand(new UnloadModuleCommand());
		CommandLoader.registerCommand(new ScreenshotCommand());
		CommandLoader.registerCommand(new WipeEntitiesCommand());
		// Register corresponding chat suggestions
		CommandLoader.registerChatSuggestions();
		Logger.debug("Finished registering commands");
	}

	/**
	 * Checks for unsafe convars and logs a warning if they are not set to the recommended values.
	 */
	private async checkForUnsafeConvars(): Promise<void> {
		const convars = [
			{ name: "onesync", recommendedValue: "on" },
			{ name: "sv_scriptHookAllowed", recommendedValue: "false" },
			{ name: "sv_enableNetworkedPhoneExplosions", recommendedValue: "false" },
			{ name: "sv_enableNetworkedSounds", recommendedValue: "false" },
			{ name: "sv_filterRequestControl", recommendedValue: "4" },
		];

		convars.forEach((convar) => {
			const convarValue = GetConvar(convar.name, "null");
			if (convarValue !== "null" && convarValue != convar.recommendedValue) {
				console.log(
					`^3[WARNING] Convar '${convar.name}' is not set to the recommended value of '${convar.recommendedValue}' and could be abused by malicious actors.^0`
				);
				Logger.debug(
					`Convar '${convar.name}' is not set to the recommended value of '${convar.recommendedValue}'`
				);
			}
		});
	}

	/**
	 * Checks for updates.
	 */
	private async checkForUpdates(): Promise<void> {
		try {
			Logger.debug("Checking for updates ...");
			const response = await axios.get(
				"https://api.github.com/repos/EinS4ckZwiebeln/IcarusAdvancedAnticheat/releases",
				{
					method: "GET",
					headers: {
						"User-Agent": "request",
					},
				}
			);
			if (response.status !== 200) {
				Logger.error(`Failed to fetch latest release from github: ${response.status}`);
				return;
			}

			const latestRelease: Release = (await response.data)[0];
			const remoteVersion: string = latestRelease?.name?.toString().slice(1); // Remove the 'v' char in the version string
			// Does an alpha numeric comparison of version strings
			const isOutdated: boolean =
				remoteVersion.localeCompare(Utility.CURRENT_VERSION, undefined, {
					numeric: true,
					sensitivity: "base",
				}) > 0;

			if (isOutdated && !latestRelease.prerelease) {
				const request = new WebhookRequest({
					username: "Icarus",
					embeds: new UpdateEmbed(remoteVersion).embed,
				});
				// Ensure webhook is actually configured
				const webhook: string = Config.getConfig().DiscordWebhook;
				if (webhook && webhook.length > 0) request.post(webhook);

				console.log(
					`^3This version of Icarus is outdated. Please update to the latest version!\nLatest Version: ${remoteVersion} | Current Version: ${Utility.CURRENT_VERSION}^0`
				);
				Logger.debug("This version is outdated, please consider updating!");
			} else {
				Logger.debug("No Updates found. Version is up to date!");
			}
		} catch (err: unknown) {
			if (!(err instanceof Error)) return;
			Logger.error(err.message);
		}
	}
}

// Program entry point
new App();
