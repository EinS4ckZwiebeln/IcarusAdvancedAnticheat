import "../helper/CfxGlobals";
import "../helper/MockNatives";
import "../helper/MockConfig";
import { Module } from "../../src/core/Module";
import { Logger } from "../../src/core/logger/Logger";
import { ModuleLoader } from "../../src/core/ModuleLoader";

Logger.init();
class TestModule extends Module {
	public onLoad(): void {}
	public onUnload(): void {}
}

describe("ModuleLoader", () => {
	afterEach(() => {
		ModuleLoader["_modules"].clear();
	});
	it("should load a module", () => {
		const module = new TestModule();
		expect(() => ModuleLoader.loadModule(module)).not.toThrow();
	});
	it("should unload a module", () => {
		const module = new TestModule();
		ModuleLoader.loadModule(module);
		expect(() => ModuleLoader.unloadModule(module)).not.toThrow();
	});
	it("should throw an error if the module is already loaded", () => {
		const module = new TestModule();
		ModuleLoader.loadModule(module);
		expect(() => ModuleLoader.loadModule(module)).toThrow("Module TestModule is already loaded");
	});
	it("should throw an error if the module is not in the config", () => {
		const module = new TestModule();
		jest.spyOn(module, "name", "get").mockReturnValue("NonExistentModule");
		expect(() => ModuleLoader.loadModule(module)).toThrow();
	});
	it("should call the load method once", () => {
		const module = new TestModule();
		const onLoad = jest.spyOn(module, "onLoad");
		ModuleLoader.loadModule(module);
		expect(onLoad).toHaveBeenCalledTimes(1);
	});
	it("should abort before the load method is invoked when module is disabled", () => {
		const module = new TestModule();
		jest.spyOn(module, "name", "get").mockReturnValue("TestModuleDisabled");
		const onLoad = jest.spyOn(module, "onLoad");
		ModuleLoader.loadModule(module);
		expect(onLoad).toHaveBeenCalledTimes(0);
	});
	it("should call the setTick method once", () => {
		const module = new TestModule();
		const setTick = jest.spyOn(module, "setTick");
		ModuleLoader.loadModule(module);
		expect(setTick).toHaveBeenCalledTimes(1);
	});
	it("should call the unload method once", () => {
		const module = new TestModule();
		const onUnload = jest.spyOn(module, "onUnload");
		ModuleLoader.loadModule(module);
		ModuleLoader.unloadModule(module);
		expect(onUnload).toHaveBeenCalledTimes(1);
	});
	it("should add the module to the module list", () => {
		const module = new TestModule();
		ModuleLoader.loadModule(module);
		expect(ModuleLoader["_modules"].size).toBe(1);
	});
	it("should remove the module from the module list", () => {
		const module = new TestModule();
		ModuleLoader.loadModule(module);
		ModuleLoader.unloadModule(module);
		expect(ModuleLoader["_modules"].size).toBe(0);
	});
	it("should get the correct module by name", () => {
		const module = new TestModule();
		ModuleLoader.loadModule(module);
		expect(ModuleLoader.getModule("TestModule")).toBe(module);
	});
	it("should return all modules in an array", () => {
		const module = new TestModule();
		ModuleLoader.loadModule(module);
		const modules = ModuleLoader.getModules();
		expect(modules).toContain(module);
		expect(modules.length).toBeDefined();
	});
	it("should return true for enabled module", () => {
		const module = new TestModule();
		const enabled = ModuleLoader["isModuleEnabled"](module.name);
		expect(enabled).toBe(true);
	});
	it("should return false for disabled module", () => {
		const module = new TestModule();
		jest.spyOn(module, "name", "get").mockReturnValue("TestModuleDisabled");
		const disabled = ModuleLoader["isModuleEnabled"](module.name);
		expect(disabled).toBe(false);
	});
});
