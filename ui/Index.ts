import { Buttons } from "./Buttons";
import { Utility } from "./Utility";
import { DashboardChart } from "./charts/DashboardChart";
import { DashboardData, ModulesData } from "./types/PageType";

enum EventDataAction {
	UPDATE_UI = "UPDATE",
	OPEN_UI = "OPEN",
	CLOSE_UI = "CLOSE",
}

class Index {
	private readonly _buttons = new Buttons();
	private readonly _dashboardChart = new DashboardChart();

	constructor() {
		setTimeout(async () => {
			// Wait for jQuery to be ready
			while (!jQuery) {
				Utility.Delay(0);
			}
			$("#ui").hide(); // Required for chart.js since d-none will glitch it out
			this.createToggleUIEventListener();
			this.createControlsEventListener();

			this._buttons.register();
		}, 0);
	}

	private createToggleUIEventListener(): void {
		const UI = $("#ui");
		$(window).on("message", (event) => {
			const eventData = (event.originalEvent as any).data;
			switch (eventData.action) {
				case EventDataAction.UPDATE_UI:
					// TODO: Load data from server
					this.updateUI(eventData.pageName, eventData.data);
					break;
				case EventDataAction.OPEN_UI:
					UI.fadeIn(200, "swing", () => {
						UI.show();
					});
					break;
				case EventDataAction.CLOSE_UI:
					UI.fadeOut(200, "swing", () => {
						UI.hide();
					});
					break;
				default:
					throw new Error("Received impossible event action");
			}
		});
	}

	private createControlsEventListener(): void {
		$(document).on("keyup", (event) => {
			const key = event.originalEvent?.which;
			switch (key) {
				case 8:
				case 27:
					$.post(`https://${Utility.RESOURCE_NAME}/closeUI`);
					break;
				default:
					return;
			}
		});
	}

	private async updateUI(pageName: string, data: any): Promise<void> {
		// Update navbar version text
		$("#version").text(`v${data.version}`);

		switch (pageName) {
			case "DASHBOARD":
				data = data as DashboardData;
				// Update dashboard elements
				$("#player-count").html(`<i class="fa fa-user" aria-hidden="true"></i> ${data.players}`);
				$("#modules-count").html(`<i class="fa fa-th" aria-hidden="true"></i> ${data.modulesAmount}`);
				$("#violations-count").html(`<i class="fa fa-flag" aria-hidden="true"></i> ${data.violations}`);
				$("#technical-details").html(`<b>CPU</b>: ${data.cpuModel} <b>Platform</b>: ${data.platform} <b>Memory</b>: ${data.nodeMemory}`);
				this._dashboardChart.updateDashboardChart(data.chartDays, data.chartValue);
				break;

			case "MODULES":
				data = data as ModulesData;
				// Update module elements
				$("#active-modules").html(`<i class="fa fa-shield" aria-hidden="true"></i> ${data.activeModules}`);
				$("#disabled-modules").html(`<i class="fa fa-exclamation-circle" aria-hidden="true"></i> ${data.disabledModules}`);
				$("#unloaded-modules").html(`<i class="fa fa-clock-o" aria-hidden="true"></i> ${data.unloadedModules}`);

				const modulesTable = $("#modules-table");
				modulesTable.empty();

				for (let i = 0; i < data.moduleData.length; i++) {
					const module = data.moduleData[i];
					modulesTable.append(`
						<tr>
							<th class="card-text-color" scope="row">${i + 1}</th>
							<td class="card-text-color">${module.name}</td>
							<td class="card-text-color">${module.type}</td>
							<td class="card-text-color">${module.status ? "Loaded" : "Unloaded"}</td>
							<td class="card-text-color">
								<a href="#" class="btn btn-primary" module="${module.name}"><i class="fa fa-link" aria-hidden="true"></i> Load</a>
								<a href="#" class="btn btn-primary" module="${module.name}"><i class="fa fa-chain-broken" aria-hidden="true"></i> Unload</a>
							</td>
						</tr>
					`);
				}
				break;
			case "VIOLATIONS":
				break;
			default:
				return;
		}

		// Update violation elements
		// ...
	}
}

// Program entry point
new Index();
