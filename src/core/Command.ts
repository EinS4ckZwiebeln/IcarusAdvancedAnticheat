/**
 * Represents a subcommand that can be executed by a command.
 */
export abstract class Command {
	private _name: string;
	private _callback: Function;

	/**
	 * Creates a new instance of SubCommand.
	 * @param name The name of the subcommand.
	 * @param callback The function to be executed when the subcommand is called.
	 */
	constructor(name: string, callback: Function) {
		this._name = name;
		this._callback = callback;
	}

	/**
	 * Gets the name of the subcommand.
	 */
	public get name(): string {
		return this._name;
	}

	/**
	 * Gets the function to be executed when the subcommand is called.
	 */
	public get callback(): Function {
		return this._callback;
	}
}
