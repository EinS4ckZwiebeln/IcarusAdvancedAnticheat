import { UpdateService } from "./UpdateService";

enum MessageAction {
	MESSAGE_UPDATE = "UPDATE",
	MESSAGE_CLOSE = "CLOSE",
	MESSAGE_OPEN = "OPEN",
}

export class MessageService {
	private readonly _updateService: UpdateService;

	constructor(updateService: UpdateService) {
		this._updateService = updateService;
	}

	public startListening(): void {
		const UI = $("#ui");
		$(window).on("message", (event) => {
			const eventData = (event.originalEvent as any).data;
			switch (eventData.action) {
				case MessageAction.MESSAGE_UPDATE:
					this._updateService.updateUI(eventData.pageName, eventData.data);
					break;
				case MessageAction.MESSAGE_OPEN:
					UI.fadeIn(200, "swing", () => {
						UI.show();
					});
					break;
				case MessageAction.MESSAGE_CLOSE:
					UI.fadeOut(200, "swing", () => {
						UI.hide();
					});
					break;
				default:
					throw new Error("Received impossible event action");
			}
		});
	}
}
