<template>
	<div class="sticky top-0 z-50 shadow-lg">
		<block class="flex flex-col gap-2" title="Preview">
			<p class="rounded-md py-2 text-center text-3xl font-bold text-white"
				:class="`[background-image:_linear-gradient(#131a1b,#131a1b),_url('/assets/img/blank_sign.png')] [background-blend-mode:_hard-light]`">
				<span v-for="section in preview"
					:style="`color: ${section.color};text-shadow: 4px 4px 0 #002929; font-family: Minecraft;`">
					{{ section.text }}
				</span>
			</p>
		</block>
	</div>
</template>

<script setup lang="ts">
const nick = useNick();
const preview = usePreview();

watch(nick, (newNick) => {
	preview.value = usePreviewPrepare(newNick);
});
</script>
