<template>
	<block title="Colors">
		<template #button>
			<IconButton text="Add your own?" icon-name="material-symbols:add-circle-outline-rounded"
				@click="useUpdateModal(true, 'BlockColors')" />
		</template>

		<div class="grid grid-cols-2 md:grid-cols-6">
			<button v-for="color in blockMCColors" :key="color.colorName"
				:style="`background-color: ${color.backgroundColor}; color: ${color.textColor}`"
				class="m-2 rounded-md p-2" @click.prevent="() => declareColorFunc(color)">
				<flex class="flex-row lg:flex-col items-center">
					<p class="font-semibold">{{ color.colorName }}</p>
					<p>&{{ color.hexId }}</p>
				</flex>
			</button>
		</div>	
	</block>

	<ModalsColorPick @color-update="updateColor" />
</template>

<script setup lang="ts">
import type { BlockMCColor } from "~/utils/types";

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

	nick.value = `&${color.hexId}${nick.value.startsWith("&") ? nick.value.slice(2) : nick.value
		}`;
};

const updateColor = (color: string) => {
	declareColorFunc({ hexId: color });
};
</script>
