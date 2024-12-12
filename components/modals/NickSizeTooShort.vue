<template>
	<client-only>
		<Dialog :open="modal.open && modal.modal == 'NickSizeTooShort'" @close="useUpdateModal(false)"
			class="relative z-50 overflow-hidden">
			<div class="fixed inset-0 bg-crust/75" aria-hidden="true" />

			<div class="fixed inset-0 flex items-center justify-center p-4">
				<DialogPanel class="w-full max-w-md drop-shadow-2xl drop-shadow-mantle">
					<div class="rounded-t-lg p-4 bg-base">
						<DialogTitle class="text-2xl font-semibold">Too short!</DialogTitle>
						<DialogDescription class="text-lg text-subtext0">
							This {{ modal.data.objType }} is {{ modal.data.colorLen }} colors long. Your nickname is
							{{ modal.data.colorLen - modal.data.nickLen }}
							characters short.
						</DialogDescription>
					</div>

					<div class="rounded-b-lg p-4 bg-mantle">
						<div class=" flex flex-row justify-end gap-3">
							<button
								class="rounded-lg bg-base p-2 px-8 font-bold transition-all duration-500 hover:bg-pink hover:text-mantle hover:shadow-mantle hover:shadow-lg"
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

const modal = useModal<{ nickLen: number; colorLen: number; objType: string }>();
</script>
