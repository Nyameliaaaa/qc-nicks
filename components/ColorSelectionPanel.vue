<template>
	<tab-panel>
		<div class="grid grid-cols-4 md:grid-cols-7">
			<button
				v-for="item in items"
				:key="item.name"
				class="p-2 rounded-md m-2"
				@click="$emit('button-click', item)"
				:style="generateStyle(gradient ?? false, item)"
			>
				<p v-if="!gradient">
					<span
						v-for="color in item.code"
						:style="`color: ${colorMap[color] ?? color}`"
						class="text-lg"
						>█</span
					>
				</p>
				<p class="font-semibold dark:text-white">
					{{ item.name }}
				</p>
			</button>
		</div>
	</tab-panel>
</template>

<script setup lang="ts">
import { TabPanel } from "@headlessui/vue";
import { PrideColor, PrideMCColor } from "~~/utils/types";

defineProps<{
	items: PrideColor[] | PrideMCColor[];
	colorMap: Record<string, string>;
	gradient?: boolean;
}>();

defineEmits<{
	(event: "button-click", item: PrideColor | PrideMCColor): void;
}>();

const generateStyle = (gradient: boolean, item: PrideColor | PrideMCColor) => {
	if (gradient && item.code instanceof Array) {
		return {
			backgroundImage: `linear-gradient(90deg, ${item.code.map(
				(color) => `${color},`
			)})`,
		};
	} else {
		return {};
	}
};
</script>
