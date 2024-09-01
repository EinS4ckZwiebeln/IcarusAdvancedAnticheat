import "../helper/CfxGlobals";
import "../helper/MockNatives";
import "../helper/MockConfig";
import { ModuleLoader } from "../../src/server/core/ModuleLoader";
import { Logger } from "../../src/server/core/logger/Logger";
import { LoadModuleCommand } from "../../src/server/commands/LoadModuleCommand";
import { container } from "tsyringe";
import { Utility } from "../../src/server/util/Utility";

Logger.init();
// @ts-ignore
Utility.EXPORTS = jest.fn();
const moduleLoader = container.resolve(ModuleLoader);

describe("LoadModuleCommand", () => {
	it("should load a module successfully", async () => {
		const moduleName = "TestModule";
		const command = new LoadModuleCommand();
		const module = { name: moduleName };
		moduleLoader.getModule = jest.fn().mockReturnValue(module);
		moduleLoader.loadModule = jest.fn();
		await command.onExecute(1, [moduleName]);
		expect(moduleLoader.getModule).toHaveBeenCalledWith(moduleName);
		expect(moduleLoader.loadModule).toHaveBeenCalledWith(module);
	});
	it("should handle module not found", async () => {
		const moduleName = "NonExistentModule";
		const command = new LoadModuleCommand();
		moduleLoader.getModule = jest.fn().mockReturnValue(undefined);
		command["writeToChat"] = jest.fn();
		await command.onExecute(1, [moduleName]);
		expect(moduleLoader.getModule).toHaveBeenCalledWith(moduleName);
		expect(command["writeToChat"]).toHaveBeenCalledWith(1, expect.any(String));
	});
	it("should handle loading failure", async () => {
		const moduleName = "TestModule";
		const command = new LoadModuleCommand();
		const module = { name: moduleName };
		moduleLoader.getModule = jest.fn().mockReturnValue(module);
		moduleLoader.loadModule = jest.fn().mockImplementation(() => {
			throw new Error("Failed to load module");
		});
		command["writeToChat"] = jest.fn();
		await command.onExecute(1, [moduleName]);
		expect(moduleLoader.getModule).toHaveBeenCalledWith(moduleName);
		expect(moduleLoader.loadModule).toHaveBeenCalledWith(module);
		expect(command["writeToChat"]).toHaveBeenCalledWith(1, expect.any(String));
	});
});
