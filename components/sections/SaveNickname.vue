<template>
	<block>
		<ModalsNicknameSignIn />

		<div class="flex flex-col md:flex-row md:items-center justify-between">
			<h2 class="text-md font-medium text-subtext1">
				My Saved Nicknames
			</h2>
			<div class="flex flex-row items-center gap-2 md:gap-3">
				<template v-if="!loggedIn">
					<IconButton text="Sign in with Discord" icon-name="fa6-brands:discord" @click="logInWithDiscord" />
				</template>
				<template v-else>
					<button :class="buttonClass" @click="saveNickname">
						<icon :name="saveNicknameButtonState.icon"
							class="transition-all duration-500 text-subtext0 group-hover:text-pink" size="24" />
						<p class="transition-all duration-500 text-md text-subtext0 group-hover:text-pink">
							{{ saveNicknameButtonState.text }}
						</p>
					</button>
					<NuxtLink :class="buttonClass" href="/nicknames">
						<icon name="material-symbols:save-as-outline-rounded"
							class="transition-all duration-500 text-subtext0 group-hover:text-pink" size="24" />
						<p class="transition-all duration-500 text-md text-subtext0 group-hover:text-pink">
							Manage Nicknames
						</p>
					</NuxtLink>
				</template>
			</div>
		</div>
	</block>
</template>

<script setup lang="ts">
const nick = useNick();
const saveNicknameButtonState = useState("saveNicknameButtonState", () => { return { text: "Save Nickname", icon: "material-symbols:save-outline-rounded" } });
const isFirstSavePostLoad = useState("isFirstSavePostLoad", () => { return true; });
const { loggedIn } = useUserSession();
const buttonClass = "group mt-2 flex flex-row gap-1 bg-base hover:bg-surface0 w-1/2 p-2 rounded-md h-fill md:mt-0 md:bg-transparent md:hover:bg-transparent md:w-fit md:p-0 md:rounded-none";

const logInWithDiscord = () => {
	return useUpdateModal(true, 'NicknameSignIn');
};

const saveNickname = () => {
	const { data, error, status: fetchStatus } = useFetch(
		"/api/nicknames/nickname/createNew",
		{
			method: "post",
			body: {
				nickname: nick.value
			},
		}
	);

	if (fetchStatus.value === "pending") {
		saveNicknameButtonState.value = {
			text: "Saving...",
			icon: "material-symbols:downloading-rounded"
		};
	}

	if (error && !isFirstSavePostLoad.value) {
		console.error(error.value ?? "Bingle has fallen.");
		saveNicknameButtonState.value = {
			text: "Something happened!",
			icon: "material-symbols:error-outline-rounded"
		};

		isFirstSavePostLoad.value = false;

		setTimeout(() => {
			saveNicknameButtonState.value = {
				text: "Save Nickname",
				icon: "material-symbols:save-outline-rounded"
			};
		}, 2500);
	}

	if ((data && data.value) ?? isFirstSavePostLoad.value) {
		saveNicknameButtonState.value = {
			text: "Saved!",
			icon: "material-symbols:check-circle-outline-rounded"
		};

		setTimeout(() => {
			saveNicknameButtonState.value = {
				text: "Save Nickname",
				icon: "material-symbols:save-outline-rounded"
			};
		}, 5000);
	}
};
</script>
