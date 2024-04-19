declare global {
	function GetCurrentResourceName(): string;
	function GetResourceMetadata(resourceName: string, metadataKey: string, index: number): string;
	function GetResourcePath(resourceName: string): string;
	function GetHashKey(model: string): number;
}

global.GetCurrentResourceName = () => "Icarus";
global.GetResourceMetadata = (resourceName: string, metadataKey: string, index: number): string => {
	if (resourceName === "Icarus" && metadataKey === "version" && index === 0) {
		return "1.0.0";
	} else {
		throw new Error("Invalid metadata key");
	}
};
global.GetResourcePath = (_: string): string => "./";
global.GetHashKey = (_: string): number => 0;

export {};
