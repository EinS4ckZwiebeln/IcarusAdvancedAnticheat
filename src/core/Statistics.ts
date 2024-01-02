import { KvpStorage } from "../util/enum/KvpStorage";

export class Statistics {
	private static readonly _daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

	private static _weekViolations: number[] = JSON.parse(GetResourceKvpString(KvpStorage.VIOLATIONS_WEEK) || "[]");
	private static _sessionViolations: number = 0;

	public static getSessionViolations(): number {
		return this._sessionViolations;
	}

	public static incrementSessionViolations(): void {
		this._sessionViolations++;
	}

	public static getWeeklyViolations() {
		const days: string[] = [];
		const violations: number[] = [];
		const currentDate = new Date();

		for (let i = 6; i >= 0; i--) {
			const localDate = new Date(currentDate);
			localDate.setDate(currentDate.getDate() - i);

			const dayOfWeek = this._daysOfWeek[localDate.getDay()];
			const weekViolation = this._weekViolations[localDate.getDate()] || 0;

			days.push(dayOfWeek);
			violations.push(weekViolation);
		}

		return { days, violations };
	}

	public static incrementWeeklyViolations(): void {
		const currentDate = new Date();
		const todaysDate = currentDate.getDate();
		this._weekViolations[todaysDate] = (this._weekViolations[todaysDate] || 0) + 1;
		// Ensure that the kvp storage won't grow on forever
		const saveWorthy = [];
		for (let i = 6; i >= 0; i--) {
			const localDate = new Date(currentDate);
			localDate.setDate(currentDate.getDate() - i);
			saveWorthy.push(this._weekViolations[localDate.getDate()] || 0);
		}
		SetResourceKvpNoSync(KvpStorage.VIOLATIONS_WEEK, JSON.stringify(saveWorthy));
		FlushResourceKvp();
	}
}
