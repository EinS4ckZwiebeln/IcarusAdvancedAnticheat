import { Chart, registerables } from "chart.js";

export class DashboardChart {
	private readonly _chart: Chart;

	constructor() {
		Chart.register(...registerables);
		this._chart = this.createDashboardChart();
	}

	private createDashboardChart(): Chart {
		const ctx: any = $("dashboard-chart");
		return new Chart(ctx, {
			type: "line",
			data: {
				labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
				datasets: [
					{
						label: "# Violations",
						data: [0, 0, 0, 0, 0, 0, 0],
						backgroundColor: ["rgba(128, 128, 255, 0.2)"],
						fill: true,
						borderColor: ["rgba(128, 128, 255, 0.8)"],
						borderWidth: 2,
						tension: 0.4,
					},
				],
			},
			options: {
				responsive: true,
				maintainAspectRatio: false,
				scales: {
					y: {
						ticks: {
							stepSize: 1,
						},
					},
				},
			},
		});
	}

	public updateDashboardChart(labels: string[], data: number[]) {
		this._chart.data.labels = labels;
		this._chart.data.datasets[0].data = data;
		this._chart.update();
	}
}
