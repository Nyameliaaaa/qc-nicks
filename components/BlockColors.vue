<template>
	<block>
		<div class="flex flex-row justify-between">
			<h2 class="text-md font-medium text-gray-800 dark:text-gray-400">Colors</h2>
			<button
				class="group flex flex-row gap-2"
				@click="useUpdateModal(true, 'BlockColors')"
			>
				<p
					class="text-md transition-all duration-500 group-hover:text-pink-500 dark:text-white"
				>
					Add your own?
				</p>
				<icon
					name="material-symbols:add-circle-outline-rounded"
					class="text-lg font-semibold transition-all duration-500 group-hover:text-pink-500 dark:text-white"
					size="24"
				/>
			</button>
		</div>
		<div class="grid grid-cols-2 md:grid-cols-6">
			<button
				v-for="color in blockMCColors"
				:key="color.colorName"
				:style="`background-color: ${color.backgroundColor}; color: ${color.textColor}`"
				class="m-2 rounded-md p-2"
				@click.prevent="() => declareColorFunc(color)"
			>
				<p class="font-semibold">{{ color.colorName }}</p>
				<p>&{{ color.hexId }}</p>
			</button>
		</div>
	</block>

	<ColorPickModal @color-update="updateColor" />
</template>

<script setup lang="ts">
import { BlockMCColor } from "~~/utils/types";

// Shared
const blockMCColors = useBlockMCColors();
const nick = useNick();

// Private
const pickedColor = useColor();

const declareColorFunc = (
	color: Pick<BlockMCColor, "hexId"> & Partial<Pick<BlockMCColor, "backgroundColor">>
) => {
	// clear selected colors
	nick.value = nick.value
		.replaceAll(/&([A-Fr0-9]|#[0-9A-F]{6})/gi, "")
		.replaceAll("&#", "");

	if (color.backgroundColor) {
		pickedColor.value = color.backgroundColor;
	}

	nick.value = `&${color.hexId}${
		nick.value.startsWith("&") ? nick.value.slice(2) : nick.value
	}`;

	useUpdatePreview();
};

const updateColor = (color: string) => {
	declareColorFunc({ hexId: color });
};
</script>
