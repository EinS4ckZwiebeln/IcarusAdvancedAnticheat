declare global {
	// @ts-ignore
	var exports: { Icarus: { GetConfig: () => []; BanPlayer: () => {} } };
	// Ticking
	function setTick(cb: Function): number;
	function clearTick(tick: number): void;
	// Event handling
	function on(eventName: string, callback: Function): void;
	function onNet(eventName: string, callback: Function): void;
	// Event emitting
	function emit(eventName: string, ...args: any[]): void;
	function emitNet(eventName: string, ...args: any[]): void;
}
// @ts-ignore
global.exports = { Icarus: { GetConfig: () => [], BanPlayer: () => {} } };
// Ticking
global.setTick = (_: Function) => Math.floor(Math.random() * 1000);
global.clearTick = (_: number) => {};
// Event handling
global.on = (_: string, __: Function) => {};
global.onNet = (_: string, __: Function) => {};
// Event emitting
global.emit = (_: string, ...__: any[]) => {};
global.emitNet = (_: string, ...__: any[]) => {};

export {};
