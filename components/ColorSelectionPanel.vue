<template>
	<tab-panel>
		<div class="grid grid-cols-4 md:grid-cols-5">
			<!-- if we don't have gradient -->
			<button
				v-if="!gradient"
				v-for="item in items"
				:key="item.name"
				@click="$emit('button-click', item)"
				class="rounded-md m-2 p-2"
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
					.join(', ')
					.slice(0, -2)});`"
				class="rounded-md p-3 m-2"
			>
				<p class="font-semibold text-shadow-xl shadow-black">
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
