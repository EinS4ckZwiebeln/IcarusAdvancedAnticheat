import { TooltipService } from "./TooltipService";
import { Utility } from "./Utility";

export class InputService {
	private readonly _tooltipService: TooltipService;

	constructor(tooltipService: TooltipService) {
		this._tooltipService = tooltipService;
	}
	public startListening(): void {
		$(document).on("keyup", (event) => {
			const key = event.originalEvent?.which;
			switch (key) {
				case 8:
				case 27:
					$.post(`https://${Utility.RESOURCE_NAME}/closeUI`);
					// Prevent lingering tooltips when UI closes
					this._tooltipService.dispose();
					break;
				default:
					return;
			}
		});

		$("#close-ui").on("click", () => {
			$.post(`https://${Utility.RESOURCE_NAME}/closeUI`);
			this._tooltipService.dispose();
		});
	}
}
