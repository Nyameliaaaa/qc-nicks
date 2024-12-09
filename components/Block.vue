<template>
	<div class="my-2 rounded-xl bg-white p-6 dark:bg-neutral-800">
		<template v-if="title">
			<h2 class="text-md font-medium text-gray-800 dark:text-gray-400">{{ title }}</h2>
		</template>
		<slot />
	</div>
</template>

<script setup lang="ts">
defineProps<{
	title?: string;
}>();
</script>