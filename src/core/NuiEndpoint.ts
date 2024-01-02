import { ModuleData } from "../types/ModuleDataType";
import { Utility } from "../util/Utility";
import { ModuleType } from "../util/enum/ModuleType";
import { Module } from "./Module";
import { ModuleLoader } from "./ModuleLoader";
import { Statistics } from "./Statistics";
import { PermissionHandler } from "./handler/PermissionHandler";
import { Logger } from "./logger/Logger";
import os from "os";

export class NuiEndpoint {
	private static readonly _cpuModel = os.cpus()[0]?.model;
	private static readonly _platform = os.platform();
	private static _initModuleAmount: number = 0;

	public static init(): void {
		this._initModuleAmount = ModuleLoader.getModules().length;
		this.addNuiComEvents();
	}

	private static addNuiComEvents(): void {
		onNet("icarus:requestData", (pageName: string) => {
			if (!PermissionHandler.hasPermission(source)) return;
			const modules = ModuleLoader.getModules();
			const currentModulesAmount = modules.length;

			let dataRetval: any = {};
			dataRetval.version = Utility.CURRENT_VERSION;

			switch (pageName) {
				case "DASHBOARD":
					dataRetval.players = getPlayers().length;
					dataRetval.modulesAmount = currentModulesAmount;
					dataRetval.violations = Statistics.getSessionViolations();

					const weeklyViolations = Statistics.getWeekViolations();
					dataRetval.chartDays = weeklyViolations.days;
					dataRetval.chartValue = weeklyViolations.counts;

					const memoryData = process.memoryUsage();
					const allocatedMemory = Utility.formatMemoryUsage(memoryData.rss);
					dataRetval.nodeMemory = allocatedMemory;

					dataRetval.cpuModel = this._cpuModel;
					dataRetval.platform = this._platform;
					break;

				case "MODULES":
					const disabledAmount = ModuleLoader.getDisabledAmount();
					dataRetval.disabledModules = disabledAmount;

					const unloadedModulesAmount = Math.abs(this._initModuleAmount - currentModulesAmount);
					dataRetval.unloadedModules = unloadedModulesAmount;

					const activeModulesAmount = currentModulesAmount - unloadedModulesAmount;
					dataRetval.activeModules = activeModulesAmount;

					const moduleData: ModuleData[] = [];
					modules.forEach((module: Module) => {
						moduleData.push({
							name: module.name,
							type: module.isTicking ? ModuleType.TYPE_TICK : ModuleType.TYPE_EVENT,
							status: module.getStatus(),
						});
					});
					dataRetval.moduleData = moduleData;
					break;

				case "VIOLATIONS":
					break;
				default:
					return;
			}
			emitNet("icarus:receiveData", source, pageName, dataRetval);
		});

		onNet("icarus:reviveAll", () => {
			if (!PermissionHandler.hasPermission(source)) return;
			emitNet("icarus:reviveMyself", -1);
		});

		onNet("icarus:healAll", () => {
			if (!PermissionHandler.hasPermission(source)) return;
			emitNet("icarus:healMyself", -1);
		});

		onNet("icarus:reloadModules", () => {
			if (!PermissionHandler.hasPermission(source)) return;
			ModuleLoader.getModules().forEach(async (module: Module) => {
				try {
					module.onUnload();
					module.removeTick();
					// Wait brief moment to give module time to unload properly
					Utility.Delay(100);
					module.onLoad();
				} catch (err: any) {
					Logger.error(err);
				}
			});
		});
	}
}
