enum PageName {
	PAGE_NONE = "NONE",
	PAGE_DASHBOARD = "DASHBOARD",
	PAGE_MODULES = "MODULES",
	PAGE_VIOLATIONS = "VIOLATIONS",
}

class NuiCallbackLayer {
	private _pageName: string = PageName.PAGE_NONE;

	constructor() {
		this.updatePageNameNuiCallback();
		this.addServerComEvents();
		this.addNuiCallbacks();
	}

	private updatePageNameNuiCallback(): void {
		RegisterNuiCallbackType("updatePage");
		on("__cfx_nui:updatePage", (data: { updatePage: string }) => {
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
			// Set current page to dashbaord and request UI data for all pages
			this._pageName = PageName.PAGE_DASHBOARD;
			for (const pageName of Object.values(PageName)) {
				emitNet("icarus:requestData", pageName);
			}
			SendNUIMessage({
				action: "OPEN",
			});
			SetNuiFocus(true, true);
		});

		onNet("icarus:reviveMyself", () => {
			const ped = PlayerPedId();
			const coords = GetEntityCoords(ped, false);
			NetworkResurrectLocalPlayer(coords[0], coords[1], coords[2], GetEntityHeading(ped), false, false);
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

		RegisterNuiCallbackType("wipeEntities");
		on("__cfx_nui:wipeEntities", () => {
			ExecuteCommand("wipe");
		});

		RegisterNuiCallbackType("reloadModules");
		on("__cfx_nui:reloadModules", () => {
			emitNet("icarus:reloadModules");
		});

		RegisterNuiCallbackType("loadModule");
		on("__cfx_nui:loadModule", (data: { module: string }) => {
			emitNet("icarus:loadModule", data.module);
		});

		RegisterNuiCallbackType("unloadModule");
		on("__cfx_nui:unloadModule", (data: { module: string }) => {
			emitNet("icarus:unloadModule", data.module);
		});
	}
}

// Program entry point
new NuiCallbackLayer();
