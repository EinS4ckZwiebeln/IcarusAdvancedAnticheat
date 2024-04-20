import "../helper/CfxGlobals";
import "../helper/MockNatives";
import "../helper/MockConfig";
import { CommandLoader } from "../../src/core/CommandLoader";
import { Parameter } from "../../src/Types";
import { Logger } from "../../src/core/logger/Logger";

Logger.init();
const parameters: Parameter[] = [
	{ name: "param1", help: "help1" },
	{ name: "param2", help: "help2" },
];
const command = {
	name: "test-command",
	description: "This is a test command",
	parameters: parameters,
	onExecute: jest.fn(),
};

describe("CommandLoader", () => {
	afterAll(() => {
		CommandLoader["_chatSuggestions"].length = 0;
	});
	it("should add chat suggestion", () => {
		CommandLoader.registerCommand(command);
		expect(CommandLoader["_chatSuggestions"]).toEqual([
			{
				command: command.name,
				description: command.description,
				parameters: command.parameters,
			},
		]);
	});
	it("should register command", () => {
		global.RegisterCommand = jest.fn();
		CommandLoader.registerCommand(command);
		expect(RegisterCommand).toBeCalledWith(command.name, expect.any(Function), false);
	});
	it("should call onExecute", () => {
		global.RegisterCommand = jest.fn();
		CommandLoader.registerCommand(command);
		// @ts-ignore
		const handler = RegisterCommand.mock.calls[0][1];
		handler(0, ["arg1", "arg2"]);
		expect(command.onExecute).toBeCalledWith(0, ["arg1", "arg2"]);
	});
});
