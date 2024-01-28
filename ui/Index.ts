import { Utility } from "./services/Utility";
import { NavbarButtons } from "./services/buttons/NavbarButtons";
import { ActionButtons } from "./services/buttons/ActionButtons";
import { ModuleSortButtons } from "./services/buttons/ModuleSortButtons";
import { ButtonService } from "./services/ButtonService";
import { TooltipService } from "./services/TooltipService";
import { UpdateService } from "./services/UpdateService";
import { MessageService } from "./services/MessageService";
import { InputService } from "./services/InputService";
import { CopyWebhookButton } from "./services/buttons/CopyWebhookButton";

class Index {
	// Services
	private readonly _tooltipService = new TooltipService();
	private readonly _buttonService = new ButtonService();
	// Services with dependecies
	private readonly _updateService = new UpdateService(this._tooltipService);
	private readonly _messageService = new MessageService(this._updateService);
	private readonly _inputService = new InputService(this._tooltipService);

	constructor() {
		setTimeout(async () => {
			// Wait for jQuery to be ready
			while (!jQuery) {
				await Utility.Delay(0);
			}

			$("#ui").hide(); // Required for chart.js since d-none will glitch it out
			this._messageService.startListening();
			this._inputService.startListening();
			this._tooltipService.update();

			this._buttonService.registerButton(new NavbarButtons());
			this._buttonService.registerButton(new ActionButtons());
			this._buttonService.registerButton(new ModuleSortButtons());
			this._buttonService.registerButton(new CopyWebhookButton());
		}, 0);
	}
}

// Program entry point
new Index();
