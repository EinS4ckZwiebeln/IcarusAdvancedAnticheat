import { Command } from '../core/Command'

export class WipeEntitiesCommand extends Command {
	constructor() {
		super('wipe', 'Removes all networked entities', [])
	}

	/**
	 * Executes the command logic.
	 * @param source The player who executed the command.
	 */
	public async onExecute(source: number): Promise<void> {
		const entities: number[] = GetGamePool('CNetObject')
		for (const entity of entities) {
			DeleteEntity(entity)
		}
		this.writeToChat(source, `^3Removed ${entities.length} networked ${entities.length === 1 ? 'entity' : 'entities'}.^0`)
	}
}
