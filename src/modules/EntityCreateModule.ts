import { EventHandler } from "../core/handler/EventHandler";
import { Module } from "../core/Module";
import { Violation } from "../core/Violation";
import { Config } from "../config/Config";
import { Utility } from "../util/Utility";

export class EntityCreateModule extends Module {
	private _illegalEntities: Set<number> = new Set();
	private _blacklistedWeapons: Set<number> = new Set();
	private _banNetworkOwner: boolean = false;
	private _checkPedsForWeapons: boolean = false;

	public onLoad(): void {
		const models: string[] = Array.from(this.config.IllegalModels);
		this._illegalEntities = new Set(Utility.hashify(models));
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
		let violation: boolean = false;
		// If the entity is illegal, ban the player.
		if (this._illegalEntities.has(GetEntityModel(entity))) {
			if (this._banNetworkOwner) {
				const violation = new Violation(owner, "Illegal Entity [C1]", this.name);
				violation.banPlayer();
			}
			violation = true;
		}
		// If the entity is attached to another entity and the owner of the attached entity is not the same as the owner of the entity, ban the player.
		const rootEntity: number = GetEntityAttachedTo(entity);
		if (rootEntity > 0 && NetworkGetFirstEntityOwner(rootEntity) != owner) {
			if (this._banNetworkOwner) {
				const violation = new Violation(owner, "Illegal Entity [C2]", this.name);
				violation.banPlayer();
			}
			violation = true;
		}
		// If the entity is a ped and the owner is not a player and the selected weapon is blacklisted, ban the player.
		if (this._checkPedsForWeapons && GetEntityType(entity) === 1 && !IsPedAPlayer(entity) && this._blacklistedWeapons.has(GetSelectedPedWeapon(entity))) {
			if (this._banNetworkOwner) {
				const violation = new Violation(owner, "Illegal Entity [C3]", this.name);
				violation.banPlayer();
			}
			violation = true;
		}

		if (violation) {
			DeleteEntity(entity);
			CancelEvent();
		}
	}
}
