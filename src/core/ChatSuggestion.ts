import { Parameter } from "../types/ParameterType";

export class ChatSuggestion {
	private readonly _command: string;
	private readonly _description: string;
	private readonly _parameters: Parameter[];

	/**
	 * Creates a new instance of ChatSuggestion.
	 * @param name The name of the command.
	 * @param description The description of the command.
	 * @param parameters The parameters of the command.
	 */
	constructor(command: string, description: string, parameters: Parameter[]) {
		this._command = command;
		this._description = description;
		this._parameters = parameters;
	}

	/**
	 * Gets the name of the command.
	 */
	public get command(): string {
		return this._command;
	}

	/**
	 * Gets the description of the command.
	 */
	public get description(): string {
		return this._description;
	}

	/**
	 * Gets the parameters of the command.
	 */
	public get parameters(): Parameter[] {
		return this._parameters;
	}
}
