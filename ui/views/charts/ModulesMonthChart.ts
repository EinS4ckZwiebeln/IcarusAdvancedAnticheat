import { Chart, registerables } from "chart.js";
import { Utility } from "../../services/Utility";

export class ViolationsMonthChart {
	private readonly _chart: Chart;

	constructor() {
		Chart.register(...registerables);
		this._chart = this.createModulesMonthChart();
	}

	private createModulesMonthChart(): Chart {
		const ctx: any = $("#violations-month-chart")[0];
		return new Chart(ctx, {
			type: "line",
			data: {
				labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
				datasets: [
					{
						label: "# Violations",
						data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
						backgroundColor: ["rgba(128, 128, 255, 0.2)"],
						fill: true,
						borderColor: ["rgba(128, 128, 255, 0.8)"],
						borderWidth: 2,
						tension: 0.4,
					},
					{
						label: "# Average",
						data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
						backgroundColor: ["rgba(3, 116, 255, 0.2)"],
						fill: true,
						borderColor: ["rgba(3, 116, 255, 0.8)"],
						borderWidth: 2,
						tension: 0.4,
					},
					{
						label: "# Median",
						data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
						backgroundColor: ["rgba(249, 33, 76, 0.2)"],
						fill: true,
						borderColor: ["rgba(249, 33, 76, 0.8)"],
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

	public updateModulesMonthChart(labels: string[], data: number[]) {
		this._chart.data.labels = labels;
		this._chart.data.datasets[0].data = data;
		for (let i = 0; i < data.length; i++) {
			this._chart.data.datasets[1].data[i] = Utility.getAverageAtIndex(data, i);
			this._chart.data.datasets[2].data[i] = Utility.getMedianAtIndex(data, i);
		}
		this._chart.update();
	}
}
