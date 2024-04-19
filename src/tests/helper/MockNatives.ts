declare global {
	function GetCurrentResourceName(): string;
	function GetResourceMetadata(resourceName: string, metadataKey: string, index: number): string;
	function GetResourcePath(resourceName: string): string;
	function GetHashKey(model: string): number;
	function IsPlayerAceAllowed(source: string, permission: string): boolean;
	function GetResourceState(resourceName: string): string;
	function GetPlayerIdentifierByType(source: string, type: string): string;
	function GetPlayerName(source: string): string;
}

// Resource related functions
global.GetCurrentResourceName = () => "Icarus";
global.GetResourceMetadata = (resourceName: string, metadataKey: string, index: number): string => {
	if (resourceName === "Icarus" && metadataKey === "version" && index === 0) {
		return "1.0.0";
	} else {
		throw new Error("Invalid metadata key");
	}
};
global.GetResourcePath = (_: string): string => "./";
global.GetResourceState = (_: string) => "stopped";

// Player related functions
global.IsPlayerAceAllowed = (source: string, permission: string) => {
	return source === "0" && permission === "test.bypass";
};
global.GetPlayerIdentifierByType = (_: string, __: string) => "unknown";
global.GetPlayerName = (_: string) => "unknown";

// Other functions
global.GetHashKey = (_: string): number => 0;

export {};
