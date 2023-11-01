import { EventHandler } from "../core/handler/EventHandler";
import { Module } from "../core/Module";
import { Violation } from "../core/Violation";

export class RemoveWeaponModule extends Module {
	public onLoad(): void {
		EventHandler.subscribe("removeWeaponEvent", (source: number, data: any) => this.onRemoveWeapon(source, data));
		EventHandler.subscribe("removeAllWeaponsEvent", (source: number, data: any) => this.onRemoveWeapon(source, data));
	}
	public onUnload(): void {
		EventHandler.unsubscribe("removeWeaponEvent", (source: number, data: any) => this.onRemoveWeapon(source, data));
		EventHandler.unsubscribe("removeAllWeaponsEvent", (source: number, data: any) => this.onRemoveWeapon(source, data));
	}

	/**
	 * Handles the removal of a weapon from a player's ped.
	 * @param source The player who triggered the event.
	 * @param data The data containing the ped ID and weapon hash.
	 */
	private onRemoveWeapon(source: number, data: any): void {
		const entity: number = NetworkGetEntityFromNetworkId(data.pedId);
		if (DoesEntityExist(entity)) {
			const owner = NetworkGetEntityOwner(entity);
			if (source != owner) {
				new Violation(source, "RemoveWeapon [C1]");
				CancelEvent();
			}
		}
	}
}
