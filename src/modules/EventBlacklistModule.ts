import { container } from "tsyringe";
import { Module } from "../core/Module";
import { Violation } from "../core/Violation";
import { Config } from "../core/config/Config";

export class EventBlacklistModule extends Module {
	constructor() {
		super(container.resolve(Config));
	}

	public onLoad(): void {
		this.registerEvents();
	}
	// Eventhandlers cannot be removed so easily
	public onUnload(): void {}

	/**
	 * Registers blacklisted events and sets up a violation handler for each event.
	 */
	private async registerEvents(): Promise<void> {
		for (const [resourceName, value] of Object.entries(this.config.getConfig().BlacklistedEvents)) {
			// Skip over resource when it is started
			if (GetResourceState(resourceName) === "started") continue;

			const events = Array.from(value);
			events.forEach((event: string) => {
				onNet(event, () => {
					const violation = new Violation(source, "Event Blacklist [C1]", this.name);
					violation.banPlayer();
					CancelEvent();
				});
			});
		}
	}
}
