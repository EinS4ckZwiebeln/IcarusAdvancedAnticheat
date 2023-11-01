import { EventHandler } from "../core/handler/EventHandler";
import { Module } from "../core/Module";
import { Violation } from "../core/Violation";
import { Config } from "../config/Config";
import { Utility } from "../util/Utility";

export class EntityCreateModule extends Module {
	private _illegalEntities: Set<number> = new Set();
	private readonly _banNetworkOwner: boolean = Config.getValue(this.config, "banNetworkOwner");

	public onLoad(): void {
		const models: string[] = Array.from(Config.getValue(this.config, "IllegalModels"));
		this._illegalEntities = new Set(Utility.hashify(models));
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
		if (DoesEntityExist(entity)) {
			const owner: number = NetworkGetFirstEntityOwner(entity);
			let violation: boolean = false;

			if (this._illegalEntities.has(GetEntityModel(entity))) {
				if (this._banNetworkOwner) {
					new Violation(owner, "Illegal Entity [C1]");
				}
				violation = true;
			}

			const rootEntity: number = GetEntityAttachedTo(entity);
			if (rootEntity > 0 && NetworkGetFirstEntityOwner(rootEntity) != owner) {
				if (this._banNetworkOwner) {
					new Violation(owner, "Illegal Entity [C2]");
				}
				violation = true;
			}

			if (violation) {
				DeleteEntity(entity);
				CancelEvent();
			}
		}
	}
}
