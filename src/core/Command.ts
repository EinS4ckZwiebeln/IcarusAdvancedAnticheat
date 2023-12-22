import { Parameter } from "../types/ParameterType";

/**
 * Represents a command that can be executed.
 */
export abstract class Command {
	private readonly _name: string;
	private readonly _description: string;
	private readonly _parameters: Parameter[];
	private readonly _callback: Function;

	/**
	 * Creates a new instance of Command.
	 * @param name The name of the command.
	 * @param callback The function to be executed when the command is called.
	 */
	constructor(name: string, description: string, parameters: Parameter[], callback: Function) {
		this._name = name;
		this._description = description;
		this._parameters = parameters;
		this._callback = callback;
	}

	/**
	 * Gets the name of the command.
	 */
	public get name(): string {
		return this._name;
	}

	/**
	 * Gets the description of the command.
	 */
	public get description(): string {
		return this._description;
	}

	/**
	 * Gets the hep parameters of the command.
	 */
	public get parameters(): Parameter[] {
		return this._parameters;
	}

	/**
	 * Gets the function to be executed when the command is called.
	 */
	public get callback(): Function {
		return this._callback;
	}
}
