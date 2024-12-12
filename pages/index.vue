<template>
	<p class="mb-4 text-lg text-subtext0">
		Type the name you want in the <code>Nickname</code> field, see it in the
		<code>Preview</code>.
		<br />
		Use everything else down below to customize your nickname. Keep it readable, tho.
	</p>

	<SectionsNicknamePreview />
	<SectionsNicknameInput />
	<SectionsCopyCommand />
	<SectionsSaveNickname />

	<div class="h-4"></div>

	<SectionsBlockColors />
	<SectionsPride />

	<div class="h-4"></div>

	<SectionsMacro />
	<SectionsCustomGradient />

	<div class="h-4"></div>

	<block title=":3">
		<textarea
			class="block w-full my-2 p-2 bg-base focus:bg-surface0 rounded-md transition-all duration-500 focus:ring-2 focus:ring-pink font-semibold font-mono"
			placeholder="holy fucking bingle. what!? - use this area to make longer names." />
	</block>

	<ModalsNickSizeTooShort />
</template>

<script setup lang="ts">
</script>
