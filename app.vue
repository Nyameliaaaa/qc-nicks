<template>
	<Html v-bind:class="colorMode.value">
		<!-- Made with ❤️ by Amelia (@nightlake@tech.lgbt). -->
		<!-- Using Nuxt, Tailwind, Vue and Vite.  -->
		<!-- Color maps & Gradient Logic are taken from Xenni's color helper. Everything else is Amelia's. -->

		<Head>
			<Title>Amelia's Nickname Helper :D</Title>
		</Head>
		<Body
			class="overflow-x-clip bg-slate-100 font-sans  dark:bg-neutral-900"
		>
			<div class="mx-auto max-w-5xl p-2">
				<nuxt-page />
			</div>
		</Body>
	</Html>
</template>

<script setup>
import "@/assets/css/tailwind.css";
const colorMode = useColorMode();
</script>
