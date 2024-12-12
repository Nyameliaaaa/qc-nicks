<template>
	<div class="my-2 rounded-xl p-3 md:p-4 bg-mantle">
		<template v-if="title">
			<h2 class="text-md font-medium text-subtext1">{{ title }}</h2>
		</template>
		<slot />
	</div>
</template>

<script setup lang="ts">
defineProps<{
	title?: string;
}>();
</script>