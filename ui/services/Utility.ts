export class Utility {
	public static readonly RESOURCE_NAME: string = location.host.slice(8);
	public static readonly Delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

	public static getAverageAtIndex(values: number[], index: number): number {
		const section = values.slice(index);
		const sectionSum = section.reduce((a: number, b: number) => a + b, 0);
		return sectionSum / section.length || 0;
	}

	public static getMedianAtIndex(values: number[], index: number): number {
		const section = values.slice(index).sort((a: number, b: number) => a - b);
		const half = Math.floor(section.length / 2);
		return section.length % 2 ? section[half] : (section[half - 1] + section[half]) / 2;
	}
}
