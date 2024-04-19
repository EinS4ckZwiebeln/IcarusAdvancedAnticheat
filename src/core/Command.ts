import { Parameter } from "../Types";

export interface ICommand {
	readonly name: string;
	readonly description: string;
	readonly parameters: Parameter[];
	onExecute(source: number, args?: string[]): Promise<void>;
}
