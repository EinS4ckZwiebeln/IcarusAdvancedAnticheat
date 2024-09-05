import { Module } from "../core/Module";
import { Violation } from "../core/Violation";
import { Config } from "../core/config/Config";
import { Utility } from "../util/Utility";

export class EntityCreateModule extends Module {
	private _illegalEntities: Set<number> = new Set<number>();
	private _blacklistedWeapons: Set<number> = new Set<number>();
	private _banNetworkOwner: boolean = false;
	private _checkPedsForWeapons: boolean = false;
	private _cleanUpEntities: boolean = false;

	public onLoad(): void {
		this._illegalEntities = new Set(Utility.hashify(this.config.IllegalModels));
		this._banNetworkOwner = Config.getValue<boolean>(this.config, "banNetworkOwner");
		this._cleanUpEntities = Config.getValue<boolean>(this.config, "cleanUpEntities");
		this._checkPedsForWeapons = Config.getValue<boolean>(this.config, "checkPedsForWeapons");
		if (this._checkPedsForWeapons) {
			this._blacklistedWeapons = new Set(Utility.hashify(this.config.BlacklistedWeapons));
		}
		this.eventHandler.subscribe("entityCreating", this.onEntityCreated.bind(this));
	}

	public onUnload(): void {
		this.eventHandler.unsubscribe("entityCreating", this.onEntityCreated.bind(this));
	}

	/**
	 * Called when an entity is created.
	 * @param entity The entity that was created.
	 */
	private onEntityCreated(entity: number): void {
		// If the entity is illegal, ban the player.
		if (this._illegalEntities.has(GetEntityModel(entity))) {
			const owner: number = NetworkGetFirstEntityOwner(entity);
			this.handleViolation("Illegal Entity [C1]", owner);
			return;
		}

		// If the entity is a ped and the owner is not a player and the selected weapon is blacklisted, ban the player.
		if (this._checkPedsForWeapons) {
			if (GetEntityType(entity) === 1 && this._blacklistedWeapons.has(GetSelectedPedWeapon(entity))) {
				const owner: number = NetworkGetFirstEntityOwner(entity);
				this.handleViolation("Illegal Entity [C3]", owner);
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
	private handleViolation(violationType: string, owner: number): void {
		if (this._banNetworkOwner) {
			const violation = new Violation(owner, violationType, this.name);
			violation.banPlayer();
		}
		if (this._cleanUpEntities) {
			this.cleanUpEntities(owner);
		}
		CancelEvent();
	}

	/**
	 * Cleans up all entities owned by the specified source.
	 * @param source - The source to clean up entities for.
	 */
	private cleanUpEntities(source: number): void {
		const entities: number[] = [...GetAllObjects(), ...GetAllVehicles(), ...GetAllPeds()];
		entities.forEach((entity: number) => {
			if (NetworkGetFirstEntityOwner(entity) === source || NetworkGetEntityOwner(entity) === source) {
				DeleteEntity(entity);
			}
		});
	}
}
