<template>
	<div v-if="pending">
		<h1 class="mb-2 text-center text-4xl font-bold dark:text-white">
			<span class="font-extrabold text-pink-500">Amelia</span>'s Nickname Helper
		</h1>

		<p class="mb-4 text-lg dark:text-white">Your nickname is being loaded.</p>
	</div>

	<div v-if="error">
		<h1 class="mb-2 text-center text-4xl font-bold dark:text-white">
			<span class="font-extrabold text-pink-500">Amelia</span>'s Nickname Helper
		</h1>

		<p class="mb-4 text-lg dark:text-white">Something went horribly wrong.</p>
	</div>
</template>

<script setup lang="ts">
const route = useRoute();
const nick = useNick();

const { data, error, pending } = useFetch<{ nick: string }, { err: string }>(
	`https://qc-nick-saver.nightlake.workers.dev/nick/${route.params.id}`
);

if (error.value) {
	console.error(error.value);
}

if (data.value) {
	nick.value = data.value.nick;
	useUpdatePreview();
	navigateTo("/");
}
</script>
