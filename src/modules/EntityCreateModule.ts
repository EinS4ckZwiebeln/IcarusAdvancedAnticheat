import { EventHandler } from "../core/handler/EventHandler";
import { Module } from "../core/Module";
import { Violation } from "../core/Violation";
import { Config } from "../core/config/Config";
import { Utility } from "../util/Utility";
import { Weapons } from "../util/enum/Weapons";

export class EntityCreateModule extends Module {
	private _illegalEntities: Set<number> = new Set();
	private _blacklistedWeapons: Set<number> = new Set();
	private _banNetworkOwner: boolean = false;
	private _checkPedsForWeapons: boolean = false;

	public onLoad(): void {
		this._illegalEntities = new Set(Utility.hashify(this.config.IllegalModels));
		this._blacklistedWeapons = new Set(Utility.hashify(this.config.BlacklistedWeapons));

		this._banNetworkOwner = Config.getValue(this.config, "banNetworkOwner");
		this._checkPedsForWeapons = Config.getValue(this.config, "checkPedsForWeapons");

		EventHandler.subscribe("entityCreated", (entity: number) => this.onEntityCreated(entity));
	}

	public onUnload(): void {
		EventHandler.unsubscribe("entityCreated", (entity: number) => this.onEntityCreated(entity));
	}

	/**
	 * Called when an entity is created.
	 * @param entity The entity that was created.
	 */
	private onEntityCreated(entity: number): void {
		if (!DoesEntityExist(entity)) return;
		const owner: number = NetworkGetFirstEntityOwner(entity);
		// If the entity is illegal, ban the player.
		if (this._illegalEntities.has(GetEntityModel(entity))) {
			this.handleViolation("Illegal Entity [C1]", owner, entity);
			return;
		}

		// If the entity is attached to another entity and the owner of the attached entity is not the same as the owner of the entity, ban the player.
		const rootEntity: number = GetEntityAttachedTo(entity);
		if (rootEntity > 0 && NetworkGetFirstEntityOwner(rootEntity) !== owner) {
			this.handleViolation("Illegal Entity [C2]", owner, entity);
			return;
		}

		// If the entity is a ped and the owner is not a player and the selected weapon is blacklisted, ban the player.
		if (this._checkPedsForWeapons) {
			const weapon: number = GetSelectedPedWeapon(entity);
			// Return early if unarmed or no weapons.
			switch (weapon) {
				case 0:
				case Weapons.WEAPON_UNARMED:
					return;
				default:
					break;
			}
			if (GetEntityType(entity) === 1 && this._blacklistedWeapons.has(weapon)) {
				this.handleViolation("Illegal Entity [C3]", owner, entity);
				return;
			}
		}
	}

	/**
	 * Handles a violation by banning the network owner and deleting the entity.
	 * @param violationType - The type of violation.
	 * @param owner - The network owner of the entity.
	 * @param entity - The entity to be deleted.
	 */
	private handleViolation(violationType: string, owner: number, entity: number): void {
		if (this._banNetworkOwner) {
			const violation = new Violation(owner, violationType, this.name);
			violation.banPlayer();
		}
		DeleteEntity(entity);
		CancelEvent();
	}
}
