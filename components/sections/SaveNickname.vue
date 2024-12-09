<template>
	<block>
		<ModalsNicknameSignIn />

		<div class="flex flex-row items-center justify-between">
			<h2 class="text-md font-medium text-gray-800 dark:text-gray-400">
				My Saved Nicknames
			</h2>
			<template v-if="status === `unauthenticated`">
				<button class="group flex flex-row gap-2" @click="logInWithDiscord">
					<p class="text-md transition-all duration-500 group-hover:text-pink-500 dark:text-white">
						Sign in with Discord
					</p>
					<icon name="material-symbols:save-outline-rounded"
						class="text-lg font-semibold transition-all duration-500 group-hover:text-pink-500 dark:text-white"
						size="24" />
				</button>
			</template>
			<template v-else>
				<div class="flex flex-row gap-3">
					<button class="group flex flex-row gap-1" @click="() => alert(`:3`)">
						<p class="text-md transition-all duration-500 group-hover:text-pink-500 dark:text-white">
							Save Nickname
						</p>
						<icon name="material-symbols:save-outline-rounded"
							class="text-lg font-semibold transition-all duration-500 group-hover:text-pink-500 dark:text-white"
							size="24" />
					</button>
					<button class="group flex flex-row gap-1" @click="() => alert(`:3`)">
						<p class="text-md transition-all duration-500 group-hover:text-pink-500 dark:text-white">
							Manage Nicknames
						</p>
						<icon name="material-symbols:save-as-outline-rounded"
							class="text-lg font-semibold transition-all duration-500 group-hover:text-pink-500 dark:text-white"
							size="24" />
					</button>
				</div>
			</template>
		</div>
	</block>
</template>

<script setup lang="ts">
const nick = useNick();
const modal = useModal();
const { status } = useAuth();

const logInWithDiscord = () => {
	return useUpdateModal(true, 'NicknameSignIn');
};
</script>
