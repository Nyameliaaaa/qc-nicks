<template>
	<p class="mb-4 text-lg">
		Your saved nicknames are shown below. Please keep in mind that Amelia can see them, so don't get too.. you
		know.. personal.
	</p>

	<NuxtLink class="group flex flex-row gap-2 items-center" to="/">
		<icon name="material-symbols:arrow-back-2-outline-rounded"
			class="font-semibold transition-all duration-500 group-hover:text-pink" size="24" />
		<p class="transition-all duration-500 font-semibold group-hover:text-pink">
			Go Back Home
		</p>
	</NuxtLink>

	<template v-if="discordData">
		<Block title="Me">
			<template v-if="discordStatus === 'pending'">
				<div class="flex flex-row justify-between items-center mt-2">
					<div class="flex flex-row items-center gap-2">
						<img :src="`https://cdn.discordapp.com/embed/avatars/5.png`" alt=""
							class="rounded-full w-16 h-16">
						<div>
							<p class="font-semibold text-lg">Madeline Celeste</p>
							<p class="text-subtext0 font-medium text-sm">@mountceleste</p>
						</div>
					</div>
					<IconButton text="Sign Out" icon-name="material-symbols:logout" destructive
						@click="useUpdateModal(true, 'nicknameSignOut')" />
				</div>
			</template>
			<template v-if="discordStatus === 'success' && discordData">
				<div class="flex flex-row justify-between items-center mt-2">
					<div class="flex flex-row items-center gap-2">
						<img :src="discordData.avatar" alt="" class="rounded-full w-16 h-16">
						<div>
							<p class="font-semibold text-lg">{{ discordData.name }}</p>
							<p class="text-subtext0 font-medium text-sm">@{{ discordData.username }}</p>
						</div>
					</div>
					<IconButton text="Sign Out" icon-name="material-symbols:logout" destructive
						@click="() => useUpdateModal(true, 'nicknameSignOut')" />
				</div>
			</template>
		</Block>
	</template>
	<Block title="Saved Nicknames">
		<template v-if="nicknameStatus === `pending`">
			<div class="flex flex-row justify-center">
				<div class="group flex flex-row gap-2 transition-all duration-500 items-center">
					<Icon name="material-symbols:error-outline-rounded" class="transition-all duration-500 text-text"
						size="36" />
					<p class="transition-all duration-500 text-lg text-text font-semibold">
						Loading nicknames :3
					</p>
				</div>
			</div>
		</template>
		<template v-if="nicknameStatus === `error`">
			<div class="group flex flex-row gap-2 transition-all duration-500 items-center">
				<Icon name="material-symbols:error-outline-rounded" class="transition-all duration-500 text-text"
					size="36" />
				<p class="transition-all duration-500 text-lg text-text font-semibold">
					Something went wrong!
				</p>
			</div>
		</template>
		<template v-if="nicknameStatus === `success` && nicknameData">
			<div v-if="!nicknameData.nicknames.length" class="flex flex-row justify-center">
				<div class="group flex flex-row gap-2 transition-all duration-500 items-center">
					<Icon name="material-symbols:error-outline-rounded" class="transition-all duration-500 text-text"
						size="36" />
					<p class="transition-all duration-500 text-lg text-text font-semibold">
						You do not have any nicknames saved!
					</p>
				</div>
			</div>
			<ul v-else class="flex flex-col mt-2 gap-2">
				<template v-for="nickname in nicknameData.nicknames" :key="nickname.nicknameId">
					<li class="">
						<div class="rounded-md py-2 px-4 bg-crust text-white mb-2">
							<span v-for="section in usePreviewPrepare(nickname.nickname)"
								:style="`color: ${section.color};font-family: Minecraft;`"
								class="text-3xl drop-shadow-md">
								{{ section.text }}
							</span>
						</div>
						<div class="flex flex-row items-center gap-2 md:gap-4">
							<IconButton text="Apply Nickname" icon-name="material-symbols:save-outline-rounded"
								@click="applyNickname(nickname.nickname)" />
							<IconButton text="Delete Nickname"
								icon-name="material-symbols:delete-forever-outline-rounded"
								@click="deleteNickname(nickname.nicknameId)" destructive />
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

const { data: discordData, status: discordStatus } = await useFetch('/api/@me');
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