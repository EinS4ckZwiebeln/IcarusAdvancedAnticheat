declare global {
	function GetCurrentResourceName(): string;
	function GetResourceMetadata(resourceName: string, metadataKey: string, index: number): string;
}

global.GetCurrentResourceName = () => "Icarus";
global.GetResourceMetadata = (resourceName: string, metadataKey: string, index: number): string => {
	if (resourceName === "Icarus" && metadataKey === "version" && index === 0) {
		return "1.0.0";
	} else {
		return "";
	}
};

export {};
