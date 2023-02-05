<template>
	<h1 class="text-4xl font-bold dark:text-white text-center mb-2">
		<span class="text-pink-500 font-extrabold">Amelia</span>'s Nick Helper
	</h1>

	<p class="text-lg dark:text-white mb-4">
		Type the name you want in the <code>Nickname.</code> field, see it in
		the <code>Preview</code>.
		<br />
		Use everything else down below to customize your nickname. Keep it
		readable, tho.
	</p>

	<nickname-preview />
	<nickname-input />
	<copy-command />

	<block-colors />
	<pride />
	<macro />

	<block>
		<h2 class="text-gray-800 dark:text-gray-400 text-md font-medium">
			Custom Gradients [unfinished]
		</h2>
	</block>

	<block>
		<div class="flex flex-row justify-between">
			<h2 class="text-gray-800 dark:text-gray-400 text-md font-medium">
				Save Nickname [unfinished]
			</h2>
			<button class="flex flex-row gap-2 group">
				<p
					class="dark:text-white text-md group-hover:text-pink-500 transition-all"
				>
					{{ id ?? "Save Nickname" }}
				</p>
				<icon
					name="material-symbols:save-outline-rounded"
					class="dark:text-white text-lg font-semibold group-hover:text-pink-500 transition-all"
					size="24"
				/>
			</button>
		</div>
	</block>

	<block>
		<p class="text-center dark:text-white font-semibold">
			Made with ❤️ by Amelia.
		</p>
		<p class="text-center dark:text-gray-400 text-gray-800">
			This tool is not made by, or ran by the Prism foundation.
		</p>
	</block>
</template>

<script setup lang="ts">
const id = useState<string | null | undefined>("id", () => null);
</script>
