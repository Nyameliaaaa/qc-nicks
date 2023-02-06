<template>
	<block>
		<h2 class="text-md font-medium text-gray-800 dark:text-gray-400">Pride</h2>

		<tab-group>
			<tab-list class="grid grid-cols-1 gap-2 md:grid-cols-3">
				<tab as="template" v-slot="{ selected }" v-for="tab in tabs" :key="tab">
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
					@button-click="useUpdateGradient"
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
</script>
