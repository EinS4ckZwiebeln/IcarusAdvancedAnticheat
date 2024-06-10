import { container } from "tsyringe";
import { EventHandler } from "../core/handler/EventHandler";
import { Module } from "../core/Module";
import { Violation } from "../core/Violation";
import { RemoveAllWeaponsEvent, RemoveWeaponEvent } from "../Types";
import { Config } from "../core/config/Config";

export class RemoveWeaponModule extends Module {
	constructor() {
		super(container.resolve(Config), container.resolve(EventHandler));
	}

	public onLoad(): void {
		this.eventHandler.subscribe(["removeWeaponEvent", "removeAllWeaponsEvent"], this.onRemoveWeapon.bind(this));
	}

	public onUnload(): void {
		this.eventHandler.unsubscribe(["removeWeaponEvent", "removeAllWeaponsEvent"], this.onRemoveWeapon.bind(this));
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
