<template>
	<button class="group flex flex-row gap-2 transition-all duration-500 items-center" @click="$emit('click')">
		<Icon :name="iconName" class="transition-all duration-500 text-subtext0" :class="{
			'group-hover:text-pink': !destructive,
			'group-hover:text-red': destructive
		}" size="24" />
		<p class="transition-all duration-500 text-md text-subtext0" :class="{
			'group-hover:text-pink': !destructive,
			'group-hover:text-red': destructive
		}">
			{{ text }}
		</p>
	</button>
</template>

<script setup lang="ts">
defineProps<{
	text: string;
	iconName: string;
	destructive?: boolean;
}>();

defineEmits<{
	(event: "click"): void;
}>();
</script>
