import "../helper/CfxGlobals";
import "../helper/MockNatives";
import "../helper/MockConfig";
import { ModuleLoader } from "../../src/core/ModuleLoader";
import { Logger } from "../../src/core/logger/Logger";
import { LoadModuleCommand } from "../../src/commands/LoadModuleCommand";

Logger.init();
describe("LoadModuleCommand", () => {
	it("should load a module successfully", async () => {
		const moduleName = "TestModule";
		const command = new LoadModuleCommand();
		const module = { name: moduleName };
		ModuleLoader.getModule = jest.fn().mockReturnValue(module);
		ModuleLoader.loadModule = jest.fn();
		await command.onExecute(1, [moduleName]);
		expect(ModuleLoader.getModule).toHaveBeenCalledWith(moduleName);
		expect(ModuleLoader.loadModule).toHaveBeenCalledWith(module);
	});
	it("should handle module not found", async () => {
		const moduleName = "NonExistentModule";
		const command = new LoadModuleCommand();
		ModuleLoader.getModule = jest.fn().mockReturnValue(undefined);
		command["writeToChat"] = jest.fn();
		await command.onExecute(1, [moduleName]);
		expect(ModuleLoader.getModule).toHaveBeenCalledWith(moduleName);
		expect(command["writeToChat"]).toHaveBeenCalledWith(1, expect.any(String));
	});
	it("should handle loading failure", async () => {
		const moduleName = "TestModule";
		const command = new LoadModuleCommand();
		const module = { name: moduleName };
		ModuleLoader.getModule = jest.fn().mockReturnValue(module);
		ModuleLoader.loadModule = jest.fn().mockImplementation(() => {
			throw new Error("Failed to load module");
		});
		command["writeToChat"] = jest.fn();
		await command.onExecute(1, [moduleName]);
		expect(ModuleLoader.getModule).toHaveBeenCalledWith(moduleName);
		expect(ModuleLoader.loadModule).toHaveBeenCalledWith(module);
		expect(command["writeToChat"]).toHaveBeenCalledWith(1, expect.any(String));
	});
});
