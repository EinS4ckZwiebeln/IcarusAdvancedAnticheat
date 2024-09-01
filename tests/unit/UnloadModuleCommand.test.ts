import "../helper/CfxGlobals";
import "../helper/MockNatives";
import "../helper/MockConfig";
import { ModuleLoader } from "../../src/server/core/ModuleLoader";
import { Logger } from "../../src/server/core/logger/Logger";
import { UnloadModuleCommand } from "../../src/server/commands/UnloadModuleCommand";
import { container } from "tsyringe";
import { Utility } from "../../src/server/util/Utility";

Logger.init();
// @ts-ignore
Utility.EXPORTS = jest.fn();
const moduleLoader = container.resolve(ModuleLoader);

describe("UnloadModuleCommand", () => {
	it("should unload a module successfully", async () => {
		const moduleName = "TestModule";
		const command = new UnloadModuleCommand();
		const module = { name: moduleName };
		moduleLoader.getModule = jest.fn().mockReturnValue(module);
		moduleLoader.unloadModule = jest.fn();
		await command.onExecute(1, [moduleName]);
		expect(moduleLoader.getModule).toHaveBeenCalledWith(moduleName);
		expect(moduleLoader.unloadModule).toHaveBeenCalledWith(module);
	});
	it("should handle module not found", async () => {
		const moduleName = "NonExistentModule";
		const command = new UnloadModuleCommand();
		moduleLoader.getModule = jest.fn().mockReturnValue(undefined);
		command["writeToChat"] = jest.fn();
		await command.onExecute(1, [moduleName]);
		expect(moduleLoader.getModule).toHaveBeenCalledWith(moduleName);
		expect(command["writeToChat"]).toHaveBeenCalledWith(1, expect.any(String));
	});
	it("should handle unloading failure", async () => {
		const moduleName = "TestModule";
		const command = new UnloadModuleCommand();
		const module = { name: moduleName };
		moduleLoader.getModule = jest.fn().mockReturnValue(module);
		moduleLoader.unloadModule = jest.fn().mockImplementation(() => {
			throw new Error("Failed to load module");
		});
		command["writeToChat"] = jest.fn();
		await command.onExecute(1, [moduleName]);
		expect(moduleLoader.getModule).toHaveBeenCalledWith(moduleName);
		expect(moduleLoader.unloadModule).toHaveBeenCalledWith(module);
		expect(command["writeToChat"]).toHaveBeenCalledWith(1, expect.any(String));
	});
});
