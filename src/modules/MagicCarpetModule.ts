import { Module } from "../core/Module";
import { Violation } from "../core/Violation";

export class MagicCarpetModule extends Module {
	public onLoad(): void {}
	public onUnload(): void {}

	protected async onTick(): Promise<void> {
		const players = getPlayers();
		players.forEach(async (player: string) => {
			const attachedEntity = GetEntityAttachedTo(GetPlayerPed(player));
			if (attachedEntity > 0 && IsEntityPositionFrozen(attachedEntity) && GetEntityType(attachedEntity) === 3) {
				const violation = new Violation(parseInt(player), "Magic Carpet [C1]", this.name);
				violation.banPlayer();
			}
		});
		await this.Delay(15000);
	}
}
