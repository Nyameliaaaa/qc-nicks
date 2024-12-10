<template>
	<p class="mb-4 text-lg dark:text-white">
		Your saved nicknames are shown below.
	</p>

	<NuxtLink class="group flex flex-row gap-2 items-center" to="/">
		<icon name="material-symbols:arrow-back-2-outline-rounded"
			class="font-semibold transition-all duration-500 group-hover:text-pink-500 dark:text-white" size="24" />
		<p class="transition-all duration-500 font-semibold group-hover:text-pink-500 dark:text-white">
			Go Back Home
		</p>
	</NuxtLink>
	<template v-if="discordData">
		<Block title="Me">
			<div class="flex flex-row justify-between items-center">
				<div class="flex flex-row items-center gap-2">
					<img :src="discordData.avatar" alt="" class="rounded-full w-16 h-16">
					<div>
						<p class="dark:text-white font-bold text-lg">{{ discordData.name }}</p>
						<p class="text-gray-800 dark:text-gray-400 font-semibold text-sm">{{ discordData.username }}</p>
					</div>
				</div>
				<button class="group flex flex-row gap-2" @click="() => useUpdateModal(true, `NicknameSignOut`)">
					<icon name="material-symbols:logout"
						class="text-lg font-semibold transition-all duration-500 group-hover:text-red-500 dark:text-white"
						size="24" />
					<p
						class="text-md transition-all duration-500 font-semibold group-hover:text-red-500 dark:text-white">
						Sign Out
					</p>
				</button>
			</div>
		</Block>
	</template>
	<Block title="Saved Nicknames">
		<template v-if="nicknameStatus === `pending`">
			<div class="flex flex-row justify-center">
				<p class="dark:text-white">Loading Nicknames :3</p>
			</div>
		</template>
		<template v-if="nicknameStatus === `success` && nicknameData">
			<ul class="flex flex-col divide-y-2 dark:divide-neutral-700">
				<template v-for="nickname in nicknameData.nicknames" :key="nickname.nicknameId">
					<li class="font-bold text-white">
						<div class="rounded-md py-2 px-4 dark:bg-neutral-900 mb-2">
							<span v-for="section in usePreviewPrepare(nickname.nickname)"
								:style="`color: ${section.color};font-family: Minecraft;`"
								class="text-3xl drop-shadow-md">
								{{ section.text }}
							</span>
						</div>
						<div class="flex flex-row items-center gap-4">
							<button class="group flex flex-row gap-2 items-center"
								@click="() => applyNickname(nickname.nickname)">
								<icon name="material-symbols:save-outline-rounded"
									class="font-semibold transition-all duration-500 group-hover:text-pink-500 dark:text-white"
									size="24" />
								<p
									class="transition-all duration-500 font-semibold group-hover:text-pink-500 dark:text-white">
									Apply Nickname
								</p>
							</button>
							<button class="group flex flex-row gap-2 items-center"
								@click="() => deleteNickname(nickname.nicknameId)">
								<icon name="material-symbols:delete-forever-outline-rounded"
									class="font-semibold transition-all duration-500 group-hover:text-red-500 dark:text-white"
									size="24" />
								<p
									class="transition-all duration-500 font-semibold group-hover:text-red-500 dark:text-white">
									Delete Nickname
								</p>
							</button>
						</div>
					</li>
				</template>
			</ul>
		</template>
	</Block>

	<ModalsNicknameSignOut />
</template>

<script setup lang="ts">
const nick = useNick();
const preview = usePreview();

const { data: discordData } = await useFetch('/api/@me');
const { data: nicknameData, status: nicknameStatus, refresh: nicknameRefresh } = await useFetch('/api/nicknames/@me');

const applyNickname = (nickname: string) => {
	nick.value = nickname;
	preview.value = usePreviewPrepare(nick.value);
	navigateTo("/");
}

const deleteNickname = async (nicknameId: number) => {
	await $fetch(
		`/api/nicknames/nickname/${nicknameId}`,
		{
			method: "delete",
			body: {
				nickname: nick.value
			}
		}
	);

	nicknameRefresh();
}
</script>