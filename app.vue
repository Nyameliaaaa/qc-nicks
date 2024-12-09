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
			<h1 class="mb-2 text-center text-4xl font-bold dark:text-white">
				<span class="font-extrabold text-pink-500">Amelia</span>'s Nickname Helper
			</h1>

			<nuxt-page />

			<div class="h-4"></div>

			<block>
				<div class="flex items-center justify-between">
					<p class="text-center font-semibold dark:text-white">
						Made with ❤️ by Amelia.
					</p>
					<Switch v-model="vModel" @update:model-value="updatePref" :class="$colorMode.preference === 'dark' ? 'bg-pink-600' : 'bg-neutral-800'
						" class="relative inline-flex h-8 w-14 items-center rounded-full">
						<span class="sr-only">Theme</span>
						<span :class="$colorMode.preference === 'dark'
							? 'translate-x-7'
							: 'translate-x-1'
							" class="inline-block h-6 w-6 transform items-center rounded-full bg-white transition">
							<div class="flex h-full w-full items-center justify-center">
								<Icon :name="colorMode.preference === 'dark'
									? 'material-symbols:dark-mode-rounded'
									: 'material-symbols:light-mode'
									" class="text-lg font-semibold text-black transition-all duration-500 group-hover:text-pink-500" size="20" />
							</div>
						</span>
					</Switch>
				</div>
			</block>
		</div>
	</Body>

	</Html>
</template>

<script setup lang="ts">
import "@/assets/css/tailwind.css";
import { PrideColor } from "./utils/types";
import { Switch } from "@headlessui/vue";
const colorMode = useColorMode();
const modal = useModal();
const randomGradient = useState<PrideColor | null>("random", () => null);

const updatePref = () => {
	colorMode.preference = colorMode.preference === "dark" ? "light" : "dark";
};

const vModel = colorMode.preference === "dark";

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
