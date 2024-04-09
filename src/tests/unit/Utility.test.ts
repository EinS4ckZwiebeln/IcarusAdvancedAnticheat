import "../helper/CfxGlobals";
import "../helper/ResourceNatives";
import { Utility } from "../../util/Utility";

describe("Utility", () => {
	it("should have the correct number of degrees in one radian", () => {
		expect(Utility.RADIANS).toBeCloseTo(57.29577951308232);
	});
	it("should return correct hash value", () => {
		expect(Utility.joaat("WEAPON_RAYMINIGUN")).toBe(0xb62d1f67);
		expect(Utility.joaat("weapon_rayminigun")).toBe(0xb62d1f67);
	});
	it("should be null or empty", () => {
		expect(Utility.isNullOrEmtpy("text")).toBe(false);
		expect(Utility.isNullOrEmtpy("")).toBe(true);
	});
	it("should convert an array of strings to an array of their corresponding hash keys", () => {
		const input = ["foo", "bar", "foobar"];
		const expectedOutput = [596015325, 2151715081, 4182965735];
		const output = Utility.hashify(input);
		expect(output).toEqual(expectedOutput);
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
});
