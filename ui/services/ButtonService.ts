import { AbstractButton } from "./AbstractButton";

export class ButtonService {
	private readonly _registeredButtons: Set<AbstractButton> = new Set<AbstractButton>();

	public registerButton(button: AbstractButton): void {
		if (!this._registeredButtons.has(button)) {
			button.register();
			this._registeredButtons.add(button);
		} else {
			throw new Error("Cannot register the same button twice");
		}
	}
}
