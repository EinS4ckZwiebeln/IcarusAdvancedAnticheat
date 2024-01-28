import { AbstractButton } from "../AbstractButton";

export class CopyWebhookButton extends AbstractButton {
	public register(): void {
		$("#copy-webhook").on("click", () => {
			const $inputFormValue = $("#webhook").val()?.toString();
			if (!$inputFormValue) return;
			// Navigator clipboard is unfortunatly blocked
			const helper = document.createElement("textarea");
			helper.value = $inputFormValue;
			document.body.appendChild(helper);

			helper.select();
			document.execCommand("copy");
			document.body.removeChild(helper);
		});
	}
}
