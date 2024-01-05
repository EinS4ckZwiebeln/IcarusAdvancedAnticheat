import { Utility } from "../Utility";
import { AbstractButton } from "../AbstractButton";

export class ActionButtons extends AbstractButton {
	public register(): void {
		$("#revive-all").on("click", () => {
			$.post(`https://${Utility.RESOURCE_NAME}/reviveAll`);
		});

		$("#heal-all").on("click", () => {
			$.post(`https://${Utility.RESOURCE_NAME}/healAll`);
		});

		$("#wipe-entities").on("click", () => {
			$.post(`https://${Utility.RESOURCE_NAME}/wipeEntities`);
		});

		$("#reload-modules").on("click", () => {
			$.post(`https://${Utility.RESOURCE_NAME}/reloadModules`);
		});
	}
}
