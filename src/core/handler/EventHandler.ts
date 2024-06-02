import { singleton } from "tsyringe";
import { Logger } from "../logger/Logger";

/**
 * The EventHandler class provides a mechanism for subscribing to and triggering events.
 * Events can be subscribed to using the `subscribe` method and unsubscribed from using the `unsubscribe` method.
 * When an event is triggered, all subscribed callback functions are called.
 */
@singleton()
export class EventHandler {
	private readonly _events: Map<string, Function[]> = new Map();
	private readonly _netEvents: Set<string> = new Set();

	/**
	 * Subscribes to an event with the given name and callback function.
	 * @param eventName The name of the event to subscribe to.
	 * @param callback The callback function to be called when the event is triggered.
	 */
	public subscribe(eventName: string | string[], callback: Function | Function[]): void {
		if (Array.isArray(eventName) && Array.isArray(callback)) {
			throw new Error("Unable to bind events to functions");
		}
		const events = Array.isArray(eventName) ? eventName : [eventName];
		events.forEach((event: string) => {
			Logger.debug(`Subscribing to ${event}`);
			if (!this._netEvents.has(event)) this.registerNetEvent(event);
			// Push new callback onto the stack
			this._events.set(event, [...this.getEventCallbacks(event), ...(Array.isArray(callback) ? callback : [callback])]);
		});
	}

	/**
	 * Removes a callback function from the list of callbacks for a given event name.
	 * @param eventName - The name of the event to unsubscribe from.
	 * @param callback - The callback function to remove from the list of callbacks for the event.
	 */
	public unsubscribe(eventName: string | string[], callback: Function | Function[]): void {
		if (Array.isArray(eventName) && Array.isArray(callback)) {
			throw new Error("Unable to unbind events from functions");
		}
		const events = Array.isArray(eventName) ? eventName : [eventName];
		events.forEach((event: string) => {
			Logger.debug(`Unsubscribing from ${event}`);
			const functions = Array.isArray(callback) ? callback : [callback];
			functions.forEach((cb: Function) => this.filterCallback(cb, event));
		});
	}

	/**
	 * Removes passed callback from event stack.
	 * @param callback - The function to be filtered out.
	 * @param event - The event the callback function is bound to.
	 */
	private filterCallback(callback: Function, event: string): void {
		const callbackToString = callback.toString();
		const eventCallbacks = this.getEventCallbacks(event).filter(
			// Shitty workaround for callback equality check, needs refactoring later.
			(cb: Function) => cb.toString() !== callbackToString
		);
		this._events.set(event, eventCallbacks);
	}

	/**
	 * Registers a network event with the specified event name.
	 * @param eventName - The name of the network event to register.
	 */
	private registerNetEvent(eventName: string): void {
		Logger.debug(`Registering net event ${eventName}`);
		onNet(eventName, async (...args: unknown[]) => this.triggerEventCallbacks(eventName, args));
		this._netEvents.add(eventName);
	}

	/**
	 * Retrieves the event callbacks for a given event name.
	 * @param eventName The name of the event.
	 * @returns An array of event callbacks.
	 */
	private getEventCallbacks(eventName: string): Function[] {
		return this._events.get(eventName) ?? [];
	}

	/**
	 * Triggers the event callbacks for the specified event name with the given arguments.
	 * @param eventName - The name of the event.
	 * @param args - The arguments to pass to the event callbacks.
	 */
	private triggerEventCallbacks(eventName: string, args: unknown[]): void {
		const eventCallbacks = this.getEventCallbacks(eventName);
		for (let i = 0; i < eventCallbacks.length; i++) eventCallbacks[i](...args); // Use traditional for loop to minimize functional overhead.
	}
}
