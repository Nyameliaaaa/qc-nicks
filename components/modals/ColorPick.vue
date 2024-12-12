<template>
	<client-only>
		<Dialog :open="modal.open && modal.modal === `BlockColors`" @close="useUpdateModal(false)"
			class="relative z-50 overflow-hidden">
			<div class="fixed inset-0 bg-crust/75" aria-hidden="true" />

			<div class="fixed inset-0 flex items-center justify-center p-4">
				<DialogPanel class="w-full max-w-md drop-shadow-2xl drop-shadow-mantle">
					<div class="rounded-t-lg p-4 bg-base">
						<DialogTitle class="text-2xl font-bold">Add your own color</DialogTitle>
						<DialogDescription class="text-lg font-medium text-subtext0">
							Use the color picker below to select your own color.
						</DialogDescription>

						<div class="mt-2 flex justify-center">
							<ColorPicker :color="color" alphaChannel="hide" defaultFormat="hex"
								:visibleFormats="['hex']" @color-change="updateColor" class="dark:bg-neutral-800">
								<template v-slot:copy-button />
							</ColorPicker>
						</div>
					</div>

					<div class="rounded-b-lg p-4 bg-mantle">
						<div class=" flex flex-row justify-end gap-3">
							<button
								class="rounded-lg bg-base p-2 transition-all duration-500 hover:bg-surface0 hover:shadow-lg hover:shadow-mantle"
								@click="useUpdateModal(false)">
								Cancel
							</button>
							<button
								class="rounded-lg bg-surface0 text-pink p-2 font-bold transition-all duration-500 hover:bg-pink hover:text-mantle hover:shadow-lg"
								@click="() => {
									$emit('color-update', color);
									useUpdateModal(false);
								}
									">
								Use Color
							</button>
						</div>
					</div>
				</DialogPanel>
			</div>
		</Dialog>
	</client-only>
</template>

<script setup lang="ts">
import { type ColorChangeEvent, ColorPicker } from "vue-accessible-color-picker/unstyled";
import { Dialog, DialogPanel, DialogTitle, DialogDescription } from "@headlessui/vue";
const modal = useModal();
const color = useColor();

defineEmits<{
	(event: "color-update", color: string): void;
}>();

const updateColor = (event: ColorChangeEvent) => {
	color.value = event.cssColor;
};
</script>

<style>
.vacp-color-picker {
	@apply bg-base;
}

.vacp-copy-button {
	@apply bg-surface0 transition-all duration-150 hover:bg-surface1;
}

#color-picker-color-hex {
	@apply mt-0 block w-full bg-base border-0 border-b-2 border-subtext0 px-0.5 transition-all duration-500 focus:border-pink focus:ring-0;
}


.vacp-color-input-label,
.vacp-color-input-label-text {
	@apply text-left;
}

.vacp-color-input-label {
	@apply mt-2;
}
</style>
