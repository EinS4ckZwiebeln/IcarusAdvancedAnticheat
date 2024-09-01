import crypto from "crypto";
import { singleton } from "tsyringe";
import { ReturnType } from "../../Types";

@singleton()
export class RPCTransmitter {
	private readonly RPC_TIMEOUT = 5000;

	private handleRPCReceive<T>(name: string, target: number, timer: NodeJS.Timeout, resolve: (_: T | undefined) => void, reject: (_?: unknown) => void) {
		const callback = (result: T | undefined) => {
			if (source !== target) {
				reject(new Error("RPC source does not match target"));
				return;
			}
			resolve(result);
			clearTimeout(timer);
			removeEventListener(name, callback);
		};
		return callback;
	}

	private handleRPCTimeout(reject: (reason?: unknown) => void, target: number): void {
		const targetSrc = target.toString();
		if (getPlayers().includes(targetSrc) && GetPlayerPed(targetSrc) !== 0) {
			DropPlayer(targetSrc, "RPC Timeout");
		}
		reject(new Error("RPC Timeout"));
	}

	public makeNativeCall<T>(target: number, native: string, type: ReturnType, ...args: InputArgument[]): Promise<T | undefined> {
		return new Promise((resolve, reject) => {
			const receiverName = `rpc:${crypto.randomBytes(4).toString("hex")}`;
			const timeoutId = setTimeout(() => this.handleRPCTimeout(reject, target), this.RPC_TIMEOUT + 2 * GetPlayerPing(target.toString()));
			onNet(receiverName, this.handleRPCReceive(receiverName, target, timeoutId, resolve, reject));
			emitNet("rpc:invoke", target, receiverName, native, type, ...args);
		});
	}
}
