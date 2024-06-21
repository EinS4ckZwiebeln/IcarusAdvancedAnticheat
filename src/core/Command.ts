import { Parameter } from "../Types";

export abstract class Command {
	private readonly _name: string;
	private readonly _description: string;
	private readonly _parameters: Parameter[];

	/**
	 * Creates a new instance of the Command class.
	 * @param name - The name of the command.
	 * @param description - The description of the command.
	 * @param parameters - The parameters of the command.
	 */
	constructor(name: string, description: string, parameters: Parameter[]) {
		this._name = name;
		this._description = description;
		this._parameters = parameters;
	}

	public get name(): string {
		return this._name;
	}

	public get description(): string {
		return this._description;
	}

	public get parameters(): Parameter[] {
		return this._parameters;
	}

	/**
	 * Writes a message to the chat.
	 * @param source - The source of the message.
	 * @param message - The message to write.
	 */
	protected writeToChat(source: number, message: string): void {
		emitNet("chat:addMessage", source, { args: [message] });
	}

	/**
	 * Executes the command.
	 * @param source - The source of the command.
	 * @param args - The arguments of the command.
	 */
	public abstract onExecute(source: number, args?: string[]): Promise<void>;
}
