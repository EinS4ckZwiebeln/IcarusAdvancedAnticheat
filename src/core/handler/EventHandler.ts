import { Logger } from "../logger/Logger";

/**
 * The EventHandler class provides a mechanism for subscribing to and triggering events.
 * Events can be subscribed to using the `subscribe` method and unsubscribed from using the `unsubscribe` method.
 * When an event is triggered, all subscribed callback functions are called.
 */
export class EventHandler {
	private static readonly _events: Map<string, Function[]> = new Map();
	private static readonly _netEvents: Set<string> = new Set();

	private constructor() {
		throw new Error("EventHandler is a static class and cannot be instantiated.");
	}

	/**
	 * Subscribes to an event with the given name and callback function.
	 * @param eventName The name of the event to subscribe to.
	 * @param callback The callback function to be called when the event is triggered.
	 */
	public static subscribe(eventName: string, callback: Function): void {
		Logger.debug(`Subscribing to ${eventName}`);
		if (!this._netEvents.has(eventName)) this.registerNetEvent(eventName);
		// Push new callback onto the stack
		this._events.set(eventName, [...this.getEventCallbacks(eventName), callback]);
	}

	/**
	 * Removes a callback function from the list of callbacks for a given event name.
	 * @param eventName - The name of the event to unsubscribe from.
	 * @param callback - The callback function to remove from the list of callbacks for the event.
	 */
	public static unsubscribe(eventName: string, callback: Function): void {
		Logger.debug(`Unsubscribing from ${eventName}`);
		const eventCallbacks = this.getEventCallbacks(eventName).filter((cb: Function) => cb !== callback);
		this._events.set(eventName, eventCallbacks);
	}

	/**
	 * Registers a network event with the specified event name.
	 * @param eventName - The name of the network event to register.
	 */
	private static registerNetEvent(eventName: string): void {
		Logger.debug(`Registering net event ${eventName}`);
		onNet(eventName, async (...args: any[]) => this.triggerEventCallbacks(eventName, args));
		this._netEvents.add(eventName);
	}

	/**
	 * Retrieves the event callbacks for a given event name.
	 * @param eventName The name of the event.
	 * @returns An array of event callbacks.
	 */
	private static getEventCallbacks(eventName: string): Function[] {
		return this._events.get(eventName) ?? [];
	}

	/**
	 * Triggers the event callbacks for the specified event name with the given arguments.
	 * @param eventName - The name of the event.
	 * @param args - The arguments to pass to the event callbacks.
	 */
	private static triggerEventCallbacks(eventName: string, args: any[]): void {
		this.getEventCallbacks(eventName).forEach((cb: Function) => cb(...args));
	}
}
