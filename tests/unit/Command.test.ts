import "../helper/CfxGlobals";
import "../helper/MockNatives";
import "../helper/MockConfig";
import { Parameter } from "../../src/server/Types";
import { Logger } from "../../src/server/core/logger/Logger";
import { Command } from "../../src/server/core/Command";

Logger.init();
const parameters: Parameter[] = [
	{ name: "param1", help: "help1" },
	{ name: "param2", help: "help2" },
];
class TestCommand extends Command {
	constructor() {
		super("test-command", "This is a test command", parameters);
	}
	public onExecute = jest.fn();
}

describe("Command", () => {
	it("should have correct name, description, and parameters", () => {
		const command = new TestCommand();
		expect(command.name).toBe("test-command");
		expect(command.description).toBe("This is a test command");
		expect(command.parameters).toEqual(parameters);
	});
	it("should write to chat", () => {
		global.emitNet = jest.fn();
		const command = new TestCommand();
		const source = 0;
		const message = "message";
		command["writeToChat"](0, message);
		expect(emitNet).toBeCalledWith("chat:addMessage", source, { args: [message] });
	});
});
