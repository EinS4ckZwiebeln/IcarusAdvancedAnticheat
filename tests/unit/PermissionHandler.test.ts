import "../helper/CfxGlobals";
import "../helper/MockNatives";
import "../helper/MockConfig";
import { Logger } from "../../src/core/logger/Logger";
import { PermissionHandler } from "../../src/core/handler/PermissionHandler";

Logger.init();
describe("PermissionHandler", () => {
	afterEach(() => {
		PermissionHandler["_permissions"].clear();
	});
	it("should return true if player has permission", () => {
		const source = 1;
		PermissionHandler["_permissions"].add(source);
		const hasPermission = PermissionHandler.hasPermission(source);
		expect(hasPermission).toBe(true);
	});
	it("should return false if player does not have permission", () => {
		const source = 2;
		const hasPermission = PermissionHandler.hasPermission(source);
		expect(hasPermission).toBe(false);
	});
	it("should return true if player has bypass permission", () => {
		const source = 0; // Zero will always have permission in tests
		const hasPermission = PermissionHandler.hasPermission(source);
		expect(hasPermission).toBe(true);
	});
	it("should return false if player does not have bypass permission", () => {
		const source = 1;
		const hasPermission = PermissionHandler.hasPermission(source);
		expect(hasPermission).toBe(false);
	});
});
