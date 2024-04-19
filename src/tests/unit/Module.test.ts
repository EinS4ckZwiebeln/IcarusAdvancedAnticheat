import "../helper/CfxGlobals";
import "../helper/MockNatives";
import { Module } from "../../core/Module";

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
		expect(module.tick).toBeGreaterThan(-1);
		module.removeTick();
	});
	it("should remove the tick", () => {
		const module = new TestModule();
		module.setTick();
		expect(module.tick).toBeGreaterThan(-1);
		module.removeTick();
		expect(module.tick).toBe(-1);
	});
	it("should throw an error if the module is already ticking", () => {
		const module = new TestModule();
		module.setTick();
		expect(() => module.setTick()).toThrow("Module TestModule is already ticking");
		module.removeTick();
	});
});
