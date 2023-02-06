<template>
	<tab-panel>
		<div
			class="grid grid-cols-2"
			:class="gradient ? `md:grid-cols-4` : `md:grid-cols-6`"
		>
			<!-- if we don't have gradient -->
			<button
				v-if="!gradient"
				v-for="item in items"
				:key="item.name"
				@click="$emit('button-click', item)"
				class="m-2 rounded-md bg-slate-200 p-2 transition-all duration-500 hover:bg-slate-200/60 dark:bg-neutral-900 hover:dark:bg-neutral-700"
			>
				<p>
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

			<!-- if we do -->
			<button
				v-if="gradient"
				v-for="item in items"
				:key="item.name"
				@click="$emit('button-click', item)"
				:style="`background: linear-gradient(90deg, ${item.colors
					.map((x) => `rgb(${useRGB(x).join(',')})`)
					.join(',')});`"
				class="m-2 rounded-md p-3 transition-all duration-500 hover:drop-shadow-xl"
			>
				<p
					class="text-shadow-lg font-semibold text-neutral-900 shadow-black"
				>
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
</script>
