import { Module } from "../core/Module";
import { Violation } from "../core/Violation";

export class EventBlacklistModule extends Module {
	public onLoad(): void {
		this.registerEvents();
	}
	// Eventhandlers cannot be removed so easily
	public onUnload(): void {}

	/**
	 * Registers blacklisted events and sets up a violation handler for each event.
	 */
	private async registerEvents(): Promise<void> {
		for (let [resourceName, value] of Object.entries(this.config.BlacklistedEvents)) {
			// Skip over resource when it is started
			if (GetResourceState(resourceName) === "started") continue;

			const events = Array.from(value as string[]);
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
