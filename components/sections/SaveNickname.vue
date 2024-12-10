<template>
	<block>
		<ModalsNicknameSignIn />

		<div class="flex flex-row items-center justify-between">
			<h2 class="text-md font-medium text-gray-800 dark:text-gray-400">
				My Saved Nicknames
			</h2>
			<template v-if="status === `unauthenticated`">
				<button class="group flex flex-row gap-2" @click="logInWithDiscord">
					<icon name="fa6-brands:discord"
						class="text-lg font-semibold transition-all duration-500 group-hover:text-pink-500 dark:text-white"
						size="24" />
					<p class="text-md transition-all duration-500 group-hover:text-pink-500 dark:text-white">
						Sign in with Discord
					</p>
				</button>
			</template>
			<template v-else>
				<div class="flex flex-row gap-3">
					<button class="group flex flex-row gap-1" @click="() => saveNickname()">
						<icon name="material-symbols:save-outline-rounded"
							class="text-lg font-semibold transition-all duration-500 group-hover:text-pink-500 dark:text-white"
							size="24" />
						<p class="text-md transition-all duration-500 group-hover:text-pink-500 dark:text-white">
							{{ text }}
						</p>
					</button>
					<button class="group flex flex-row gap-1" @click="() => navigateTo(`/saved`)">
						<icon name="material-symbols:save-as-outline-rounded"
							class="text-lg font-semibold transition-all duration-500 group-hover:text-pink-500 dark:text-white"
							size="24" />
						<p class="text-md transition-all duration-500 group-hover:text-pink-500 dark:text-white">
							Manage Nicknames
						</p>
					</button>
				</div>
			</template>
		</div>
	</block>
</template>

<script setup lang="ts">
const nick = useNick();
const text = useState("text", () => "Save Nickname");
const { status } = useAuth();

const logInWithDiscord = () => {
	return useUpdateModal(true, 'NicknameSignIn');
};

const { data, error, status: fetchStatus, execute } = useFetch(
	"/api/nicknames/nickname/createNew",
	{
		method: "post",
		body: {
			nickname: nick.value
		},
		immediate: false
	}
);

const saveNickname = () => {
	execute();

	if (fetchStatus.value === "pending") {
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
		text.value = `Saved!`;

		setTimeout(() => {
			text.value = "Save Nickname";
		}, 5000);
	}
};
</script>
