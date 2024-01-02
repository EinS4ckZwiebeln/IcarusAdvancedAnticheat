import { KvpStorage } from "../util/enum/KvpStorage";

export class Statistics {
	private static _sessionViolations: number = 0;
	private static _weekViolations: number[] = JSON.parse(GetResourceKvpString(KvpStorage.VIOLATIONS_WEEK) || "[]");

	public static getSessionViolations(): number {
		return this._sessionViolations;
	}

	public static incrementSessionViolations(): void {
		this._sessionViolations++;
	}

	public static getWeekViolations(): { days: string[]; counts: number[] } {
		const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
		const days: string[] = [];
		const counts: number[] = [];

		// Rotate the array so that today is always the last element
		const rotatedWeekViolations = [...this._weekViolations.slice(new Date().getDay()), ...this._weekViolations.slice(0, new Date().getDay())];

		rotatedWeekViolations.forEach((count, index) => {
			days.push(daysOfWeek[index]);
			counts.push(count);
		});
		counts.reverse();
		return { days, counts };
	}

	public static incrementWeekViolations(): void {
		const weekDay = new Date().getDay();
		// Ensure the _weekViolations array has enough elements for the current day
		while (this._weekViolations.length <= weekDay) {
			this._weekViolations.push(0);
		}
		this._weekViolations[weekDay]++;
		this._weekViolations.push(this._weekViolations.splice(weekDay, 1)[0] || 0);
		// Save the updated violations to storage
		SetResourceKvpNoSync(KvpStorage.VIOLATIONS_WEEK, JSON.stringify(this._weekViolations));
		FlushResourceKvp();
	}
}
