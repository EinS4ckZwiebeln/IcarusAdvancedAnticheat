enum PageName {
	PAGE_NONE = "NONE",
	PAGE_DASHBOARD = "DASHBOARD",
	PAGE_MODULES = "MODULES",
	PAGE_VIOLATIONS = "VIOLATIONS",
}

class NuiCallbackLayer {
	private readonly Delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

	private _updateTick: number = 0;
	private _pageName: string = PageName.PAGE_NONE;

	constructor() {
		this.updatePageNameNuiCallback();
		this.addServerComEvents();
		this.addNuiCallbacks();
	}

	private updatePageNameNuiCallback(): void {
		RegisterNuiCallbackType("updatePage");
		on("__cfx_nui:updatePage", (data: any) => {
			this._pageName = data.updatePage;
			emitNet("icarus:requestData", this._pageName);
		});
	}

	private addServerComEvents(): void {
		onNet("icarus:receiveData", (pageName: PageName, data: any) => {
			SendNUIMessage({
				action: "UPDATE",
				pageName: pageName,
				data: data,
			});
		});

		onNet("icarus:openUI", () => {
			SendNUIMessage({
				action: "OPEN",
			});
			SetNuiFocus(true, true);
			// Set current page to dashbaord and request UI data in loop
			this._pageName = PageName.PAGE_DASHBOARD;
			this._updateTick = setTick(async () => {
				if (this._pageName !== PageName.PAGE_NONE) emitNet("icarus:requestData", this._pageName);
				await this.Delay(5000);
			});
		});

		onNet("icarus:reviveMyself", () => {
			const ped = PlayerPedId();
			const coords = GetEntityCoords(ped, false);
			NetworkResurrectLocalPlayer(coords[0], coords[1], coords[2], 0.0, false, false);
		});

		onNet("icarus:healMyself", () => {
			const ped = PlayerPedId();
			SetEntityHealth(ped, GetEntityMaxHealth(ped));
		});
	}

	private addNuiCallbacks(): void {
		RegisterNuiCallbackType("closeUI");
		on("__cfx_nui:closeUI", () => {
			SendNUIMessage({
				action: "CLOSE",
			});
			clearTick(this._updateTick);
			SetNuiFocus(false, false);
			this._pageName = PageName.PAGE_NONE;
		});

		RegisterNuiCallbackType("reviveAll");
		on("__cfx_nui:reviveAll", () => {
			emitNet("icarus:reviveAll");
		});

		RegisterNuiCallbackType("healAll");
		on("__cfx_nui:healAll", () => {
			emitNet("icarus:healAll");
		});

		RegisterNuiCallbackType("reloadModules");
		on("__cfx_nui:reloadModules", () => {
			emitNet("icarus:reloadModules");
		});

		RegisterNuiCallbackType("loadModule");
		on("__cfx_nui:loadModule", (data: any) => {
			emitNet("icarus:loadModule", data.module);
		});

		RegisterNuiCallbackType("unloadModule");
		on("__cfx_nui:unloadModule", (data: any) => {
			emitNet("icarus:unloadModule", data.module);
		});
	}
}

// Program entry point
new NuiCallbackLayer();
