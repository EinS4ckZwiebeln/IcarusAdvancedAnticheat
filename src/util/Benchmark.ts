export class Benchmark {
	/**
	 * Throws an error if an attempt is made to instantiate the class.
	 */
	constructor() {
		throw new Error("Benchmark is a static class and cannot be instantiated.");
	}

	public static benchmark(iterations: number, func: Function, ...args: any[]): void {
		const funcName = func.name ?? "arrowFunction";
		console.time(funcName);
		// Use 'var' instead of 'let' to reduce possible overhead
		for (var i = 0; i < iterations; i++) {
			func(...args);
		}
		console.timeEnd(funcName);
	}

	public static getMockedPlayers(amount: number): string[] {
		const players = getPlayers();
		return Array(amount).fill(players.length > 0 ? players[0] : "1");
	}
}
