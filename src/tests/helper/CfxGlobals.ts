declare global {
	function setTick(cb: Function): number;
	function clearTick(tick: number): void;
	function onNet(eventName: string, callback: Function): void;
}
// @ts-ignore
global.exports = { Icarus: { GetConfig: () => [] } };

global.setTick = (_: Function) => Math.floor(Math.random() * 1000);
global.clearTick = (_: number) => {};
// @ts-ignore-unused
global.onNet = (eventName: string, callback: Function) => {};

export {};
