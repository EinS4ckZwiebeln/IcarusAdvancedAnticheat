import { KvpStorage } from "../util/enum/KvpStorage";

export class Statistics {
	private static readonly _daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
	private static readonly _currentdate = new Date();

	private static _violations: number[] = JSON.parse(GetResourceKvpString(KvpStorage.VIOLATIONS_TIMESPAN) || "[]");
	private static _sessionViolations: number = 0;

	public static getSessionViolations(): number {
		return this._sessionViolations;
	}

	public static incrementSessionViolations(): void {
		this._sessionViolations++;
	}

	public static getWeeklyViolations(): { days: string[]; violations: number[] } {
		const days: string[] = [];
		const violations: number[] = [];

		for (let i = 6; i >= 0; i--) {
			const localDate = new Date(this._currentdate);
			localDate.setDate(this._currentdate.getDate() - i);

			const dayOfWeek = this._daysOfWeek[localDate.getDay()];
			const weekViolation = this._violations[localDate.getDate()] || 0;

			days.push(dayOfWeek);
			violations.push(weekViolation);
		}

		return { days, violations };
	}

	public static getMonthlyViolations(): { days: string[]; violations: number[] } {
		const days: string[] = [];
		const violations: number[] = [];

		for (let i = 29; i >= 0; i--) {
			const localDate = new Date(this._currentdate);
			localDate.setDate(this._currentdate.getDate() - i);

			const dayOfWeek = this._daysOfWeek[localDate.getDay()];
			const weekViolation = this._violations[localDate.getDate()] || 0;

			days.push(dayOfWeek);
			violations.push(weekViolation);
		}

		return { days, violations };
	}

	public static async incrementWeeklyViolations(): Promise<void> {
		const todaysDate = this._currentdate.getDate();
		this._violations[todaysDate] = (this._violations[todaysDate] || 0) + 1;
		SetResourceKvpNoSync(KvpStorage.VIOLATIONS_TIMESPAN, JSON.stringify(this._violations));
		FlushResourceKvp();
	}
}
