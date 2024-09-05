import "../helper/CfxGlobals";
import "../helper/MockConfig";
import "../helper/MockNatives";
import { RPCTransmitter } from "../../src/server/core/rpc/RPCTransmitter";

describe("RPCTransmitter", () => {
	beforeAll(() => {
		jest.useFakeTimers();
		jest.spyOn(global, "setTimeout");
	});
	afterAll(() => {
		jest.useRealTimers();
	});
	it("should invoke network natives when making native call", () => {
		global.onNet = jest.fn();
		global.emitNet = jest.fn();
		const rpcTransmitter = new RPCTransmitter();
		rpcTransmitter.makeNativeCall(1, "0x123ABC", "int");
		expect(onNet).toHaveBeenCalledWith(expect.any(String), expect.any(Function));
		expect(emitNet).toHaveBeenCalledWith("rpc:invoke", 1, expect.any(String), "0x123ABC", "int");
	});
	it("should drop player on timeout", async () => {
		global.DropPlayer = jest.fn();
		global.GetPlayerPed = jest.fn().mockReturnValue(65535);
		global.getPlayers = jest.fn().mockReturnValue(["1"]);
		const reject = jest.fn();
		const rpcTransmitter = new RPCTransmitter();
		rpcTransmitter["handleRPCTimeout"](reject, 1);
		expect(global.DropPlayer).toHaveBeenCalled();
		expect(reject).toHaveBeenCalled();
	});
	it("should reject if target not equals source", async () => {
		global.source = 1;
		global.removeEventListener = jest.fn();
		const reject = jest.fn();
		const timer = setTimeout(() => {}, 0);
		const rpcTransmitter = new RPCTransmitter();
		rpcTransmitter["handleRPCReceive"]("test", 2, timer, jest.fn(), reject)(true);
		expect(reject).toHaveBeenCalledWith(expect.any(Error));
	});
	it("should resolve and clear timer and remove eventhandler", async () => {
		global.removeEventListener = jest.fn();
		global.clearTimeout = jest.fn();
		const resolve = jest.fn();
		const timer = setTimeout(() => {}, 0);
		const rpcTransmitter = new RPCTransmitter();
		const callback = rpcTransmitter["handleRPCReceive"]("test", 1, timer, resolve, jest.fn());
		callback(true);
		expect(resolve).toHaveBeenCalledWith(true);
		expect(clearTimeout).toHaveBeenCalledWith(timer);
		expect(global.removeEventListener).toHaveBeenCalledWith("test", callback);
	});
});
