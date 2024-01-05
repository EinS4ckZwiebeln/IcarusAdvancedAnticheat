import { Utility } from "../Utility";
import { AbstractButton } from "../AbstractButton";

export class NavbarButtons extends AbstractButton {
	public register(): void {
		const dashboardUI = $("#ui-dashboard");
		const modulesUI = $("#ui-modules");
		const violationsUI = $("#ui-violations");

		$("#dashboard").on("click", () => {
			modulesUI.addClass("d-none");
			violationsUI.addClass("d-none");
			dashboardUI.removeClass("d-none");
			$.post(`https://${Utility.RESOURCE_NAME}/updatePage`, JSON.stringify({ updatePage: "DASHBOARD" }));
		});

		$("#modules").on("click", () => {
			dashboardUI.addClass("d-none");
			violationsUI.addClass("d-none");
			modulesUI.removeClass("d-none");
			$.post(`https://${Utility.RESOURCE_NAME}/updatePage`, JSON.stringify({ updatePage: "MODULES" }));
		});

		$("#violations").on("click", () => {
			modulesUI.addClass("d-none");
			dashboardUI.addClass("d-none");
			violationsUI.removeClass("d-none");
			$.post(`https://${Utility.RESOURCE_NAME}/updatePage`, JSON.stringify({ updatePage: "VIOLATIONS" }));
		});

		// Update highlighted navbar tabs/buttons
		const $navLinks = $(".nav-link");
		$navLinks.on("click", (event) => {
			$navLinks.each((_, elem) => {
				$(elem).removeClass("active");
			});
			$(event.target).addClass("active");
		});

		$("#github").on("click", (event) => {
			(window as any).invokeNative("openUrl", "https://github.com/EinS4ckZwiebeln/IcarusAdvancedAnticheat");
			$(event.target).removeClass("active");
		});
	}
}
