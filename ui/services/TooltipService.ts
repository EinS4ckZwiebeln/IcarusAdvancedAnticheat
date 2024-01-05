import { Tooltip } from "bootstrap";

export class TooltipService {
	private _tooltipList: Tooltip[] = [];

	public update(): void {
		const tooltipTriggerList: Element[] = Array.from($('[data-bs-toggle="tooltip"]'));
		this._tooltipList = tooltipTriggerList.map((tooltip) => new Tooltip(tooltip));
	}

	public async dispose(): Promise<void> {
		this._tooltipList.forEach((tooltip: Tooltip) => {
			if (tooltip) tooltip.dispose();
		});
		this._tooltipList.length = 0;
	}
}
