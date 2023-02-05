<template>
	<block>
		<label class="block">
			<h2 class="text-gray-800 dark:text-gray-400 text-md font-medium">
				Nickname
			</h2>
			<input
				type="text"
				class="mt-0 block w-full px-0.5 border-0 border-b-2 border-black dark:border-gray-200 focus:ring-0 focus:border-pink- dark:focus:border-pink-600 dark:bg-neutral-800 transition-all dark:text-white"
				v-model="nick"
				@input.prevent="updateNick"
			/>
		</label>

		<p class="text-gray-800 dark:text-gray-400 mt-1">{{ status }}</p>
	</block>
</template>

<script setup lang="ts">
const nick = useNick();
const status = useStatus();

const updateNick = () => {
	let filter = nick.value.replace(/&([A-Fr0-9]|#[0-9A-F]{6})/gi, "");
	let invalidCharCheck = nick.value.match(/[^\w&#]/gi);

	if (filter.length > 20) {
		status.value = "Nickname is too long.";
	} else if (filter.length < 3) {
		status.value = "Nickname is too short.";
	} else {
		status.value = "Nickname is OK";
	}

	if (invalidCharCheck !== null) {
		if (invalidCharCheck[0] == " ") {
			status.value = "Nickname can't contain spaces";
		} else {
			status.value = "Nickname can't contain " + invalidCharCheck[0];
		}
	}

	useUpdatePreview();
};
</script>
