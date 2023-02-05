<template>
	<block>
		<h2 class="text-gray-800 dark:text-gray-400 text-md font-medium">
			Colors
		</h2>
		<div class="grid grid-cols-4 md:grid-cols-6">
			<button
				v-for="color in blockMCColors"
				:key="color.colorName"
				:style="`background-color: ${color.backgroundColor}; color: ${color.textColor}`"
				class="p-2 rounded-md m-2"
				@click.prevent="() => declareColorFunc(color)"
			>
				<p class="font-semibold">{{ color.colorName }}</p>
				<p>&{{ color.hexId }}</p>
			</button>
		</div>

		<label class="block">
			<h2 class="text-gray-800 dark:text-gray-400 text-md font-medium">
				Or add your own? [unfinished]
			</h2>
		</label>
	</block>
</template>

<script setup lang="ts">
import { BlockMCColor } from "~~/utils/types";

const blockMCColors = useBlockMCColors();
const nick = useNick();

const declareColorFunc = (color: BlockMCColor) => {
	// clear selected colors
	nick.value = nick.value
		.replaceAll(/&([A-Fr0-9]|#[0-9A-F]{6})/gi, "")
		.replaceAll("&#", "");

	nick.value = `&${color.hexId}${
		nick.value.startsWith("&") ? nick.value.slice(2) : nick.value
	}`;

	useUpdatePreview();
};
</script>
