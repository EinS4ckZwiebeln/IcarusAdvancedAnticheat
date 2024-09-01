onNet("rpc:invoke", (receiverName: string, native: string, type: string, args: InputArgument[]) => {
	try {
		let result: unknown;
		switch (type) {
			case "int":
				result = Citizen.invokeNative(native, args, Citizen.resultAsInteger());
				break;
			case "float":
				result = Citizen.invokeNative(native, args, Citizen.resultAsFloat());
				break;
			case "vector":
				result = Citizen.invokeNative(native, args, Citizen.resultAsVector());
				break;
			case "string":
				result = Citizen.invokeNative(native, args, Citizen.resultAsString());
				break;
			default:
				result = Citizen.invokeNative(native, args, Citizen.returnResultAnyway());
				break;
		}
		emitNet(receiverName, result);
	} catch (error: unknown) {
		emitNet(receiverName, undefined);
	}
});
