<template>
	<block>
		<h2 class="text-md font-medium text-gray-800 dark:text-gray-400">
			Pride
		</h2>

		<tab-group>
			<tab-list class="grid grid-cols-3 gap-2">
				<tab
					as="template"
					v-slot="{ selected }"
					v-for="tab in tabs"
					:key="tab"
				>
					<div
						class="cursor-pointer rounded-md p-2 text-center transition-all duration-500 hover:bg-white dark:text-white hover:dark:bg-neutral-700"
						:class="{
							'font-semibold dark:bg-neutral-700/70': selected,
						}"
					>
						{{ tab }}
					</div>
				</tab>
			</tab-list>
			<tab-panels>
				<color-selection-panel
					@button-click="createPrideApplicator"
					:items="prideMCColors"
					:color-map="colorMap"
				/>
				<color-selection-panel
					@button-click="createPrideApplicator"
					:items="prideColors"
					:color-map="colorMap"
				/>
				<color-selection-panel
					@button-click="createGradientApplicator"
					:items="gradients"
					:color-map="colorMap"
					:gradient="true"
				/>
			</tab-panels>
		</tab-group>
	</block>
</template>

<script setup lang="ts">
import { Tab, TabGroup, TabList, TabPanels } from "@headlessui/vue";
import { PrideColor } from "~~/utils/types";

const prideMCColors = usePrideMCColors();
const prideColors = usePrideColors();
const gradients = useGradients();
const colorMap = useColorMap();
const tabs = [
	"Block MC Colors",
	"Flag Hexadecimals [unfinished]",
	"Gradients [needs more]",
];

const nick = useNick();
const status = useStatus();

const macroState = useMacro();
let macro = macroState.value;

const createPrideApplicator = (item: PrideColor) => {
	macro.macro = item.colors.join("");
	macro.repeat = item.repeat ?? false;
	useUpdateMacro();
};

const createGradientApplicator = (gradient: PrideColor) => {
	let out = "";
	nick.value = nick.value.replace(/&([0-9a-f]|#[0-9a-f]{6})/gi, "");

	if (nick.value.length < gradient.colors.length) {
		status.value = "Your nickname is too short for this gradient.";
		return;
	}

	const sections = nick.value.length / (gradient.colors.length - 1);
	const stages = gradient.colors.length - 1;

	for (let index = 0; index < stages; index++) {
		const textToSend = nick.value.slice(
			Math.floor(sections * index),
			Math.floor(sections * (index + 1))
		);

		out += useCalculateGradientColors(
			textToSend,
			gradient.colors[index],
			gradient.colors[index + 1]
		);
	}

	nick.value = out;
	useUpdatePreview();
};
</script>
