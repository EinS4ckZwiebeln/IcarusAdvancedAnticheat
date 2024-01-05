import { AbstractButton } from "../AbstractButton";

enum RowIndex {
	INDEX_NUM = 0,
	INDEX_NAME = 1,
	INDEX_TYPE = 2,
	INDEX_STATUS = 3,
}

export class ModuleSortButtons extends AbstractButton {
	public register(): void {
		let isSortedByName = false;
		$("#sort-name").on("click", (event) => {
			this.sortModulesTable(RowIndex.INDEX_NAME, isSortedByName);
			this.updateSortingIcon($(event.target), isSortedByName);
			isSortedByName = !isSortedByName;
		});

		let isSortedByType = false;
		$("#sort-type").on("click", (event) => {
			this.sortModulesTable(RowIndex.INDEX_TYPE, isSortedByType);
			this.updateSortingIcon($(event.target), isSortedByType);
			isSortedByType = !isSortedByType;
		});

		let isSortedByStatus = false;
		$("#sort-status").on("click", (event) => {
			this.sortModulesTable(RowIndex.INDEX_STATUS, isSortedByStatus);
			this.updateSortingIcon($(event.target), isSortedByStatus);
			isSortedByStatus = !isSortedByStatus;
		});

		$("tbody").on("click", (event) => {
			$(event.target).parent().find("thead").find(".fa").remove();
		});
	}

	private async updateSortingIcon($element: JQuery<HTMLElement>, descending: boolean): Promise<void> {
		$element.parent().find(".fa").remove();
		const $arrowUp = $(`<i class="fa ${descending ? "fa-chevron-down" : "fa-chevron-up"} ms-2" aria-hidden="true"></i>`);
		$element.append($arrowUp);
	}

	private async sortModulesTable(cellIndex: number, descending: boolean): Promise<void> {
		const $modulesTable = $("#modules-table");
		// Sort the rows based on the specified criteria and order
		const rows = $modulesTable.find("tr").detach().toArray();
		rows.sort((a, b) => {
			const valueA = this.getCellValue(a, cellIndex);
			const valueB = this.getCellValue(b, cellIndex);
			return valueA.localeCompare(valueB, undefined, { numeric: true, sensitivity: "base" });
		});

		if (descending) {
			rows.reverse();
		}
		// Append the sorted rows back to the table
		$modulesTable.empty();
		$.each(rows, (index, row) => {
			$(row)
				.children("td")
				.eq(RowIndex.INDEX_NUM)
				.text(descending ? rows.length - index : index + 1);
			$modulesTable.append(row);
		});
	}

	private getCellValue(row: HTMLTableRowElement, cellIndex: number): string {
		return $(row).children("td").eq(cellIndex).text();
	}
}
