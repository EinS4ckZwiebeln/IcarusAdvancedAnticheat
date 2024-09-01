import crypto from "crypto";
import { singleton } from "tsyringe";
import { ReturnType } from "../../Types";

@singleton()
export class RPCTransmitter {
	private readonly RPC_TIMEOUT = 5000;

	/**
	 * Handles the reception of an RPC (Remote Procedure Call).
	 *
	 * @template T - The type of the result returned by the RPC.
	 * @param name - The name of the RPC.
	 * @param target - The target of the RPC.
	 * @param timer - The timer used to handle timeouts.
	 * @param resolve - The function to call when the RPC is resolved.
	 * @param reject - The function to call when the RPC is rejected.
	 * @returns A callback function that handles the result of the RPC.
	 */
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

	/**
	 * Handles the timeout for an RPC call.
	 * If the target player is still connected and has a valid player ped, it drops the player and rejects the promise with an "RPC Timeout" error.
	 * @param reject - The function to reject the promise.
	 * @param target - The target player's identifier.
	 */
	private handleRPCTimeout(reject: (reason?: unknown) => void, target: number): void {
		const targetSrc = target.toString();
		if (getPlayers().includes(targetSrc) && GetPlayerPed(targetSrc) !== 0) {
			DropPlayer(targetSrc, "RPC Timeout");
		}
		reject(new Error("RPC Timeout"));
	}

	/**
	 * Makes a native call to the specified target.
	 *
	 * @template T - The type of the expected return value.
	 * @param target - The target of the native call.
	 * @param native - The name of the native function to call.
	 * @param type - The return type of the native function.
	 * @param args - The arguments to pass to the native function.
	 * @returns A promise that resolves with the return value of the native function, or undefined if the promise is rejected.
	 */
	public makeNativeCall<T>(target: number, native: string, type: ReturnType, ...args: InputArgument[]): Promise<T | undefined> {
		return new Promise((resolve, reject) => {
			const receiverName = `rpc:${crypto.randomBytes(4).toString("hex")}`;
			const timeoutId = setTimeout(() => this.handleRPCTimeout(reject, target), this.RPC_TIMEOUT + 2 * GetPlayerPing(target.toString()));
			onNet(receiverName, this.handleRPCReceive(receiverName, target, timeoutId, resolve, reject));
			emitNet("rpc:invoke", target, receiverName, native, type, ...args);
		});
	}
}
