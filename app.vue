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
			<div
				class="mb-3 h-4 w-full rounded-md"
				:style="`background: linear-gradient(90deg, ${randomGradient.colors
					.map((x) => `rgb(${useRGB(x).join(',')})`)
					.join(',')});`"
			></div>
			<div
				class="mx-auto max-w-5xl p-2"
				:class="modal ? `overflow-clip` : `overflow-x-clip`"
			>
				<nuxt-page />
			</div>
		</Body>
	</Html>
</template>

<script setup lang="ts">
import "@/assets/css/tailwind.css";
const colorMode = useColorMode();
const modal = useModal();

const all = [...useGradients(), ...usePrideColors()];
const randomGradient = all[Math.floor(Math.random() * all.length)];
</script>
