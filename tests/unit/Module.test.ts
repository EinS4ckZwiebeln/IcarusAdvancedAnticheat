import "../helper/CfxGlobals";
import "../helper/MockNatives";
import { Module } from "../../src/core/Module";
import { container } from "tsyringe";
import { Config } from "../../src/core/config/Config";
import { EventHandler } from "../../src/core/handler/EventHandler";

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
	it("should throw an error if Config is missing", () => {
		const module = new TestModule();
		expect(() => module["config"]).toThrow();
		const moduleDI = new TestModule(container.resolve(Config), container.resolve(EventHandler));
		expect(() => moduleDI["config"]).not.toThrow();
	});
	it("should throw an error if EventHandler is missing", () => {
		const module = new TestModule();
		expect(() => module["eventHandler"]).toThrow();
		const moduleDI = new TestModule(container.resolve(Config), container.resolve(EventHandler));
		expect(() => moduleDI["config"]).not.toThrow();
	});
});
