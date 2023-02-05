<template>
	<h1 class="text-4xl font-bold dark:text-white text-center mb-2">
		<span class="text-pink-500 font-extrabold">Amelia</span>'s Nick Helper
	</h1>
	<p class="text-lg dark:text-white mb-4">
		Type the name you want in the <code>Nickname.</code> field, see it in
		the <code>Preview</code>.
		<br />
		Use everything else down below to customize your nickname. Keep it
		readable, tho.
	</p>

	<div
		class="p-6 bg-slate-200 dark:bg-neutral-800 my-2 rounded-xl sticky top-0 shadow-lg z-50"
	>
		<div class="flex flex-col gap-2">
			<h2 class="text-gray-800 dark:text-gray-400 text-md font-medium">
				Preview
			</h2>
			<p
				class="text-white text-3xl font-bold text-center py-2 rounded-md"
				:class="`[background-image:_linear-gradient(#131a1b,#131a1b),_url('/assets/img/blank_sign.png')] [background-blend-mode:_hard-light]`"
			>
				<span
					v-for="section in preview"
					:style="`color: ${section.color};text-shadow: 4px 4px 0 #002929; font-family: Minecraft;`"
				>
					{{ section.text }}
				</span>
			</p>
		</div>
	</div>

	<div class="p-6 bg-slate-200 dark:bg-neutral-800 my-2 rounded-xl">
		<label class="block">
			<h2 class="text-gray-800 dark:text-gray-400 text-md font-medium">
				Nickname
			</h2>
			<input
				type="text"
				class="mt-0 block w-full px-0.5 border-0 border-b-2 border-black dark:border-gray-200 focus:ring-0 focus:border-pink- dark:focus:border-pink-600 dark:bg-neutral-800 transition-all dark:text-white"
				v-model="nick"
				@input.prevent="updateNick"
			/>

			<div class="flex flex-row items-center gap-2 mt-5">
				<h2
					class="text-gray-800 dark:text-gray-400 text-md font-medium"
				>
					Command
				</h2>
				<code class="dark:text-white text-xl font-bold text-center">
					/nick {{ nick }}
				</code>
				<button @click="">
					<Icon
						name="material-symbols:content-copy-outline-rounded"
						class="dark:text-white text-lg font-semibold"
						size="24"
					/>
				</button>
			</div>
		</label>

		<p class="text-gray-800 dark:text-gray-400 mt-1">{{ status }}</p>
	</div>

	<div class="p-6 bg-slate-200 dark:bg-neutral-800 my-2 rounded-xl">
		<h2 class="text-gray-800 dark:text-gray-400 text-md font-medium">
			Colors
		</h2>
		<div class="grid grid-cols-4 md:grid-cols-6">
			<button
				v-for="color in blockMCColors"
				:key="color.colorName"
				:style="`background-color: ${color.backgroundColor}; color: ${color.textColor}`"
				class="p-2 rounded-md m-2"
				@click.prevent="(event) => declareColorFunc(color)"
			>
				<p class="font-semibold">{{ color.colorName }}</p>
				<p>&{{ color.hexId }}</p>
			</button>
		</div>

		<label class="block">
			<h2 class="text-gray-800 dark:text-gray-400 text-md font-medium">
				Or add your own? [unfinished]
			</h2>
		</label>
	</div>

	<div class="p-6 bg-slate-200 dark:bg-neutral-800 my-2 rounded-xl">
		<h2 class="text-gray-800 dark:text-gray-400 text-md font-medium">
			Pride
		</h2>

		<tab-group>
			<tab-list class="grid grid-cols-3 gap-2">
				<tab
					as="template"
					v-slot="{ selected }"
					v-for="tab in [
						'Block MC Colors',
						'Flag Hexadecimals',
						'Gradients',
					]"
					:key="tab"
				>
					<div
						class="dark:text-white text-center cursor-pointer p-2 rounded-md hover:bg-slate-200 hover:dark:bg-neutral-700 transition-all"
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
	</div>

	<div class="p-6 bg-slate-200 dark:bg-neutral-800 my-2 rounded-xl">
		<form @submit.prevent="handleMacro">
			<label class="block">
				<h2
					class="text-gray-800 dark:text-gray-400 text-md font-medium"
				>
					Macro
				</h2>

				<div class="flex flex-row justify-between items-center gap-4">
					<input
						type="text"
						class="mt-0 block flex-1 px-0.5 border-0 border-b-2 border-black dark:border-gray-200 focus:ring-0 focus:border-pink- dark:focus:border-pink-600 dark:bg-neutral-800 transition-all dark:text-white"
						v-model="macro"
					/>
					<div>
						<input
							type="submit"
							value="Apply"
							class="text-white font-semibold hover:font-bold transition-all cursor-pointer bg-slate-200 p-2 rounded-md dark:bg-neutral-700"
						/>
					</div>
				</div>
				<div class="flex flex-row gap-2 mt-2">
					<Switch
						v-model="repeat"
						@update:model-value="handleMacro"
						:class="repeat ? 'bg-pink-600' : 'bg-slate-700'"
						class="relative inline-flex h-6 w-11 items-center rounded-full"
					>
						<span class="sr-only">Repeat</span>
						<span
							:class="repeat ? 'translate-x-6' : 'translate-x-1'"
							class="inline-block h-4 w-4 transform rounded-full bg-white transition"
						/>
					</Switch>
					<p class="text-md font-semibold dark:text-white">Repeat</p>
				</div>
			</label>
		</form>
	</div>

	<div class="p-6 bg-slate-200 dark:bg-neutral-800 my-2 rounded-xl">
		<h2 class="text-gray-800 dark:text-gray-400 text-md font-medium">
			Custom Gradients [unfinished]
		</h2>
	</div>

	<div class="p-6 bg-slate-200 dark:bg-neutral-800 my-2 rounded-xl">
		<div class="flex flex-row justify-between">
			<h2 class="text-gray-800 dark:text-gray-400 text-md font-medium">
				Save your Nickname [unfinished]
			</h2>
			<button class="flex flex-row gap-2 group">
				<p
					class="dark:text-white text-md group-hover:text-pink-500 transition-all"
				>
					{{ id ?? "Save Nickname" }}
				</p>
				<Icon
					name="material-symbols:save-outline-rounded"
					class="dark:text-white text-lg font-semibold group-hover:text-pink-500 transition-all"
					size="24"
				/>
			</button>
		</div>
	</div>

	<div class="p-6 bg-slate-200 dark:bg-neutral-800 my-2 rounded-xl">
		<p class="text-center dark:text-white font-semibold">
			Made with ❤️ by Amelia.
		</p>
		<p class="text-center dark:text-gray-400 text-gray-800">
			This tool is not made by, or ran by the Prism foundation.
		</p>
	</div>
</template>

<script setup lang="ts">
import { TabGroup, TabList, Tab, TabPanels, Switch } from "@headlessui/vue";
import { BlockMCColor, OutputLexicalNode, PrideColor } from "~~/utils/types";

// Constants
const blockMCColors = useBlockMCColors();
const prideMCColors = usePrideMCColors();
const prideColors = usePrideColors();
const gradients = useGradients();

const colorMap: Record<string, string> = {};
blockMCColors.map((color) => (colorMap[color.hexId] = color.backgroundColor));

// State
const nick = useState("input", () => {
	return "Queercraft";
});

const preview = useState<OutputLexicalNode[]>("output", () => [
	{ color: colorMap["f"], text: nick.value },
]);

const status = useState("status", () => "");
const id = useState<string | null | undefined>("id", () => null);

const macro = useState("macro", () => "");
const repeat = useState("repeat", () => false);
const color = useState("color", () => "#ffffff");

// Handle the preview field.
const showPreview = () => {
	preview.value = [];

	const parse = nick.value.split("");
	let index = 0;

	while (index < parse.length) {
		const value = parse[index];

		if (value === "&") {
			if (parse[index + 1] === "#") {
				preview.value.push({
					color: `${nick.value.slice(index + 1, index + 8)}`,
					text: "",
				});

				index += 8;
			} else {
				preview.value.push({
					color: `${colorMap[parse[index + 1]]}`,
					text: "",
				});

				index += 2;
			}
		} else {
			if (preview.value.length === 0) {
				preview.value.push({
					color: "",
					text: "",
				});
			}

			preview.value[preview.value.length - 1].text += value;
			index++;
		}
	}
};

// Handles nick filtering.
const updateNick = () => {
	let filter = nick.value.replace(/&([A-Fr0-9]|#[0-9A-F]{6})/gi, "");
	let invalidCharCheck = nick.value.match(/[^\w&#]/gi);

	if (filter.length > 20) {
		status.value = "Nickname is too long.";
	} else if (filter.length < 3) {
		status.value = "Nickname is too short.";
	} else {
		status.value = "Nickname is OK";
	}

	if (invalidCharCheck !== null) {
		if (invalidCharCheck[0] == " ") {
			status.value = "Nickname can't contain spaces";
		} else {
			status.value = "Nickname can't contain " + invalidCharCheck[0];
		}
	}

	showPreview();
};

// Handle color selection
const declareColorFunc = (color: BlockMCColor) => {
	// clear selected colors
	nick.value = nick.value
		.replaceAll(/&([A-Fr0-9]|#[0-9A-F]{6})/gi, "")
		.replaceAll("&#", "");

	nick.value = `&${color.hexId}${
		nick.value.startsWith("&") ? nick.value.slice(2) : nick.value
	}`;

	showPreview();
};

const handleMacro = () => {
	nick.value = nick.value
		.replaceAll(/&([A-Fr0-9]|#[0-9A-F]{6})/gi, "")
		.replaceAll("&#", "");

	let out = "";
	const colorPattern = macro.value.includes("#")
		? macro.value
				.slice(1)
				.split("#")
				.map((color) => `#${color}`)
		: macro.value.split("");

	if (repeat.value) {
		const inputChunk = useArraySplitting(nick.value.split(""), 2);

		out = inputChunk
			.map(
				(chunk, index) =>
					`&${colorPattern[index % colorPattern.length]}${chunk}`
			)
			.join("");
	} else {
		let charAmount = nick.value.length / colorPattern.length;

		for (let index = 0; index < colorPattern.length; index++) {
			out += `&${colorPattern[index]}${nick.value.slice(
				Math.floor(charAmount * index),
				Math.floor(charAmount * (index + 1))
			)}`;
		}
	}

	nick.value = out;
	showPreview();
};

const createPrideApplicator = (item: PrideColor) => {
	macro.value = item.colors.join("");
	repeat.value = item.repeat ?? false;
	handleMacro();
};

const hexToRgb = (hex: string) => {
	var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
	return result
		? [
				parseInt(result[1], 16),
				parseInt(result[2], 16),
				parseInt(result[3], 16),
		  ]
		: [];
};

const updateColor = (event: any) => {
	color.value = event.cssColor;
	nick.value = nick.value
		.replaceAll(/&([A-Fr0-9]|#[0-9A-F]{6})/gi, "")
		.replaceAll("&#", "");

	console.log(color.value);
	nick.value = `&${color.value}${nick.value}`;
	showPreview();
};

// thanks to sarah and xenni for this masterpiece
const calculateGradientColor = (
	workingText: string,
	startColor: string,
	endColor: string
) => {
	workingText = workingText.replace(/&([0-9a-f]|#[0-9a-f]{6})/gi, "");

	const [startR, startG, startB] = hexToRgb(startColor);
	const [endR, endG, endB] = hexToRgb(endColor);

	const diffR = startR - endR;
	const diffG = startG - endG;
	const diffB = startB - endB;

	let stepR, stepG, stepB;

	if (workingText.length > 1) {
		stepR = diffR / (workingText.length - 1);
		stepG = diffG / (workingText.length - 1);
		stepB = diffB / (workingText.length - 1);
	} else {
		stepR = 0;
		stepG = 0;
		stepB = 0;
	}

	let output = "";

	for (let i = 0; i < workingText.length; i++) {
		let hexCode = "&#";

		hexCode += ("0" + (startR - Math.round(stepR * i)).toString(16)).slice(
			-2
		);

		hexCode += ("0" + (startG - Math.round(stepG * i)).toString(16)).slice(
			-2
		);

		hexCode += ("0" + (startB - Math.round(stepB * i)).toString(16)).slice(
			-2
		);

		hexCode += workingText[i];
		output += hexCode;
	}

	return output;
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

		out += calculateGradientColor(
			textToSend,
			gradient.colors[index],
			gradient.colors[index + 1]
		);
	}

	nick.value = out;
	showPreview();
};
</script>
