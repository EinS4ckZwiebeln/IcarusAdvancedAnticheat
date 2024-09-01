import "../helper/CfxGlobals";
import "../helper/MockNatives";
import "../helper/MockConfig";
import { Logger } from "../../src/server/core/logger/Logger";
import { PermissionHandler } from "../../src/server/core/handler/PermissionHandler";
import { container } from "tsyringe";
import { Module } from "../../src/server/core/Module";

Logger.init();
const permissionHandler = container.resolve(PermissionHandler);

class TestModule extends Module {
	public onLoad(): void {}
	public onUnload(): void {}
}

describe("PermissionHandler", () => {
	const nativeCache = global.IsPlayerAceAllowed;
	afterEach(() => {
		permissionHandler["_permitted"].clear();
		global.IsPlayerAceAllowed = nativeCache;
	});
	it("should return true if player has permission", () => {
		const source = 1;
		permissionHandler["_permitted"].add(source);
		const hasPermission = permissionHandler.hasPermission(source);
		expect(hasPermission).toBe(true);
	});
	it("should return false if player does not have permission", () => {
		const source = 2;
		const hasPermission = permissionHandler.hasPermission(source);
		expect(hasPermission).toBe(false);
	});
	it("should return true if player has bypass permission", () => {
		const source = 0; // Zero will always have permission in tests
		const hasPermission = permissionHandler.hasPermission(source);
		expect(hasPermission).toBe(true);
	});
	it("should return false if player does not have bypass permission", () => {
		const source = 1;
		const hasPermission = permissionHandler.hasPermission(source);
		expect(hasPermission).toBe(false);
	});
	it("should return true even if source is wrong type", () => {
		const source = "0" as unknown as number;
		const hasPermission = permissionHandler.hasPermission(source);
		expect(hasPermission).toBe(true);
	});
	it("should return false even if source is wrong type", () => {
		const source = "1" as unknown as number;
		const hasPermission = permissionHandler.hasPermission(source);
		expect(hasPermission).toBe(false);
	});
	it("should return true if player has bypass ace permission", () => {
		const source = 1;
		const module = new TestModule();
		global.IsPlayerAceAllowed = (_: string, perm: string) => {
			if (perm === `icarus.${module.name.toLowerCase()}`) {
				return true;
			}
			return false;
		};
		const hasPermission = permissionHandler["hasModuleBypass"](source.toString(), module.name);
		expect(hasPermission).toBe(true);
	});
	it("should return false if player has no bypass ace permission", () => {
		const source = 1;
		const hasPermission = permissionHandler["hasModuleBypass"](source.toString(), "NonExistentModule");
		expect(hasPermission).toBe(false);
	});
	it("should return true if native returns number 1", () => {
		const source = 1;
		global.IsPlayerAceAllowed = () => 1 as unknown as boolean;
		const allowed = permissionHandler["isPlayerAceAllowedBool"](source.toString(), "test.permission");
		expect(allowed).toBe(true);
		expect(allowed).not.toBe(1);
		expect(typeof allowed).toBe("boolean");
	});
});
