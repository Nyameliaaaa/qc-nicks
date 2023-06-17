<template>
	<Html v-bind:class="colorMode.value">
	<!-- Made with ❤️ by Amelia (@nightlake@tech.lgbt). -->
	<!-- Using Nuxt, Tailwind, Vue and Vite.  -->
	<!-- Color maps & Gradient Logic are taken from Xenni's color helper. -->

	<Head>
		<Title>Amelia's Nickname Helper :D</Title>
		<link rel="preload" href="https://qc-nick-saver.nightlake.workers.dev" />
	</Head>

	<Body class="bg-slate-100 font-sans dark:bg-neutral-900">
		<div v-if="!randomGradient" class="h-4 w-full bg-white dark:bg-neutral-800"></div>
		<div v-if="randomGradient" class="h-4 w-full" :style="getGradient(randomGradient.colors)"></div>
		<div class="mx-auto max-w-5xl p-2" :class="modal ? `overflow-clip` : `overflow-x-clip`">
			<nuxt-page />
		</div>
	</Body>

	</Html>
</template>

<script setup lang="ts">
import "@/assets/css/tailwind.css";
import { PrideColor } from "./utils/types";
const colorMode = useColorMode();
const modal = useModal();
const randomGradient = useState<PrideColor | null>("random", () => null);

onMounted(() => {
	const all = [...usePrideColors()];
	randomGradient.value = all[Math.floor(Math.random() * all.length)];
});

const getGradient = (colors: array[]) => {
	return `background: linear-gradient(90deg, ${colors
		.map((x, index) => {
			const color = useRGB(x).join(",");
			const firstPercentage = index === 0 ? 0 : (100 / colors.length) * index;
			const lastPercentage =
				index === colors.length - 1 ? 100 : (100 / colors.length) * (index + 1);

			return `rgb(${color}) ${firstPercentage}% ${lastPercentage}%`;
		})
		.join(",")});`;
}
</script>
