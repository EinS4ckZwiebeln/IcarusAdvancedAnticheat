import "../helper/CfxGlobals";
import "../helper/ResourceNatives";
import "../helper/MockConfig";
import { EventHandler } from "../../core/handler/EventHandler";
import { Logger } from "../../core/logger/Logger";

Logger.init();
describe("EventHandler", () => {
	afterEach(() => {
		EventHandler["_events"].clear();
	});
	it("should subscribe to a single event with a single callback", () => {
		const eventName = "event1";
		const callback = jest.fn();
		EventHandler.subscribe(eventName, callback);
		expect(EventHandler["_events"].get(eventName)).toEqual([callback]);
	});
	it("should subscribe to multiple events with a single callback", () => {
		const eventNames = ["event1", "event2"];
		const callback = jest.fn();
		EventHandler.subscribe(eventNames, callback);
		expect(EventHandler["_events"].get(eventNames[0])).toEqual([callback]);
		expect(EventHandler["_events"].get(eventNames[1])).toEqual([callback]);
	});
	it("should subscribe to a single event with multiple callbacks", () => {
		const eventName = "event1";
		const callbacks = [jest.fn(), jest.fn()];
		EventHandler.subscribe(eventName, callbacks);
		expect(EventHandler["_events"].get(eventName)).toEqual(callbacks);
	});
	it("should throw an error when trying to bind events to functions", () => {
		const eventName = ["event1"];
		const callback = [jest.fn()];
		expect(() => {
			EventHandler.subscribe(eventName, callback);
		}).toThrow("Unable to bind events to functions");
	});
	it("should unsubscribe from a single event with a single callback", () => {
		const eventName = "event1";
		const callback = jest.fn();
		EventHandler.subscribe(eventName, callback);
		EventHandler.unsubscribe(eventName, callback);
		expect(EventHandler["_events"].get(eventName)).toEqual([]);
	});
	it("should unsubscribe from multiple events with a single callback", () => {
		const eventNames = ["event1", "event2"];
		const callback = jest.fn();
		EventHandler.subscribe(eventNames, callback);
		EventHandler.unsubscribe(eventNames, callback);
		expect(EventHandler["_events"].get(eventNames[0])).toEqual([]);
		expect(EventHandler["_events"].get(eventNames[1])).toEqual([]);
	});
	it("should unsubscribe from a single event with multiple callbacks", () => {
		const eventName = "event1";
		const callbacks = [jest.fn(), jest.fn()];
		EventHandler.subscribe(eventName, callbacks);
		EventHandler.unsubscribe(eventName, callbacks);
		expect(EventHandler["_events"].get(eventName)).toEqual([]);
	});
	it("should throw an error when trying to unbind events from functions", () => {
		const eventName = ["event1"];
		const callback = [jest.fn()];
		expect(() => {
			EventHandler.unsubscribe(eventName, callback);
		}).toThrow("Unable to unbind events from functions");
	});
	it("should trigger event callbacks", () => {
		const eventName = "event1";
		const args = [1, "two", true];
		const callback1 = jest.fn();
		const callback2 = jest.fn();
		EventHandler.subscribe(eventName, callback1);
		EventHandler.subscribe(eventName, callback2);
		EventHandler["triggerEventCallbacks"](eventName, args);
		expect(callback1).toHaveBeenCalledWith(...args);
		expect(callback2).toHaveBeenCalledWith(...args);
	});
});
