<template>
	<block>
		<h2 class="text-lg font-bold dark:text-white">Custom Gradient</h2>
		<p class="text-md mb-2 font-semibold text-gray-800 dark:text-gray-400">
			You must have at least 3 colors to remove a color.
		</p>

		<h3 class="text-md text-gray-800 dark:text-gray-400">Preview</h3>
		<div
			class="mb-3 h-8 w-full rounded-md"
			:style="`background: linear-gradient(90deg, ${colors
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

		<template v-for="(gradient, index) in colors" :key="index">
			<div
				class="my-2 flex flex-col justify-between gap-2 rounded-lg bg-slate-200 p-2 dark:bg-neutral-900 md:flex-row md:items-center md:gap-0"
			>
				<div class="flex flex-row items-center gap-2">
					<div
						class="h-8 w-8 rounded-full"
						:style="`background: ${gradient}`"
					></div>
					<p class="dark:text-white">
						{{ gradient }}
					</p>
				</div>
				<div
					class="flex flex-row items-center justify-between gap-2 md:justify-end"
				>
					<button
						class="group"
						@click="() => moveItem(colors, index, index - 1)"
						:disabled="index === 0"
					>
						<icon
							name="bx:chevron-up"
							class="text-lg font-semibold transition-all duration-500"
							size="36"
							:class="
								index === 0
									? `cursor-not-allowed text-gray-800 dark:text-gray-400`
									: `cursor-pointer group-hover:text-pink-500 dark:text-white`
							"
						/>
					</button>
					<button
						class="group"
						@click="() => moveItem(colors, index, index + 1)"
						:disabled="index === colors.length - 1"
					>
						<icon
							name="bx:chevron-down"
							class="text-lg font-semibold transition-all duration-500"
							size="36"
							:class="
								index === colors.length - 1
									? `cursor-not-allowed text-gray-800 dark:text-gray-400`
									: `cursor-pointer group-hover:text-pink-500 dark:text-white`
							"
						/>
					</button>
					<button @click="removeGradient({ gradient, index })" class="group">
						<icon
							name="material-symbols:delete-outline-rounded"
							class="text-lg font-semibold transition-all duration-500 group-hover:text-pink-500 dark:text-white"
							size="24"
						/>
					</button>
				</div>
			</div>
		</template>

		<button
			class="group mt-3 flex flex-row gap-2 rounded-lg bg-white p-2 font-semibold transition-all duration-500 hover:bg-slate-200/60 hover:shadow-lg dark:bg-neutral-900 dark:text-white hover:dark:bg-neutral-700"
			@click="useUpdateGradient()"
		>
			<icon
				name="material-symbols:add-circle-outline-rounded"
				class="text-lg font-semibold transition-all duration-500 group-hover:text-pink-500 dark:text-white"
				size="24"
			/>
			<p
				class="text-md transition-all duration-500 group-hover:text-pink-500 dark:text-white"
			>
				Apply Gradient
			</p>
		</button>
	</block>

	<GradientModal @color-update="(color) => colors.push(color)" />
</template>

<script setup lang="ts">
const colors = useColors();

const removeGradient = (gradient: { index: number; gradient: string }) => {
	if (colors.value.length <= 2) {
		return;
	}

	colors.value.splice(gradient.index, 1);
};

const moveItem = <T>(targetArray: T[], indexFrom: number, indexTo: number) => {
	const targetElement = targetArray[indexFrom];
	const magicIncrement = (indexTo - indexFrom) / Math.abs(indexTo - indexFrom);

	for (let index = indexFrom; index != indexTo; index += magicIncrement) {
		targetArray[index] = targetArray[index + magicIncrement];
	}

	targetArray[indexTo] = targetElement;
};
</script>
