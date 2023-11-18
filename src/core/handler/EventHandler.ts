import { Logger } from "../logger/Logger";
/**
 * The EventHandler class provides a way to subscribe to and handle events.
 */
export class EventHandler {
	private static readonly _events: Map<string, Function[]> = new Map();
	private static readonly _netEvents: Set<string> = new Set();

	constructor() {
		throw new Error("EventHandler is a static class and cannot be instantiated.");
	}

	/**
	 * Subscribes to an event with the given name and callback function.
	 * @param eventName The name of the event to subscribe to.
	 * @param callback The callback function to be called when the event is triggered.
	 */
	public static subscribe(eventName: string, callback: Function): void {
		Logger.debug(`Subscribing to ${eventName}`);
		if (!this._netEvents.has(eventName)) {
			Logger.debug(`Creating ${eventName} EventHandler`);
			onNet(eventName, async (...args: any[]) => {
				// Call each callback
				(this._events.get(eventName) || []).forEach((callback: Function) => {
					callback(...args);
				});
			});
			this._netEvents.add(eventName);
		}

		const eventCallbacks = this._events.get(eventName) || [];
		eventCallbacks.push(callback);
		this._events.set(eventName, eventCallbacks);
	}

	/**
	 * Removes a callback function from the list of callbacks for a given event name.
	 * @param eventName - The name of the event to unsubscribe from.
	 * @param callback - The callback function to remove from the list of callbacks for the event.
	 */
	public static unsubscribe(eventName: string, callback: Function): void {
		Logger.debug(`Unsubscribing from ${eventName}`);
		let eventCallbacks = this._events.get(eventName) || [];
		eventCallbacks = eventCallbacks.filter((cb: Function) => cb !== callback);
		this._events.set(eventName, eventCallbacks);
	}
}
