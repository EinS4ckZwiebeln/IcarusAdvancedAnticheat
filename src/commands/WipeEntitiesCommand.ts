import { Command } from "../core/Command";

/**
 * Represents a command that wipes all entities from the game world.
 */
export class WipeEntitiesCommand extends Command {
	/**
	 * Creates a new instance of the WipeEntitiesCommand class.
	 */
	constructor() {
		super("wipe", "Removes all networked entities", [], (source: number, _: string[]) => this.onExecute(source));
	}

	/**
	 * Executes the command logic.
	 * @param source The player who executed the command.
	 */
	private async onExecute(source: number): Promise<void> {
		const entities: number[] = [...GetAllObjects(), ...GetAllVehicles(), ...GetAllPeds()];
		entities.forEach((entity: number) => {
			DeleteEntity(entity);
		});
		emitNet("chat:addMessage", source, { args: [`^3Removed ${entities.length} networked ${entities.length == 1 ? "entity" : "entities"}.^0`] });
	}
}
