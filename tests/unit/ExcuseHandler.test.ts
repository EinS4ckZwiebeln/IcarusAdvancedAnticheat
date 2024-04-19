import "../helper/CfxGlobals";
import "../helper/MockNatives";
import "../helper/MockConfig";
import { Logger } from "../../src/core/logger/Logger";
import { ExcuseHandler } from "../../src/core/handler/ExcuseHandler";

Logger.init();
describe("ExcuseHandler", () => {
	beforeEach(() => {
		jest.useFakeTimers();
	});
	afterEach(() => {
		ExcuseHandler["_excusedPlayers"].clear();
		jest.useRealTimers();
	});
	it("should excuse a player", () => {
		const source = 1;
		const timeout = 1000;
		ExcuseHandler["addExcuse"](source, timeout);
		expect(ExcuseHandler.isExcused(source)).toBeTruthy();
	});
	it("should not excuse a player after timeout", () => {
		const source = 1;
		const timeout = 500;
		ExcuseHandler["addExcuse"](source, timeout);
		jest.advanceTimersByTime(1000);
		expect(ExcuseHandler.isExcused(source)).toBeFalsy();
	});
	it("should excuse a player from a module", () => {
		const source = 1;
		const timeout = 1000;
		const module = "TestModule";
		ExcuseHandler["addExcuse"](source, timeout, { module });
		expect(ExcuseHandler.isExcused(source, module)).toBeTruthy();
	});
	it("should remove excuse from a player", () => {
		const source = 1;
		const timeout = 1000;
		ExcuseHandler["addExcuse"](source, timeout);
		ExcuseHandler["removeExcuse"](source);
		expect(ExcuseHandler.isExcused(source)).toBeFalsy();
	});
	it("should remove excuse from a player for a module", () => {
		const source = 1;
		const timeout = 1000;
		const module = "TestModule";
		ExcuseHandler["addExcuse"](source, timeout, { module });
		ExcuseHandler["removeExcuse"](source, module);
		expect(ExcuseHandler.isExcused(source, module)).toBeFalsy();
	});
});
