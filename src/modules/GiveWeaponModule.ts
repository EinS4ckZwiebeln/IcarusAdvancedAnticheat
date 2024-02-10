import { EventHandler } from "../core/handler/EventHandler";
import { Module } from "../core/Module";
import { Violation } from "../core/Violation";
import { GiveWeaponEvent } from "../Types";

export class GiveWeaponModule extends Module {
	public onLoad(): void {
		EventHandler.subscribe("giveWeaponEvent", this.onGiveWeapon.bind(this));
	}
	public onUnload(): void {
		EventHandler.unsubscribe("giveWeaponEvent", this.onGiveWeapon.bind(this));
	}

	/**
	 * Handles the event when a player tries to give a weapon to another player.
	 * If the player is not the owner of the entity, the player is banned and the event is cancelled.
	 * @param source The player ID who triggered the event.
	 * @param data The data associated with the event.
	 */
	private onGiveWeapon(source: number, data: GiveWeaponEvent): void {
		const entity: number = NetworkGetEntityFromNetworkId(data.pedId);
		if (DoesEntityExist(entity)) {
			const owner = NetworkGetEntityOwner(entity);
			if (source != owner) {
				const violation = new Violation(source, "GiveWeapon [C1]", this.name);
				violation.banPlayer();
				CancelEvent();
			}
		}
	}
}
