import "../helper/CfxGlobals";
import "../helper/MockNatives";
import "../helper/MockConfig";
import { Module } from "../../src/server/core/Module";
import { Logger } from "../../src/server/core/logger/Logger";
import { ModuleLoader } from "../../src/server/core/ModuleLoader";
import { container } from "tsyringe";
import { Utility } from "../../src/server/util/Utility";

Logger.init();
// @ts-ignore
Utility.EXPORTS = jest.fn();
const moduleLoader = container.resolve(ModuleLoader);

class TestModule extends Module {
	public onLoad(): void {}
	public onUnload(): void {}
}

describe("ModuleLoader", () => {
	afterEach(() => {
		moduleLoader["_modules"].clear();
	});
	it("should load a module", () => {
		const module = new TestModule();
		expect(() => moduleLoader.loadModule(module)).not.toThrow();
	});
	it("should unload a module", () => {
		const module = new TestModule();
		moduleLoader.loadModule(module);
		expect(() => moduleLoader.unloadModule(module)).not.toThrow();
	});
	it("should throw an error if the module is already loaded", () => {
		const module = new TestModule();
		moduleLoader.loadModule(module);
		expect(() => moduleLoader.loadModule(module)).toThrow("Module TestModule is already loaded");
	});
	it("should throw an error if the module is not in the config", () => {
		const module = new TestModule();
		jest.spyOn(module, "name", "get").mockReturnValue("NonExistentModule");
		expect(() => moduleLoader.loadModule(module)).toThrow();
	});
	it("should call the load method once", () => {
		const module = new TestModule();
		const onLoad = jest.spyOn(module, "onLoad");
		moduleLoader.loadModule(module);
		expect(onLoad).toHaveBeenCalledTimes(1);
	});
	it("should abort before the load method is invoked when module is disabled", () => {
		const module = new TestModule();
		jest.spyOn(module, "name", "get").mockReturnValue("TestModuleDisabled");
		const onLoad = jest.spyOn(module, "onLoad");
		moduleLoader.loadModule(module);
		expect(onLoad).toHaveBeenCalledTimes(0);
	});
	it("should call the setTick method once", () => {
		const module = new TestModule();
		const setTick = jest.spyOn(module, "setTick");
		moduleLoader.loadModule(module);
		expect(setTick).toHaveBeenCalledTimes(1);
	});
	it("should call the unload method once", () => {
		const module = new TestModule();
		const onUnload = jest.spyOn(module, "onUnload");
		moduleLoader.loadModule(module);
		moduleLoader.unloadModule(module);
		expect(onUnload).toHaveBeenCalledTimes(1);
	});
	it("should add the module to the module list", () => {
		const module = new TestModule();
		moduleLoader.loadModule(module);
		expect(moduleLoader["_modules"].size).toBe(1);
	});
	it("should remove the module from the module list", () => {
		const module = new TestModule();
		moduleLoader.loadModule(module);
		moduleLoader.unloadModule(module);
		expect(moduleLoader["_modules"].size).toBe(0);
	});
	it("should get the correct module by name", () => {
		const module = new TestModule();
		moduleLoader.loadModule(module);
		expect(moduleLoader.getModule("TestModule")).toBe(module);
	});
	it("should return all modules in an array", () => {
		const module = new TestModule();
		moduleLoader.loadModule(module);
		const modules = moduleLoader.getModules();
		expect(modules).toContain(module);
		expect(modules.length).toBeDefined();
	});
	it("should return true for enabled module", () => {
		const module = new TestModule();
		const enabled = moduleLoader["isModuleEnabled"](module.name);
		expect(enabled).toBe(true);
	});
	it("should return false for disabled module", () => {
		const module = new TestModule();
		jest.spyOn(module, "name", "get").mockReturnValue("TestModuleDisabled");
		const disabled = moduleLoader["isModuleEnabled"](module.name);
		expect(disabled).toBe(false);
	});
	it("should define the SetModuleState export", () => {
		expect(Utility.EXPORTS).toHaveBeenCalledWith("SetModuleState", expect.any(Function));
	});
});
