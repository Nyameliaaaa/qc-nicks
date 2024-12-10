<template>
	<tab-panel>
		<div class="grid grid-cols-2" :class="gradient ? `md:grid-cols-4` : `md:grid-cols-6`">
			<template v-if="!gradient">
				<template v-for="item in sort(items)" :key="item.name">
					<button @click="$emit('button-click', item)"
						class="relative isolate m-2 rounded-md transition-all duration-500"
						:style="generateNonGradientStyle(item.colors)">
						<div class="absolute -z-10 h-full w-full rounded-md bg-black/30"></div>
						<p class="text-shadow-lg p-3 font-semibold text-white shadow-black">
							{{ item.name }}
						</p>
					</button>
				</template>
			</template>

			<!-- if we do -->
			<template v-if="gradient">
				<template v-for="item in sort(items)" :key="item.name">
					<button @click="$emit('button-click', item)" :style="`background: linear-gradient(90deg, ${item.colors
						.map((x) => `rgb(${useRGB(x).join(',')})`)
						.join(',')});`" class="relative isolate m-2 rounded-md transition-all duration-500 hover:drop-shadow-xl">
						<div class="absolute -z-10 h-full w-full rounded-md bg-black/30"></div>
						<div class="p-3">
							<p class="text-shadow-lg font-semibold text-white shadow-black">
								{{ item.name }}
							</p>
						</div>
					</button>
				</template>
			</template>
		</div>
	</tab-panel>
</template>

<script setup lang="ts">
import { TabPanel } from "@headlessui/vue";
import type { PrideColor } from "~/utils/types";
const colorMap = useColorMap();

defineProps<{
	items: PrideColor[];
	colorMap: Record<string, string>;
	gradient?: boolean;
}>();

defineEmits<{
	(event: "button-click", item: PrideColor): void;
}>();

const generateNonGradientStyle = (colors: string[]) => {
	return `background: linear-gradient(90deg, ${colors
		.map((x, index) => {
			const color = useRGB(colorMap[x] ?? x).join(",");
			const firstPercentage = index === 0 ? 0 : (100 / colors.length) * index;
			const lastPercentage =
				index === colors.length - 1 ? 100 : (100 / colors.length) * (index + 1);

			return `rgb(${color}) ${firstPercentage}% ${lastPercentage}%`;
		})
		.join(",")});`;
};

const sort = (thing: PrideColor[]) => thing.sort((a, b) => {
	if (a.name < b.name) {
		return -1;
	}
	if (a.name > b.name) {
		return 1;
	}
	return 0;
});
</script>
