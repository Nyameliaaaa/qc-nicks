<template>
	<p class="mb-4 text-lg dark:text-white">
		Your saved nicknames are shown below.
	</p>

	<template v-if="data">
		<Block title="Me">
			<div class="flex flex-row justify-between items-center">
				<div class="flex flex-row items-center gap-2">
					<img :src="data.user.image" alt="" class="rounded-full w-12 h-12">
					<p class="dark:text-white font-bold text-lg">{{ data.user.name }}</p>
				</div>
				<button class="group flex flex-row gap-2" @click="() => useUpdateModal(true, `NicknameSignOut`)">
					<p
						class="text-md transition-all duration-500 font-semibold group-hover:text-red-500 dark:text-white">
						Sign Out
					</p>
					<icon name="material-symbols:save-outline-rounded"
						class="text-lg font-semibold transition-all duration-500 group-hover:text-red-500 dark:text-white"
						size="24" />
				</button>
			</div>
		</Block>

		<Block title="Saved Nicknames"></Block>
	</template>

	<ModalsNicknameSignOut />
</template>

<script setup lang="ts">
const { status, data } = useAuth();

onMounted(() => {
	if (status === "unauthenticated") {
		navigateTo("/");
	}
})
</script>