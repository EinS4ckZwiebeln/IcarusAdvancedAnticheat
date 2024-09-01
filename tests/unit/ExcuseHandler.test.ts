import "../helper/CfxGlobals";
import "../helper/MockNatives";
import "../helper/MockConfig";
import { Logger } from "../../src/server/core/logger/Logger";
import { ExcuseHandler } from "../../src/server/core/handler/ExcuseHandler";
import { container } from "tsyringe";
import { Utility } from "../../src/server/util/Utility";

Logger.init();
// @ts-ignore
Utility.EXPORTS = jest.fn();
const excuseHandler = container.resolve(ExcuseHandler);

describe("ExcuseHandler", () => {
	beforeEach(() => {
		jest.useFakeTimers();
	});
	afterEach(() => {
		excuseHandler["_excusedPlayers"].clear();
		jest.useRealTimers();
	});
	it("should excuse a player", () => {
		const source = 1;
		const timeout = 1000;
		excuseHandler["addExcuse"](source, timeout);
		expect(excuseHandler.isExcused(source)).toBe(true);
	});
	it("should not excuse a player after timeout", () => {
		const source = 1;
		const timeout = 500;
		excuseHandler["addExcuse"](source, timeout);
		jest.advanceTimersByTime(1000);
		expect(excuseHandler.isExcused(source)).toBe(false);
	});
	it("should excuse a player from a module", () => {
		const source = 1;
		const timeout = 1000;
		const module = "TestModule";
		excuseHandler["addExcuse"](source, timeout, { module });
		expect(excuseHandler.isExcused(source, module)).toBe(true);
	});
	it("should remove excuse from a player", () => {
		const source = 1;
		const timeout = 1000;
		excuseHandler["addExcuse"](source, timeout);
		excuseHandler["removeExcuse"](source);
		expect(excuseHandler.isExcused(source)).toBe(false);
	});
	it("should remove excuse from a player for a module", () => {
		const source = 1;
		const timeout = 1000;
		const module = "TestModule";
		excuseHandler["addExcuse"](source, timeout, { module });
		excuseHandler["removeExcuse"](source, module);
		expect(excuseHandler.isExcused(source, module)).toBe(false);
	});
});
