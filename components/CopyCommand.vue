<template>
	<block>
		<div class="flex flex-row justify-between">
			<h2 class="text-md font-medium text-gray-800 dark:text-gray-400">Command</h2>
			<button class="group flex flex-row gap-2" @click="copyCommand">
				<p
					class="text-md transition-all duration-500 group-hover:text-pink-500 dark:text-white"
				>
					{{ justCopied ? "Copied!" : "Copy Command" }}
				</p>
				<Icon
					name="material-symbols:content-copy-outline-rounded"
					class="text-lg font-semibold transition-all duration-500 group-hover:text-pink-500 dark:text-white"
					size="24"
				/>
			</button>
		</div>
		<code class="w-full text-lg font-bold [word-break:_break-all] dark:text-white">
			/nick {{ nick }}
		</code>
	</block>
</template>

<script setup lang="ts">
const nick = useNick();
const justCopied = useState("justCopied", () => false);

const copyCommand = () => {
	navigator.clipboard.writeText(`/nick ${nick.value}`);
	justCopied.value = true;

	setTimeout(() => {
		justCopied.value = false;
	}, 1000);
};
</script>
