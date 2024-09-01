import "reflect-metadata";

// @ts-ignore
const _exports: CitizenExports = {};
_exports["Icarus"] = {
	GetConfig: () => [],
	BanPlayer: () => {},
};
_exports["screenshot-basic"] = {
	requestClientScreenshot: () => {
		return {
			fileName: "mock.png",
			filePath: "./",
		};
	},
};

interface CitizenExports {
	(exportKey: string | number, exportFunction: Function): void;
	[resourceName: string]: {
		[exportKey: string | number]: Function;
	};
}

declare global {
	var exports: CitizenExports;
	// Ticking
	function setTick(cb: Function): number;
	function clearTick(tick: number): void;
	// Event handling
	function on(eventName: string, callback: Function): void;
	function onNet(eventName: string, callback: Function): void;
	// Event emitting
	function emit(eventName: string, ...args: any[]): void;
	function emitNet(eventName: string, ...args: any[]): void;
	// Entities
	function getPlayers(): string[];
}
global.exports = _exports;
// Ticking
global.setTick = (_: Function) => Math.floor(Math.random() * 1000);
global.clearTick = (_: number) => {};
// Event handling
global.on = (_: string, __: Function) => {};
global.onNet = (_: string, __: Function) => {};
// Event emitting
global.emit = (_: string, ...__: any[]) => {};
global.emitNet = (_: string, ...__: any[]) => {};
// Entities
global.getPlayers = () => ["1"];

export {};
