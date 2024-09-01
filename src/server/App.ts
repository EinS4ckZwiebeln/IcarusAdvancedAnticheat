import "reflect-metadata";
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
import { FoldModule } from "./modules/FoldModule";
import { container, injectable } from "tsyringe";

/**
 * Represents the main application class.
 */
@injectable()
class App {
	constructor(
		private readonly _config: Config,
		private readonly _moduleLoader: ModuleLoader,
		private readonly _commandLoader: CommandLoader
	) {
		Logger.debug(`Starting Icarus v${Utility.CURRENT_VERSION} ...`);
		this.registerModules();
		this.registerCommands();
		this.checkForUnsafeConvars();
		this.checkForUpdates();
		this.dumpConfig();
	}

	/**
	 * Dumps the configuration by logging a JSON representation of the config object.
	 */
	private async dumpConfig(): Promise<void> {
		const config = this._config.getConfig();
		const dump = {
			Modules: config.Modules,
			Permission: config.Permission,
		};
		Logger.debug(`Config: ${JSON.stringify(dump)}`);
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
		this._moduleLoader.loadModule(new EventBlacklistModule());
		this._moduleLoader.loadModule(new FireModule());
		this._moduleLoader.loadModule(new FoldModule());
		Logger.debug("Finished loading modules");
	}

	/**
	 * Registers the commands.
	 */
	private registerCommands(): void {
		// Register commands here
		this._commandLoader.registerCommand(new LoadModuleCommand());
		this._commandLoader.registerCommand(new UnloadModuleCommand());
		this._commandLoader.registerCommand(new ScreenshotCommand());
		this._commandLoader.registerCommand(new WipeEntitiesCommand());
		// Register corresponding chat suggestions
		this._commandLoader.registerChatSuggestions();
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
			{ name: "sv_enableNetworkedScriptEntityStates", recommendedValue: "false" },
			{ name: "sv_filterRequestControl", recommendedValue: "4" },
		];

		convars.forEach((convar) => {
			const convarValue = GetConvar(convar.name, "null");
			if (convarValue !== "null" && convarValue != convar.recommendedValue) {
				console.log(
					`^3[WARNING] ConVar '${convar.name}' is not set to the recommended value of '${convar.recommendedValue}' and could be abused by malicious actors.^0`
				);
				Logger.debug(`Convar '${convar.name}' is not set to the recommended value of '${convar.recommendedValue}'`);
			}
		});
	}

	/**
	 * Checks for updates.
	 */
	private async checkForUpdates(): Promise<void> {
		try {
			Logger.debug("Checking for updates ...");
			const response = await axios.get("https://api.github.com/repos/EinS4ckZwiebeln/IcarusAdvancedAnticheat/releases", {
				method: "GET",
				headers: {
					"User-Agent": "request",
				},
			});
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
				const webhook: string = this._config.getConfig().DiscordWebhook;
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
Logger.init();
new App(container.resolve(Config), container.resolve(ModuleLoader), container.resolve(CommandLoader));
