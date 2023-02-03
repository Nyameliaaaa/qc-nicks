import { Ref } from "nuxt/dist/app/compat/capi";
import { OutputLexicalNode } from "~~/utils/types";

export default function (
	colorMap: Record<string, string>,
	input: Ref<string>,
	output: Ref<OutputLexicalNode[]>
) {
	return () => {
		output.value = [];

		const parse = input.value.split("");
		let index = 0;

		while (index < parse.length) {
			const value = parse[index];

			if (value === "&") {
				if (parse[index + 1] === "#") {
					output.value.push({
						color: `${input.value.slice(index + 1, index + 8)}`,
						text: "",
					});

					index += 8;
				} else {
					output.value.push({
						color: `${colorMap[parse[index + 1]]}`,
						text: "",
					});

					index += 2;
				}
			} else {
				if (output.value.length === 0) {
					output.value.push({
						color: "",
						text: "",
					});
				}

				output.value[output.value.length - 1].text += value;
				index++;
			}
		}
	};
}
