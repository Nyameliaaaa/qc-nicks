<template>
	<block title="Pride">
		<tab-group>
			<tab-list class="grid grid-cols-1 gap-2 md:grid-cols-3">
				<tab as="template" v-slot="{ selected }" v-for="tab in tabs" :key="tab">
					<div class="cursor-pointer rounded-md p-2 text-center transition-all duration-500 hover:bg-white dark:text-white hover:dark:bg-neutral-700"
						:class="{
							'font-semibold dark:bg-neutral-700/70': selected,
						}">
						{{ tab }}
					</div>
				</tab>
			</tab-list>
			<tab-panels>
				<color-selection-panel @button-click="createPrideApplicator" :items="prideMCColors"
					:color-map="colorMap" />
				<color-selection-panel @button-click="createPrideApplicator" :items="prideColors"
					:color-map="colorMap" />
				<color-selection-panel @button-click="createGradientApplicator" :items="prideColors"
					:color-map="colorMap" :gradient="true" />
			</tab-panels>
		</tab-group>
	</block>
</template>

<script setup lang="ts">
import { Tab, TabGroup, TabList, TabPanels } from "@headlessui/vue";
import type { PrideColor } from "~~/utils/types";

const prideMCColors = usePrideMCColors();
const prideColors = usePrideColors();
const colorMap = useColorMap();
const tabs = [
	"Block MC Colors",
	"True Flag Colors",
	"Gradients",
];

const colors = useColors();
const macroState = useMacro();

let macro = macroState.value;

const createPrideApplicator = (item: PrideColor) => {
	macro.macro = item.colors.join("");
	macro.repeat = Boolean(item.repeat) ?? false;
	useUpdateMacro();
};

const createGradientApplicator = (item: PrideColor) => {
	colors.value = item.colors.slice();
	useUpdateGradient();
};
</script>
