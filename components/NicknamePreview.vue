<template>
	<div class="sticky top-0 shadow-lg z-50">
		<block class="flex flex-col gap-2">
			<h2 class="text-gray-800 dark:text-gray-400 text-md font-medium">
				Preview
			</h2>
			<p
				class="text-white text-3xl font-bold text-center py-2 rounded-md"
				:class="`[background-image:_linear-gradient(#131a1b,#131a1b),_url('/assets/img/blank_sign.png')] [background-blend-mode:_hard-light]`"
			>
				<span
					v-for="section in preview"
					:style="`color: ${section.color};text-shadow: 4px 4px 0 #002929; font-family: Minecraft;`"
				>
					{{ section.text }}
				</span>
			</p>
		</block>
	</div>
</template>

<script setup lang="ts">
const preview = usePreview();
</script>
