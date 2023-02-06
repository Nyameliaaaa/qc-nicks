<template>
	<block>
		<div class="flex flex-row justify-between">
			<h2 class="text-md font-medium text-gray-800 dark:text-gray-400">
				Save Nickname
			</h2>
			<button class="group flex flex-row gap-2" @click="saveNickname">
				<p
					class="text-md transition-all duration-500 group-hover:text-pink-500 dark:text-white"
				>
					{{ text }}
				</p>
				<icon
					name="material-symbols:save-outline-rounded"
					class="text-lg font-semibold transition-all duration-500 group-hover:text-pink-500 dark:text-white"
					size="24"
				/>
			</button>
		</div>
	</block>
</template>

<script setup lang="ts">
const nick = useNick();
const text = useState("text", () => "Save Nickname");

const saveNickname = () => {
	const { data, error, pending } = useFetch<{ id: string }, { err: string }>(
		"https://qc-nick-saver.nightlake.workers.dev/nick",
		{
			method: "POST",
			body: JSON.stringify({
				nick: nick.value,
			}),
		}
	);

	if (pending) {
		text.value = "Saving...";
	}

	if (error) {
		console.error(error.value ?? "Bingle has fallen.");
		text.value = "Something happened!";

		setTimeout(() => {
			text.value = "Save Nickname";
		}, 2500);
	}

	if (data && data.value) {
		text.value = `Copied! Save ID: ${data.value.id}`;
		navigator.clipboard.writeText(
			`${window.location.href}nicks/${data.value.id}`
		);

		setTimeout(() => {
			text.value = "Save Nickname";
		}, 5000);
	}
};
</script>
