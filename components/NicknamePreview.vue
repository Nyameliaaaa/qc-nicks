<template>
	<div class="sticky top-0 z-50 shadow-lg">
		<block class="flex flex-col gap-2">
			<h2 class="text-md font-medium text-gray-800 dark:text-gray-400">Preview</h2>
			<p
				class="rounded-md py-2 text-center text-3xl font-bold text-white"
				:class="`[background-image:_linear-gradient(#131a1b,#131a1b),_url('/assets/img/blank_sign.png')] [background-blend-mode:_hard-light]`"
			>
				<span
					v-for="section in preview"
					:style="`color: ${section.color};text-shadow: 4px 4px 0 #002929; font-family: Minecraft;`"
				>
					{{ section.text }}
				</span>
			</p>
		</block>
	</div>
</template>

<script setup lang="ts">
import type { OutputLexicalNode } from "~~/utils/types";

const nick = useNick();
const colorMap = useColorMap();
const preview = useState<OutputLexicalNode[]>("preview", () => [
	{ color: colorMap["f"], text: nick.value },
]);

watch(nick, (newNick) => {
	preview.value = [];

	const parse = newNick.split("");
	let index = 0;

	while (index < parse.length) {
		const value = parse[index];

		if (value === "&") {
			if (parse[index + 1] === "#") {
				preview.value.push({
					color: `${newNick.slice(index + 1, index + 8)}`,
					text: "",
				});

				index += 8;
			} else {
				preview.value.push({
					color: `${colorMap[parse[index + 1]]}`,
					text: "",
				});

				index += 2;
			}
		} else {
			if (preview.value.length === 0) {
				preview.value.push({
					color: "",
					text: "",
				});
			}

			preview.value[preview.value.length - 1].text += value;
			index++;
		}
	}
});
</script>
