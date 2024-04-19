declare global {
	// @ts-ignore
	var exports: { Icarus: { GetConfig: () => []; BanPlayer: () => {} } };
	function setTick(cb: Function): number;
	function clearTick(tick: number): void;
	function onNet(eventName: string, callback: Function): void;
}
// @ts-ignore
global.exports = { Icarus: { GetConfig: () => [], BanPlayer: () => {} } };

global.setTick = (_: Function) => Math.floor(Math.random() * 1000);
global.clearTick = (_: number) => {};
global.onNet = (_: string, __: Function) => {};

export {};
