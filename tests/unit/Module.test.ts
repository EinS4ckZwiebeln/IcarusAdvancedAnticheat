import "../helper/CfxGlobals";
import "../helper/MockConfig";
import "../helper/MockNatives";
import { Module } from "../../src/server/core/Module";
import { Logger } from "../../src/server/core/logger/Logger";
import { Config } from "../../src/server/core/config/Config";
import { EventHandler } from "../../src/server/core/handler/EventHandler";
import { PermissionHandler } from "../../src/server/core/handler/PermissionHandler";

Logger.init();
class TestModule extends Module {
	public onLoad(): void {}
	public onUnload(): void {}
}

describe("Module", () => {
	it("should have a name", () => {
		const module = new TestModule();
		expect(module.name).toBe("TestModule");
	});
	it("should have a tick of 0 by default", () => {
		const module = new TestModule();
		expect(module.tick).toBe(0);
	});
	it("should have a tick", () => {
		const module = new TestModule();
		module.setTick();
		expect(module.tick).toBeGreaterThan(0);
		module.removeTick();
	});
	it("should remove the tick", () => {
		const module = new TestModule();
		module.setTick();
		expect(module.tick).toBeGreaterThan(0);
		module.removeTick();
		expect(module.tick).toBe(-1);
	});
	it("should throw an error if the module is already ticking", () => {
		const module = new TestModule();
		module.setTick();
		expect(() => module.setTick()).toThrow("Module TestModule is already ticking");
		module.removeTick();
	});
	it("should have dependencies defined", () => {
		const module = new TestModule();
		expect(module["config"]).toBeDefined();
		expect(module["config"]).toBeInstanceOf(Object);
		expect(module["config"]).not.toBeInstanceOf(Config);
		expect(module["eventHandler"]).toBeDefined();
		expect(module["eventHandler"]).toBeInstanceOf(EventHandler);
		expect(module["permissionHandler"]).toBeDefined();
		expect(module["permissionHandler"]).toBeInstanceOf(PermissionHandler);
	});
});
