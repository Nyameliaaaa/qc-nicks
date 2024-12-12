<template>
	<client-only>
		<Dialog :open="modal.open && modal.modal === `NicknameSignIn`" @close="useUpdateModal(false)"
			class="relative z-50 overflow-hidden">
			<div class="fixed inset-0 bg-crust/75" aria-hidden="true" />

			<div class="fixed inset-0 flex items-center justify-center p-4">
				<DialogPanel class="w-full max-w-md drop-shadow-2xl drop-shadow-mantle">
					<div class="rounded-t-lg p-4 bg-base">
						<DialogTitle class="text-2xl font-bold">Sign In</DialogTitle>
						<DialogDescription class="text-lg font-medium text-subtext0">
							Nicknames are managed through Discord. Make sure to copy your nickname as continuing with
							login will remove it.
						</DialogDescription>
					</div>
					<div class="rounded-b-lg p-4 bg-mantle">
						<div class=" flex flex-row justify-end gap-3">
							<button
								class="rounded-lg bg-base p-2 transition-all duration-500 hover:bg-surface0 hover:shadow-lg hover:shadow-mantle"
								@click="useUpdateModal(false)">
								Cancel
							</button>
							<a class="rounded-lg bg-surface0 text-pink p-2 font-bold transition-all duration-500 hover:bg-pink hover:text-mantle hover:shadow-lg"
								href="/api/auth/discord">
								Sign In
							</a>
						</div>
					</div>
				</DialogPanel>
			</div>
		</Dialog>
	</client-only>
</template>

<script setup lang="ts">
import { Dialog, DialogPanel, DialogTitle, DialogDescription } from "@headlessui/vue";

const modal = useModal();
</script>
