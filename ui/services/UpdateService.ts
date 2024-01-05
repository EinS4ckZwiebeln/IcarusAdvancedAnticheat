import { DashboardData, ModulesData } from "../types/PageType";
import { DashboardChart } from "../views/charts/DashboardChart";
import { TooltipService } from "./TooltipService";
import { Utility } from "./Utility";

export class UpdateService {
	private readonly _dashboardChart = new DashboardChart();
	private readonly _tooltipService: TooltipService;

	constructor(tooltipService: TooltipService) {
		this._tooltipService = tooltipService;
	}

	public async updateUI(pageName: string, data: any): Promise<void> {
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

				const $modulesTable = $("#modules-table");
				$modulesTable.empty();
				// Prevent lingering tooltips when table updates
				this._tooltipService.dispose();
				// Insert rows into modules table
				data.moduleData.forEach((module: any, index: number) => {
					const $row = $("<tr></tr>");
					$row.append(`<td class="card-text-color">${index + 1}</td>`);
					$row.append(`<td class="card-text-color">${module.name}</td>`);
					$row.append(`<td class="card-text-color">${module.type}</td>`);

					const isLoaded = module.status === "LOADED";
					$row.append(`<td class="card-text-color">${isLoaded ? "Loaded" : "Unloaded"}</td>`);

					// Add LOAD button and eventhandler
					const $btnCell = $('<td class="card-text-color"></td>');
					const $loadBtn = $(`<button type="button" class="btn btn-primary" data-bs-toggle="tooltip" title="Load module"><i class="fa fa-link" aria-hidden="true"></i></button>`);
					$loadBtn.on("click", async () => {
						$.post(`https://${Utility.RESOURCE_NAME}/loadModule`, JSON.stringify({ module: module.name }));
						$.post(`https://${Utility.RESOURCE_NAME}/updatePage`, JSON.stringify({ updatePage: "MODULES" }));
						$loadBtn.toggleClass("disabled");
					});
					// Add UNLAOD button and eventhandler
					const $unloadBtn = $(`<button type="button" class="btn btn-primary ms-3" data-bs-toggle="tooltip" title="Unload module"><i class="fa fa-chain-broken" aria-hidden="true"></i></button>`);
					$unloadBtn.on("click", async () => {
						$.post(`https://${Utility.RESOURCE_NAME}/unloadModule`, JSON.stringify({ module: module.name }));
						$.post(`https://${Utility.RESOURCE_NAME}/updatePage`, JSON.stringify({ updatePage: "MODULES" }));
						$unloadBtn.toggleClass("disabled");
					});

					if (isLoaded) {
						$loadBtn.addClass("disabled");
					} else {
						$unloadBtn.addClass("disabled");
					}

					$btnCell.append($loadBtn);
					$btnCell.append($unloadBtn);
					$row.append($btnCell);
					// Append final row to table element
					$modulesTable.append($row);

					// Update tooltips for newly created buttons
					this._tooltipService.update();
				});

				break;
			case "VIOLATIONS":
				break;
			default:
				return;
		}
	}
}
