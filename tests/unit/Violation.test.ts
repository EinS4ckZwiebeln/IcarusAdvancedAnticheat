import "../helper/CfxGlobals";
import "../helper/MockNatives";
import "../helper/MockConfig";
import { Logger } from "../../src/server/core/logger/Logger";
import { Violation } from "../../src/server/core/Violation";
import { Utility } from "../../src/server/util/Utility";

Logger.init();
describe("Violation", () => {
	it("should take a screenshot and abort", async () => {
		// @ts-ignore
		Utility.EXPORTS = jest.fn();
		const violation = new Violation(1, "TestViolation", "TestModule");
		// @ts-ignore
		Utility.EXPORTS = global.exports;
		// @ts-ignore
		const takeScreenshot = jest.spyOn(violation, "takeScreenshot");
		await violation.banPlayer();
		expect(takeScreenshot).toHaveBeenCalledTimes(1);
	});
	it("should not ban player if bypassed", async () => {
		// @ts-ignore
		jest.spyOn(Violation.prototype, "takeScreenshot").mockResolvedValue();
		const mockBanPlayer = jest.fn();
		Utility.EXPORTS[Utility.RESOURCE_NAME].BanPlayer = mockBanPlayer;
		// Zero will always have permission in tests
		// @ts-ignore
		Utility.EXPORTS = jest.fn();
		const violation = new Violation(0, "TestViolation", "TestModule");
		// @ts-ignore
		Utility.EXPORTS = global.exports;
		violation.banPlayer();
		expect(mockBanPlayer).toHaveBeenCalledTimes(0);
	});
	it("should ban player if not bypassed", async () => {
		// @ts-ignore
		jest.spyOn(Violation.prototype, "takeScreenshot").mockResolvedValue();
		const mockBanPlayer = jest.fn();
		Utility.EXPORTS[Utility.RESOURCE_NAME].BanPlayer = mockBanPlayer;
		// @ts-ignore
		Utility.EXPORTS = jest.fn();
		const violation = new Violation(1, "TestViolation", "TestModule");
		// @ts-ignore
		Utility.EXPORTS = global.exports;
		await violation.banPlayer();
		expect(mockBanPlayer).toHaveBeenCalledTimes(1);
	});
});
