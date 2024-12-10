<template>
	<p class="mb-4 text-lg dark:text-white">
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

	<block>
		<textarea
			class="mt-0 block w-full border-0 border-b-2 border-black bg-white px-0.5 transition-all duration-500 focus:border-pink-600 focus:ring-0 dark:border-gray-200 dark:bg-neutral-800 dark:text-white dark:focus:border-pink-500"
			placeholder="holy fucking bingle. what!? - use this area to make longer names." />
	</block>
</template>

<script setup lang="ts">
</script>
