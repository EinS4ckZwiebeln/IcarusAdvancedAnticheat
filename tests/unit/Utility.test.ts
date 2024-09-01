import "../helper/CfxGlobals";
import "../helper/MockNatives";
import { Utility } from "../../src/server/util/Utility";

describe("Utility", () => {
	it("should have the correct number of degrees in one radian", () => {
		expect(Utility.RADIANS).toBeCloseTo(57.29577951308232);
	});
	it("should be null or empty", () => {
		expect(Utility.isNullOrEmtpy("text")).toBe(false);
		expect(Utility.isNullOrEmtpy("")).toBe(true);
	});
	it("should return correct distance without including Z coordinate", () => {
		expect(Utility.getDistance([0, 0, 0], [3, 4, 0])).toBe(5);
		expect(Utility.getDistance([1, 2, 0], [4, 6, 0])).toBe(5);
		expect(Utility.getDistance([0, 0, 0], [-3, -4, 0])).toBe(5);
	});
	it("should return correct distance including Z coordinate", () => {
		expect(Utility.getDistance([0, 0, 0], [3, 4, 5], true)).toBeCloseTo(7.0710678118654755);
		expect(Utility.getDistance([1, 2, 3], [4, 6, 9], true)).toBeCloseTo(7.810249675906654);
		expect(Utility.getDistance([0, 0, 0], [-3, -4, -5], true)).toBeCloseTo(7.0710678118654755);
	});
	it("should delay execution for the specified time", async () => {
		const startTime = Date.now();
		const delayTime = 1000;
		await Utility.Delay(delayTime);
		expect(Date.now() - startTime).toBeGreaterThanOrEqual(delayTime);
	});
});
