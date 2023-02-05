<template>
	<Html v-bind:class="colorMode.value">
		<!-- Made with ❤️ by Amelia (@nightlake@tech.lgbt). -->
		<!-- Using Nuxt, Tailwind, Vue and Vite.  -->
		<!-- Color maps & Gradient Logic are taken from Xenni's color helper. Everything else is Amelia's. -->

		<Head>
			<Title>QC Nicks Helper</Title>
		</Head>
		<Body
			class="bg-slate-100 dark:bg-neutral-900 font-sans overflow-x-clip"
		>
			<div class="max-w-5xl mx-auto p-2">
				<nuxt-page />
			</div>
		</Body>
	</Html>
</template>

<script setup>
import "@/assets/css/tailwind.css";
const colorMode = useColorMode();
</script>
