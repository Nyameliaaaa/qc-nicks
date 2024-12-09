<template>
	<block>
		<label class="block">
			<h2 class="text-md font-medium text-zinc-700 dark:text-gray-400">Nickname</h2>
			<input
				type="text"
				class="mt-0 block w-full border-0 border-b-2 border-black bg-white px-0.5 transition-all duration-500 focus:border-pink-600 focus:ring-0 dark:border-gray-200 dark:bg-neutral-800 dark:text-white dark:focus:border-pink-500"
				v-model="nick"
				@input.prevent="updateNick"
			/>
		</label>

		<p class="mt-2 text-gray-800 dark:text-gray-400">{{ status }}</p>
	</block>
</template>

<script setup lang="ts">
const nick = useNick();
const status = useStatus();

const validateNick = () => {
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
};

const updateNick = () => {
	validateNick();
};

onMounted(() => validateNick());
</script>
