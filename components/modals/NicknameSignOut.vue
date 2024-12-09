<template>
	<client-only>
		<Dialog :open="modal.open && modal.modal === `NicknameSignOut`" @close="useUpdateModal(false)"
			class="relative z-50 overflow-hidden">
			<div class="fixed inset-0 bg-black/75" aria-hidden="true" />

			<div class="fixed inset-0 flex items-center justify-center p-4">
				<DialogPanel class="w-full max-w-md drop-shadow-2xl">
					<div class="rounded-t-lg bg-white p-4 dark:bg-neutral-800">
						<DialogTitle class="text-2xl font-bold dark:text-white">Sign Out</DialogTitle>
						<DialogDescription class="text-lg font-medium text-gray-800 dark:text-gray-400">
							Are you sure you want to continue?
						</DialogDescription>
					</div>
					<div class="rounded-b-lg bg-slate-100 p-4 dark:bg-neutral-900">
						<div class="flex flex-row justify-end gap-3">
							<button
								class="rounded-lg bg-white p-2 font-semibold transition-all duration-500 hover:bg-slate-200/60 hover:shadow-lg dark:bg-neutral-800 dark:text-white hover:dark:bg-neutral-700"
								@click="useUpdateModal(false)">
								Cancel
							</button>
							<button
								class="rounded-lg bg-red-500 p-2 font-bold transition-all duration-500 hover:bg-red-500/80 hover:shadow-lg dark:text-white"
								@click="() => {
									signOut({ callbackUrl: `/` }); useUpdateModal(false);
								}">
								Sign Out
							</button>
						</div>
					</div>
				</DialogPanel>
			</div>
		</Dialog>
	</client-only>
</template>

<script setup lang="ts">
import { ColorChangeEvent, ColorPicker } from "vue-accessible-color-picker";
import { Dialog, DialogPanel, DialogTitle, DialogDescription } from "@headlessui/vue";

const modal = useModal();
const { signOut } = useAuth();
</script>
