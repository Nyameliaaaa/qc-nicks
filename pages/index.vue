<template>
	<h1 class="mb-2 text-center text-4xl font-bold dark:text-white">
		<span class="font-extrabold text-pink-500">Amelia</span>'s Nickname Helper
	</h1>

	<p class="mb-4 text-lg dark:text-white">
		Type the name you want in the <code>Nickname</code> field, see it in the
		<code>Preview</code>.
		<br />
		Use everything else down below to customize your nickname. Keep it readable, tho.
	</p>

	<nickname-preview />
	<nickname-input />
	<copy-command />

	<div class="h-4"></div>

	<block-colors />
	<pride />

	<div class="h-4"></div>

	<macro />
	<custom-gradient />

	<div class="h-4"></div>

	<save-nickname />
	<block>
		<textarea
			class="mt-0 block w-full border-0 border-b-2 border-black bg-white px-0.5 transition-all duration-500 focus:border-pink-600 focus:ring-0 dark:border-gray-200 dark:bg-neutral-800 dark:text-white dark:focus:border-pink-500"
			placeholder="holy fucking bingle. what!? - use this area to make longer names."
		/>
	</block>

	<div class="h-4"></div>

	<block>
		<p class="text-center font-semibold dark:text-white">Made with ❤️ by Amelia.</p>
	</block>
</template>

<script setup lang="ts"></script>
