declare global {
	function setTick(cb: Function): number;
	function clearTick(tick: number): void;
}
// @ts-ignore
global.exports = { Icarus: { GetConfig: () => [] } };

global.setTick = (_: Function) => Math.floor(Math.random() * 1000);
global.clearTick = (_: number) => {};

export {};
