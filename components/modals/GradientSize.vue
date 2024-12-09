<template>
	<client-only>
		<Dialog :open="modal.open && modal.modal == 'GradientSize'" @close="useUpdateModal(false)"
			class="relative z-50 overflow-hidden">
			<div class="fixed inset-0 bg-black/75" aria-hidden="true" />

			<div class="fixed inset-0 flex items-center justify-center p-4">
				<DialogPanel class="w-full max-w-md drop-shadow-2xl">
					<div class="rounded-t-lg bg-white p-4 dark:bg-neutral-800">
						<DialogTitle class="text-2xl font-bold dark:text-white">Too short!</DialogTitle>
						<DialogDescription class="text-lg font-medium text-gray-800 dark:text-gray-400">
							This gradient is {{ modal.data.colorLen }} colors long. Your nickname is
							{{ modal.data.colorLen - modal.data.nickLen }}
							characters short.
						</DialogDescription>
					</div>

					<div class="rounded-b-lg bg-slate-100 p-4 dark:bg-neutral-900">
						<div class="flex flex-row justify-end gap-3">
							<button
								class="rounded-lg bg-pink-500 p-2 px-8 font-bold transition-all duration-500 hover:bg-pink-500/80 hover:shadow-lg dark:text-white"
								tabindex="1" @click="useUpdateModal(false)">
								Ok
							</button>
						</div>
					</div>
				</DialogPanel>
			</div>
		</Dialog>
	</client-only>
</template>

<script setup lang="ts">
import { Dialog, DialogDescription, DialogPanel, DialogTitle } from "@headlessui/vue";

const modal = useModal<{ nickLen: number; colorLen: number; }>();
</script>
