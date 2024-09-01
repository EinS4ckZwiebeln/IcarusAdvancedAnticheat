import "../helper/CfxGlobals";
import "../helper/MockNatives";
import "../helper/MockConfig";
import { EventHandler } from "../../src/server/core/handler/EventHandler";
import { Logger } from "../../src/server/core/logger/Logger";
import { container } from "tsyringe";

Logger.init();
const eventHandler = container.resolve(EventHandler);

describe("EventHandler", () => {
	afterEach(() => {
		eventHandler["_events"].clear();
	});
	it("should subscribe to a single event with a single callback", () => {
		const eventName = "event1";
		const callback = jest.fn();
		eventHandler.subscribe(eventName, callback);
		expect(eventHandler["_events"].get(eventName)).toEqual([callback]);
	});
	it("should subscribe to multiple events with a single callback", () => {
		const eventNames = ["event1", "event2"];
		const callback = jest.fn();
		eventHandler.subscribe(eventNames, callback);
		expect(eventHandler["_events"].get(eventNames[0])).toEqual([callback]);
		expect(eventHandler["_events"].get(eventNames[1])).toEqual([callback]);
	});
	it("should subscribe to a single event with multiple callbacks", () => {
		const eventName = "event1";
		const callbacks = [jest.fn(), jest.fn()];
		eventHandler.subscribe(eventName, callbacks);
		expect(eventHandler["_events"].get(eventName)).toEqual(callbacks);
	});
	it("should throw an error when trying to bind events to functions", () => {
		const eventName = ["event1"];
		const callback = [jest.fn()];
		expect(() => {
			eventHandler.subscribe(eventName, callback);
		}).toThrow("Unable to bind events to functions");
	});
	it("should unsubscribe from a single event with a single callback", () => {
		const eventName = "event1";
		const callback = jest.fn();
		eventHandler.subscribe(eventName, callback);
		eventHandler.unsubscribe(eventName, callback);
		expect(eventHandler["_events"].get(eventName)).toEqual([]);
	});
	it("should unsubscribe from multiple events with a single callback", () => {
		const eventNames = ["event1", "event2"];
		const callback = jest.fn();
		eventHandler.subscribe(eventNames, callback);
		eventHandler.unsubscribe(eventNames, callback);
		expect(eventHandler["_events"].get(eventNames[0])).toEqual([]);
		expect(eventHandler["_events"].get(eventNames[1])).toEqual([]);
	});
	it("should unsubscribe from a single event with multiple callbacks", () => {
		const eventName = "event1";
		const callbacks = [jest.fn(), jest.fn()];
		eventHandler.subscribe(eventName, callbacks);
		eventHandler.unsubscribe(eventName, callbacks);
		expect(eventHandler["_events"].get(eventName)).toEqual([]);
	});
	it("should throw an error when trying to unbind events from functions", () => {
		const eventName = ["event1"];
		const callback = [jest.fn()];
		expect(() => {
			eventHandler.unsubscribe(eventName, callback);
		}).toThrow("Unable to unbind events from functions");
	});
	it("should trigger event callbacks", () => {
		const eventName = "event1";
		const args = [1, "two", true];
		const callback1 = jest.fn();
		const callback2 = jest.fn();
		eventHandler.subscribe(eventName, callback1);
		eventHandler.subscribe(eventName, callback2);
		eventHandler["triggerEventCallbacks"](eventName, args);
		expect(callback1).toHaveBeenCalledWith(...args);
		expect(callback2).toHaveBeenCalledWith(...args);
	});
});
