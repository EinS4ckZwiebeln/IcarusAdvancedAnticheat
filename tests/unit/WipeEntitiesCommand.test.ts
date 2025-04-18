import "../helper/CfxGlobals";
import "../helper/MockNatives";
import "../helper/MockConfig";
import { Logger } from "../../src/server/core/logger/Logger";
import { WipeEntitiesCommand } from "../../src/server/commands/WipeEntitiesCommand";

Logger.init();
describe("WipeEntitiesCommand", () => {
	const DUMMY_ENTITIES = [127, 42, 13, 37];
	beforeEach(() => {
		global.DeleteEntity = jest.fn();
		global.GetGamePool = () => DUMMY_ENTITIES;
	});
	it("should remove all networked entities", async () => {
		const source = 1;
		const command = new WipeEntitiesCommand();
		command["writeToChat"] = jest.fn();
		await command.onExecute(source);
		expect(DeleteEntity).toHaveBeenCalledTimes(DUMMY_ENTITIES.length);
		expect(command["writeToChat"]).toHaveBeenCalledWith(source, expect.any(String));
	});
});
