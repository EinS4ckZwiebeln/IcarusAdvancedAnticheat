import { EventHandler } from "../core/handler/EventHandler";
import { Module } from "../core/Module";
import { Violation } from "../core/Violation";
import { RemoveAllWeaponsEvent, RemoveWeaponEvent } from "../types/EventType";

export class RemoveWeaponModule extends Module {
	public onLoad(): void {
		EventHandler.subscribe("removeWeaponEvent", (source: number, data: RemoveWeaponEvent) => this.onRemoveWeapon(source, data));
		EventHandler.subscribe("removeAllWeaponsEvent", (source: number, data: RemoveAllWeaponsEvent) => this.onRemoveWeapon(source, data));
	}
	public onUnload(): void {
		EventHandler.unsubscribe("removeWeaponEvent", (source: number, data: RemoveWeaponEvent) => this.onRemoveWeapon(source, data));
		EventHandler.unsubscribe("removeAllWeaponsEvent", (source: number, data: RemoveAllWeaponsEvent) => this.onRemoveWeapon(source, data));
	}

	/**
	 * Handles the removal of a weapon from a player's ped.
	 * @param source The player who triggered the event.
	 * @param data The data containing the ped ID and weapon hash.
	 */
	private onRemoveWeapon(source: number, data: RemoveWeaponEvent | RemoveAllWeaponsEvent): void {
		const entity: number = NetworkGetEntityFromNetworkId(data.pedId);
		if (DoesEntityExist(entity)) {
			const owner = NetworkGetEntityOwner(entity);
			if (source != owner) {
				const violation = new Violation(source, "Remove Weapon [C1]", this.name);
				violation.banPlayer();
				CancelEvent();
			}
		}
	}
}
