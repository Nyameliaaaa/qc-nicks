<template>
	<client-only>
		<Dialog
			:open="modal.open && modal.modal === `CustomGradient`"
			@close="useUpdateModal(false)"
			class="relative z-50 overflow-hidden"
		>
			<div class="fixed inset-0 bg-black/75" aria-hidden="true" />

			<div class="fixed inset-0 flex items-center justify-center p-4">
				<DialogPanel class="w-full max-w-md drop-shadow-2xl">
					<div class="rounded-t-lg bg-white p-4 dark:bg-neutral-800">
						<DialogTitle class="text-2xl font-bold dark:text-white"
							>Add color to gradient.</DialogTitle
						>
						<DialogDescription
							class="text-lg font-medium text-gray-800 dark:text-gray-400"
						>
							Use the color picker below to add color.
						</DialogDescription>

						<div class="mt-2 flex justify-center">
							<ColorPicker
								:color="color"
								alphaChannel="hide"
								defaultFormat="hex"
								:visibleFormats="['hex']"
								@color-change="updateColor"
								class="dark:bg-neutral-800 dark:text-white"
							>
								<template v-slot:copy-button />
							</ColorPicker>
						</div>
					</div>

					<div class="rounded-b-lg bg-slate-100 p-4 dark:bg-neutral-900">
						<div class="flex flex-row justify-end gap-3">
							<button
								class="rounded-lg bg-white p-2 font-semibold transition-all duration-500 hover:bg-slate-200/60 hover:shadow-lg dark:bg-neutral-800 dark:text-white hover:dark:bg-neutral-700"
								@click="useUpdateModal(false)"
							>
								Cancel
							</button>
							<button
								class="rounded-lg bg-pink-500 p-2 font-bold transition-all duration-500 hover:bg-pink-500/80 hover:shadow-lg dark:text-white"
								@click="
									() => {
										$emit('color-update', color);
										useUpdateModal(false);
									}
								"
							>
								Add Color
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
const color = useState("modalGradient", () => "#ffffff");

defineEmits<{
	(event: "color-update", color: string): void;
}>();

const updateColor = (event: ColorChangeEvent) => {
	color.value = event.cssColor;
};
</script>

<style>
#color-picker-color-hex {
	@apply mt-0 block w-full border-0 border-b-2 border-black bg-white px-0.5 transition-all duration-500 focus:border-pink-600 focus:ring-0 dark:border-gray-200 dark:bg-neutral-800 dark:text-white dark:focus:border-pink-500;
}

.vacp-copy-button {
	@apply transition-all duration-150 dark:bg-neutral-900;
}

.vacp-color-input-label,
.vacp-color-input-label-text {
	@apply text-left;
}

.vacp-color-input-label {
	@apply mt-2;
}
</style>
