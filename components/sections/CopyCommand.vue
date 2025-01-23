<template>
	<block slot="Command">
		<template #button>
			<IconButton :text="justCopied ? `Copied!` : `Copy Command`"
				icon-name="material-symbols:content-copy-outline-rounded" @click="copyCommand" />
		</template>

		<code class="w-full text-lg font-bold [word-break:_break-all]">/nick {{ nick }}</code>
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
