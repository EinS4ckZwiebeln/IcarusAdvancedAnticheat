import { Parameter } from "../Types";
import { ICommand } from "../core/Command";

/**
 * Represents a command that wipes all entities from the game world.
 */
export class WipeEntitiesCommand implements ICommand {
	public readonly name: string = "wipe";
	public readonly description: string = "Removes all networked entities";
	public readonly parameters: Parameter[] = [];

	/**
	 * Executes the command logic.
	 * @param source The player who executed the command.
	 */
	public async onExecute(source: number): Promise<void> {
		const entities: number[] = [...GetAllObjects(), ...GetAllVehicles(), ...GetAllPeds()];
		entities.forEach((entity: number) => {
			DeleteEntity(entity);
		});
		emitNet("chat:addMessage", source, {
			args: [`^3Removed ${entities.length} networked ${entities.length == 1 ? "entity" : "entities"}.^0`],
		});
	}
}
