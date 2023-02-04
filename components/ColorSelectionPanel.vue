<template>
	<tab-panel>
		<div class="grid grid-cols-4 md:grid-cols-7">
			<button
				v-for="item in items"
				:key="item.name"
				@click="$emit('button-click', item)"
				:class="gradient ? `p-4` : `p-2`"
				:style="`background: ${
					gradient && item.colors instanceof Array
						? `linear-gradient(90deg, ${item.colors.map(
								(color) => `${color},`
						  )})`
						: ''
				};`"
				class="rounded-md m-2"
			>
				<!-- :style="{
					background:
						gradient && item.code instanceof Array
							? `linear-gradient(90deg, ${item.code.map(
									(color) => `${color},`
							  )})`
							: '',
				}" -->
				<p v-if="!gradient">
					<span
						v-for="color in item.colors"
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
import { PrideColor } from "~~/utils/types";

defineProps<{
	items: PrideColor[];
	colorMap: Record<string, string>;
	gradient?: boolean;
}>();

defineEmits<{
	(event: "button-click", item: PrideColor): void;
}>();

const generateStyle = (gradient: boolean, item: PrideColor) => {
	if (gradient && item.colors instanceof Array) {
		return {
			"background-image": `linear-gradient(90deg, ${item.colors.map(
				(color) => `${color},`
			)})`,
		};
	} else {
		return;
	}
};
</script>
