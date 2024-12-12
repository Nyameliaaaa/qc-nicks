<template>
	<Block title="Nickname">
		<label class="block">
			<input type="text"
				class="block w-full my-2 p-2 bg-base focus:bg-surface0 rounded-md transition-all duration-500 outline-none focus:ring-2 focus:ring-pink font-semibold font-mono"
				:class="{
					'ring-2 ring-red': status !== 'Nickname is OK'
				}" v-model="nick" @input.prevent="updateNick" />
		</label>

		<p class="mt-2 text-subtext0">{{ status }}</p>
	</Block>
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
