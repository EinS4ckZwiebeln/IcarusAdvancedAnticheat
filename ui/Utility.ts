export class Utility {
	public static readonly RESOURCE_NAME: string = location.host.slice(8);
	public static readonly Delay = (ms: number) => new Promise((res) => setTimeout(res, ms));
}
