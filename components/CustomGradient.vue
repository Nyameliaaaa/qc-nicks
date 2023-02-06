<template>
	<block>
		<h2 class="text-lg font-bold dark:text-white">Custom Gradient</h2>
		<p class="text-md mb-2 font-semibold text-gray-800 dark:text-gray-400">
			You must have at least 3 colors to remove a color.
		</p>

		<h3 class="text-md text-gray-800 dark:text-gray-400">Preview</h3>
		<div
			class="mb-3 h-8 w-full rounded-md"
			:style="`background: linear-gradient(90deg, ${gradientState
				.map((x) => `rgb(${useRGB(x).join(',')})`)
				.join(',')});`"
		></div>

		<div class="mt-3 flex flex-row items-center justify-between">
			<h3 class="text-md text-gray-800 dark:text-gray-400">Colors</h3>
			<button
				class="group flex flex-row gap-2"
				@click="useUpdateModal(true, 'CustomGradient')"
			>
				<p
					class="text-md transition-all duration-500 group-hover:text-pink-500 dark:text-white"
				>
					Add Color
				</p>
				<icon
					name="material-symbols:add-circle-outline-rounded"
					class="text-lg font-semibold transition-all duration-500 group-hover:text-pink-500 dark:text-white"
					size="24"
				/>
			</button>
		</div>
		<div
			v-for="gradient in gradientState.map((data, index) => ({
				index,
				data,
			}))"
			:key="gradient.index"
			class="my-2 flex items-center justify-between rounded-lg bg-slate-200 p-2 dark:bg-neutral-900"
		>
			<div class="flex flex-row items-center gap-2">
				<div
					class="h-8 w-8 rounded-full"
					:style="`background: ${gradient.data}`"
				></div>
				<p class="dark:text-white">{{ gradient.data }}</p>
			</div>
			<button @click="removeGradient(gradient)" class="group flex flex-row gap-2">
				<p
					class="text-md transition-all duration-500 group-hover:text-pink-500 dark:text-white"
				>
					Delete color
				</p>
				<icon
					name="material-symbols:delete-outline-rounded"
					class="text-lg font-semibold transition-all duration-500 group-hover:text-pink-500 dark:text-white"
					size="24"
				/>
			</button>
		</div>

		<button
			class="group mt-3 flex flex-row gap-2 rounded-lg bg-white p-2 font-semibold transition-all duration-500 hover:bg-slate-200/60 hover:shadow-lg dark:bg-neutral-900 dark:text-white hover:dark:bg-neutral-700"
			@click="useUpdateGradient({ colors: gradientState })"
		>
			<icon
				name="material-symbols:add-circle-outline-rounded"
				class="text-lg font-semibold transition-all duration-500 group-hover:text-pink-500 dark:text-white"
				size="24"
			/>
			<p
				class="text-md transition-all duration-500 group-hover:text-pink-500 dark:text-white"
			>
				Add Gradient
			</p>
		</button>
	</block>

	<GradientModal @color-update="(color) => gradientState.push(color)" />
</template>

<script setup lang="ts">
const gradientState = useColors();
const removeGradient = (gradient: { index: number; data: string }) => {
	if (gradientState.value.length <= 2) {
		return;
	}

	gradientState.value.splice(gradient.index, 1);
};
</script>
