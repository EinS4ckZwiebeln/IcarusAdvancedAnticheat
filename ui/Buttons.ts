import { Utility } from "./Utility";

export class Buttons {
	private _unloadedModules: number = 0;

	public getUnloadedModules(): number {
		return this._unloadedModules;
	}

	public register(): void {
		this.addReviveAllEventListener();
		this.addHealAllEventListener();
		this.addReloadModulesEventListener();
		this.addNavbarEventListener();
	}

	private addReviveAllEventListener(): void {
		const reviveAllBtn = $("#revive-all");
		reviveAllBtn.on("click", () => {
			$.post(`https://${Utility.RESOURCE_NAME}/reviveAll`);
		});
	}

	private addHealAllEventListener(): void {
		const healAllBtn = $("#heal-all");
		healAllBtn.on("click", () => {
			$.post(`https://${Utility.RESOURCE_NAME}/healAll`);
		});
	}

	private addReloadModulesEventListener(): void {
		const reloadModulesBtn = $("#reload-modules");
		reloadModulesBtn.on("click", () => {
			$.post(`https://${Utility.RESOURCE_NAME}/reloadModules`);
		});
	}

	private addNavbarEventListener(): void {
		const dashboardBtn = $("#dashboard");
		const modulesBtn = $("#modules");
		const violationsBtn = $("#violations");

		const dashboardUI = $("#ui-dashboard");
		const modulesUI = $("#ui-modules");
		const violationsUI = $("#ui-violations");

		dashboardBtn.on("click", () => {
			modulesUI.addClass("d-none");
			violationsUI.addClass("d-none");
			dashboardUI.removeClass("d-none");
			$.post(`https://${Utility.RESOURCE_NAME}/updatePage`, JSON.stringify({ updatePage: "DASHBOARD" }));
		});

		modulesBtn.on("click", () => {
			dashboardUI.addClass("d-none");
			violationsUI.addClass("d-none");
			modulesUI.removeClass("d-none");
			$.post(`https://${Utility.RESOURCE_NAME}/updatePage`, JSON.stringify({ updatePage: "MODULES" }));
		});

		violationsBtn.on("click", () => {
			modulesUI.addClass("d-none");
			dashboardUI.addClass("d-none");
			violationsUI.removeClass("d-none");
			$.post(`https://${Utility.RESOURCE_NAME}/updatePage`, JSON.stringify({ updatePage: "VIOLATIONS" }));
		});

		const navLinks = $(".nav-link");
		navLinks.on("click", (event) => {
			navLinks.each((_, elem) => {
				$(elem).removeClass("active");
			});
			$(event.target).addClass("active");
		});

		const githubBtn = $("#github");
		githubBtn.on("click", () => {
			(window as any).invokeNative("openUrl", "https://github.com/EinS4ckZwiebeln/IcarusAdvancedAnticheat");
		});
	}
}
