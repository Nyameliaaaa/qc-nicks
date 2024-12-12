<template>
	<block title="Custom Gradients">
		<div class="mt-2 mb-4">
			<h3 class="text-md text-subtext0 mb-1">Preview</h3>
			<div class="h-8 w-full rounded-md" :style="`background: linear-gradient(90deg, ${colors
				.map((x) => `rgb(${useRGB(x).join(',')})`)
				.join(',')});`"></div>
		</div>

		<div class="mb-1 flex flex-row items-center justify-between">
			<h3 class="text-md text-subtext0">Colors</h3>
			<IconButton text="Add Color" icon-name="material-symbols:add-circle-outline-rounded"
				@click="useUpdateModal(true, 'CustomGradient')" />
		</div>

		<template v-for="(gradient, index) in colors" :key="index">
			<div
				class="my-2 flex flex-col justify-between gap-2 rounded-lg p-2 bg-base md:flex-row md:items-center md:gap-0">
				<div class="flex flex-row items-center gap-2">
					<div class="h-8 w-8 rounded-full" :style="`background: ${gradient}`"></div>
					<p>
						{{ gradient }}
					</p>
				</div>
				<div class="flex flex-row items-center justify-between gap-2 md:justify-end">
					<button class="group" @click="() => moveItem(colors, index, index - 1)" :disabled="index === 0">
						<icon name="material-symbols:arrow-upward-rounded"
							class="text-subtext0 transition-all duration-500" size="28" :class="index === 0
								? `cursor-not-allowed text-subtext1`
								: `cursor-pointer group-hover:text-pink`
								" />
					</button>
					<button class="group" @click="() => moveItem(colors, index, index + 1)"
						:disabled="index === colors.length - 1">
						<icon name="material-symbols:arrow-downward-rounded"
							class="text-subtext0 transition-all duration-500" size="28" :class="index === colors.length - 1
								? `cursor-not-allowed text-subtext1`
								: `cursor-pointer group-hover:text-pink`
								" />
					</button>
					<button @click="removeGradient({ gradient, index })" class="group" :disabled="colors.length === 2">
						<icon name="material-symbols:delete-outline-rounded"
							class="text-subtext0 transition-all duration-500" :class="colors.length === 2
								? `cursor-not-allowed text-subtext1`
								: `cursor-pointer group-hover:text-red`
								" size="28" />
					</button>
				</div>
			</div>
		</template>

		<button
			class="group mt-3 p-2 flex flex-row gap-2 transition-all duration-500 rounded-lg bg-base hover:bg-surface0"
			@click="useUpdateGradient()">
			<icon name="material-symbols:add-circle-outline-rounded"
				class="transition-all duration-500 group-hover:text-pink" size="24" />
			<p class="text-md font-semibold transition-all duration-500 group-hover:text-pink">
				Apply Gradient
			</p>
		</button>
	</block>

	<ModalsGradient @color-update="(color: string) => colors.push(color)" />
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
