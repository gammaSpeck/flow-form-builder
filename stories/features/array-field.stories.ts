import { Story, Meta } from "@storybook/web-components";
import { html } from "lit-html";
import { FormBuilderField } from "@cldcvr/flow-form-builder/src/types";
import { createRef, Ref, ref } from "lit/directives/ref.js";

export default {
	title: "Features/Array field",
	argTypes: {
		field: {
			control: false
		}
	}
} as Meta;

type SampleFormBuilder = {
	field: FormBuilderField;
};

const sampleFormBuilder: SampleFormBuilder = {
	field: {
		type: "array",
		allowEmpty: true,
		label: {
			title: "Text array"
		},
		field: {
			type: "text"
		}
	}
};

const Template: Story<unknown> = (args: any) => {
	const handleKeydown = (event: Event) => {
		event.stopPropagation();
		event.stopImmediatePropagation();
	};
	const fieldRef: Ref<HTMLElement> = createRef();
	const handleInput = (event: CustomEvent) => {
		if (fieldRef.value) {
			fieldRef.value.innerHTML = JSON.stringify(event.detail, undefined, 8);
		}
	};
	return html`
		<f-div padding="medium" dicrection="column" gap="large">
			<f-form-builder
				.field=${args.field}
				.values=${args.values}
				@keydown=${handleKeydown}
				@input=${handleInput}
			>
				<f-div>
					<f-button label="submit" type="submit"></f-button>
				</f-div>
			</f-form-builder>
			<f-div>
				<pre ${ref(fieldRef)}>${JSON.stringify(args.values, undefined, 8)}</pre>
			</f-div>
		</f-div>
	`;
};

export const basic = Template.bind({});

basic.args = {
	field: sampleFormBuilder.field,
	values: ["username1", "username2"]
};
