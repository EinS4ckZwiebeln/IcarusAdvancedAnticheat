import "../../helper/CfxGlobals";
import "../../helper/MockNatives";
import "../../helper/MockConfig";
import { ModuleLoader } from "../../../src/core/ModuleLoader";
import { Logger } from "../../../src/core/logger/Logger";
import { UnloadModuleCommand } from "../../../src/commands/UnloadModuleCommand";

Logger.init();
describe("UnloadModuleCommand", () => {
	it("should unload a module successfully", async () => {
		const moduleName = "TestModule";
		const command = new UnloadModuleCommand();
		const module = { name: moduleName };
		ModuleLoader.getModule = jest.fn().mockReturnValue(module);
		ModuleLoader.unloadModule = jest.fn();
		await command.onExecute(1, [moduleName]);
		expect(ModuleLoader.getModule).toHaveBeenCalledWith(moduleName);
		expect(ModuleLoader.unloadModule).toHaveBeenCalledWith(module);
	});
	it("should handle module not found", async () => {
		const moduleName = "NonExistentModule";
		const command = new UnloadModuleCommand();
		ModuleLoader.getModule = jest.fn().mockReturnValue(undefined);
		command["writeToChat"] = jest.fn();
		await command.onExecute(1, [moduleName]);
		expect(ModuleLoader.getModule).toHaveBeenCalledWith(moduleName);
		expect(command["writeToChat"]).toHaveBeenCalledWith(1, expect.any(String));
	});
	it("should handle unloading failure", async () => {
		const moduleName = "TestModule";
		const command = new UnloadModuleCommand();
		const module = { name: moduleName };
		ModuleLoader.getModule = jest.fn().mockReturnValue(module);
		ModuleLoader.unloadModule = jest.fn().mockImplementation(() => {
			throw new Error("Failed to load module");
		});
		command["writeToChat"] = jest.fn();
		await command.onExecute(1, [moduleName]);
		expect(ModuleLoader.getModule).toHaveBeenCalledWith(moduleName);
		expect(ModuleLoader.unloadModule).toHaveBeenCalledWith(module);
		expect(command["writeToChat"]).toHaveBeenCalledWith(1, expect.any(String));
	});
});
