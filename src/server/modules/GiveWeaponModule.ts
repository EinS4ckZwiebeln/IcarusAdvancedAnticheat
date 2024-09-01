import { Module } from "../core/Module";
import { Violation } from "../core/Violation";
import { GiveWeaponEvent } from "../Types";
import { Config } from "../core/config/Config";

export class GiveWeaponModule extends Module {
	private _allowPickUp: boolean = false;

	public onLoad(): void {
		this._allowPickUp = Config.getValue<boolean>(this.config, "allowPickUp");
		this.eventHandler.subscribe("giveWeaponEvent", this.onGiveWeapon.bind(this));
	}

	public onUnload(): void {
		this.eventHandler.unsubscribe("giveWeaponEvent", this.onGiveWeapon.bind(this));
	}

	/**
	 * Handles the event when a player tries to give a weapon to another player.
	 * If the player is not the owner of the entity, the player is banned and the event is cancelled.
	 * @param source The player ID who triggered the event.
	 * @param data The data associated with the event.
	 */
	private onGiveWeapon(source: number, data: GiveWeaponEvent): void {
		if (this._allowPickUp && data.givenAsPickup) return;
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
