import { FFormArray } from "../components/f-form-array/f-form-array";
import { FFormObject } from "../components/f-form-object/f-form-object";
import { FFormBuilder } from "../components/f-form-builder/f-form-builder";
import { LitElement, nothing, html } from "lit";

import {
	FormBuilderButtonField,
	FormBuilderField,
	FormBuilderHiddenField,
	FormBuilderSeparatorField
} from "./../types";
import { unsafeHTML } from "lit/directives/unsafe-html.js";

export function propogateProperties(element: FFormArray | FFormObject | FFormBuilder) {
	const inputElements = element.shadowRoot?.querySelectorAll<LitElement>(
		"f-input,f-form-object,f-form-array,f-button,f-checkbox-group,f-radio-group,f-select,f-switch,f-text-area,f-file-upload,f-suggest,f-field-separator"
	);
	inputElements?.forEach(async inputElement => {
		await inputElement.updateComplete;
		if (
			inputElement.getAttribute("size") === null ||
			inputElement.getAttribute("size") === "medium" ||
			inputElement.getAttribute("size") === "null"
		) {
			inputElement.setAttribute("size", element.getAttribute("size") as string);
		}
		if (
			inputElement.getAttribute("variant") === null ||
			inputElement.getAttribute("variant") === "curved" ||
			inputElement.getAttribute("variant") === "null"
		) {
			inputElement.setAttribute("variant", element.getAttribute("variant") as string);
		}
		if (
			inputElement.getAttribute("category") === null ||
			inputElement.getAttribute("category") === "fill" ||
			inputElement.getAttribute("category") === "null"
		) {
			inputElement.setAttribute("category", element.getAttribute("category") as string);
		}

		if (inputElement instanceof FFormArray || inputElement instanceof FFormObject) {
			inputElement.setAttribute("gap", element.getAttribute("gap") as string);
			inputElement.requestUpdate();
		}
	});
}

export function getSubTitle(
	field: Exclude<
		FormBuilderField,
		FormBuilderSeparatorField | FormBuilderHiddenField | FormBuilderButtonField
	>
) {
	const subTitle = field.label?.subTitle;
	if (subTitle && typeof subTitle === "string") {
		return html`
			<f-text
				size="small"
				data-qa-subtitle-for=${field.qaId || field.id}
				slot="subtitle"
				align="right"
				state="secondary"
				>${subTitle}</f-text
			>
		`;
	} else if (subTitle && typeof subTitle === "object") {
		return html`
			<f-div data-qa-subtitle-for=${field.qaId || field.id} slot="subtitle">${subTitle}</f-div>
		`;
	}

	return nothing;
}

export function getSlots(
	name: string,
	field: Exclude<
		FormBuilderField,
		FormBuilderSeparatorField | FormBuilderHiddenField | FormBuilderButtonField
	>
) {
	return html` ${field.label?.title
		? html` <f-div
				slot="label"
				padding="none"
				gap="none"
				data-qa-label-for=${field.qaId || field.id}
				>${field.label.title}</f-div
		  >`
		: name
		? html`<f-div slot="label" padding="none" gap="none" data-qa-label-for=${field.qaId || field.id}
				>${name}</f-div
		  >`
		: ""}
	${field.label?.description
		? html` <f-div slot="description" padding="none" gap="none">${field.label.description}</f-div>`
		: ""}
	${field.helperText
		? html`<f-div slot="help" data-qa-help-for=${field.qaId || field.id}
				>${typeof field.helperText === "object" ? field.helperText : unsafeHTML(field.helperText)}
		  </f-div>`
		: ``}
	${field.label?.iconTooltip
		? html`
				<f-icon
					slot="icon-tooltip"
					source="i-question-filled"
					size="small"
					state="subtle"
					data-qa-info-icon-for=${field.qaId || field.id}
					.tooltip="${field.label?.iconTooltip}"
					clickable
				></f-icon>
		  `
		: ""}
	${getSubTitle(field)}`;
}
