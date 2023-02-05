<template>
	<block>
		<div class="flex flex-row justify-between">
			<h2 class="text-gray-800 dark:text-gray-400 text-md font-medium">
				Command
			</h2>
			<button class="flex flex-row gap-2 group" @click="copyCommand">
				<p
					class="dark:text-white text-md group-hover:text-pink-500 transition-all"
				>
					{{ justCopied ? "Copied!" : "Copy Command" }}
				</p>
				<Icon
					name="material-symbols:content-copy-outline-rounded"
					class="dark:text-white text-lg font-semibold group-hover:text-pink-500 transition-all"
					size="24"
				/>
			</button>
		</div>
		<code class="dark:text-white text-lg font-bold">
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
