<template>
	<div class="sticky top-0 z-50 shadow-lg">
		<block class="flex flex-col gap-2">
			<h2 class="text-md font-medium text-gray-800 dark:text-gray-400">
				Preview
			</h2>
			<p
				class="rounded-md py-2 text-center text-3xl font-bold"
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
