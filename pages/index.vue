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
		class="p-6 bg-slate-200 dark:bg-neutral-800 my-2 rounded-xl sticky top-0 shadow-lg"
	>
		<div class="flex flex-col gap-2">
			<h2 class="text-gray-800 dark:text-gray-400 text-md font-medium">
				Preview
			</h2>
			<p class="dark:text-white text-3xl font-bold text-center">
				<span
					v-for="section in output"
					:style="`color: ${section.color}`"
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
				v-model="input"
				@input.prevent="updateNick"
			/>

			<div class="flex flex-row items-center gap-2 mt-5">
				<h2
					class="text-gray-800 dark:text-gray-400 text-md font-medium"
				>
					Command
				</h2>
				<code class="dark:text-white text-xl font-bold text-center">
					/nick {{ input }}
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
				:key="color.name"
				:style="`background-color: ${color.bg}; color: ${color.text}`"
				class="p-2 rounded-md m-2"
				@click.prevent="(event) => declareColorFunc(color)()"
			>
				<p class="font-semibold">{{ color.name }}</p>
				<p>&{{ color.code }}</p>
			</button>
		</div>

		<label class="block">
			<h2 class="text-gray-800 dark:text-gray-400 text-md font-medium">
				Or add your own?
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
					@button-click="(item) => declarePrideFunc(item)"
					:items="prideMCColors"
					:color-map="colorMap"
				/>
				<color-selection-panel
					@button-click="(item) => declarePrideFunc(item)"
					:items="prideColors"
					:color-map="colorMap"
				/>
				<color-selection-panel
					@button-click="(item) => declarePrideFunc(item)"
					:items="gradients"
					:color-map="colorMap"
					:gradient="true"
				/>
			</tab-panels>
		</tab-group>
	</div>

	<div class="p-6 bg-slate-200 dark:bg-neutral-800 my-2 rounded-xl">
		<label class="block">
			<h2 class="text-gray-800 dark:text-gray-400 text-md font-medium">
				Macro
			</h2>
			<input
				type="text"
				class="mt-0 block w-full px-0.5 border-0 border-b-2 border-black dark:border-gray-200 focus:ring-0 focus:border-pink- dark:focus:border-pink-600 dark:bg-neutral-800 transition-all dark:text-white"
				:value="macro"
				@input="(event) => updateMacro(event)"
			/>

			<div class="flex flex-row gap-2 mt-2">
				<Switch
					v-model="repeat"
					@update:model-value="(val) => updateNickRepeat(val)"
					:class="repeat ? 'bg-pink-600' : 'bg-slate-700'"
					class="relative inline-flex h-6 w-11 items-center rounded-full"
				>
					<span class="sr-only"
						>Repeat (Will not work with hex codes)</span
					>
					<span
						:class="repeat ? 'translate-x-6' : 'translate-x-1'"
						class="inline-block h-4 w-4 transform rounded-full bg-white transition"
					/>
				</Switch>
				<p class="text-md font-semibold dark:text-white">
					Repeat (Will not work with hex codes)
				</p>
			</div>
		</label>
	</div>

	<div class="p-6 bg-slate-200 dark:bg-neutral-800 my-2 rounded-xl">
		<h2 class="text-gray-800 dark:text-gray-400 text-md font-medium">
			Custom Gradients (coming soon)
		</h2>
	</div>

	<div class="p-6 bg-slate-200 dark:bg-neutral-800 my-2 rounded-xl">
		<div class="flex flex-row justify-between">
			<h2 class="text-gray-800 dark:text-gray-400 text-md font-medium">
				Save your Nickname
			</h2>
			<button class="flex flex-row gap-2 group" @click="saveNick">
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
import {
	BlockMCColor,
	OutputLexicalNode,
	PrideColor,
	PrideMCColor,
} from "~~/utils/types";

// Constants
const blockMCColors = useBlockMCColors();
const prideMCColors = usePrideMCColors();
const prideColors = usePrideColors();
const gradients = useGradients();

const colorMap: Record<string, string> = {};
blockMCColors.map((color) => (colorMap[color.code] = color.bg));

// State
const input = useState("input", () => {
	return "Queercraft";
});

const output = useState<OutputLexicalNode[]>("output", () => [
	{ color: colorMap["f"], text: input.value },
]);

const status = useState("status", () => "");
const id = useState<string | null | undefined>("id", () => null);

const macro = useState("macro", () => "");
const repeat = useState("repeat", () => true);

// Handle the preview field.
const showPreview = () => {
	output.value = [];

	const parse = input.value.split("");
	let index = 0;

	while (index < parse.length) {
		const value = parse[index];

		if (value === "&") {
			if (parse[index + 1] === "#") {
				output.value.push({
					color: `${input.value.slice(index + 1, index + 8)}`,
					text: "",
				});

				index += 8;
			} else {
				output.value.push({
					color: `${colorMap[parse[index + 1]]}`,
					text: "",
				});

				index += 2;
			}
		} else {
			if (output.value.length === 0) {
				output.value.push({
					color: "",
					text: "",
				});
			}

			output.value[output.value.length - 1].text += value;
			index++;
		}
	}
};

// Handles nick filtering.
let updateNick = () => {
	let filter = input.value.replace(/&([A-Fr0-9]|#[0-9A-F]{6})/gi, "");
	let invalidCharCheck = input.value.match(/[^\w&#]/gi);

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
	return () => {
		// clear selected colors
		input.value = input.value.replace(/&([A-Fr0-9]|#[0-9A-F]{6})/gi, "");

		input.value = `&${color.code}${
			input.value.startsWith("&") ? input.value.slice(2) : input.value
		}`;

		showPreview();
	};
};

function hexCheck(str: string) {
	if (str.match(/#/g)) {
		return false;
	} else {
		return true;
	}
}

const handleNickRepeat = () => {
	if (!hexCheck(macro.value) ?? !repeat.value) {
		return false;
	}

	const filter = input.value.replace(/&([A-Fr0-9]|#[0-9A-F]{6})/gi, "");

	const nickLen = input.value.length;
	const macroLen = macro.value.length;

	let out = "";

	if (repeat.value) {
		if (macro.value.includes("#")) {
			for (let index = 0; index < nickLen; index++) {
				out +=
					"&" +
					macro.value.slice(
						(index % macroLen) + 1,
						(index % macroLen) + 8
					) +
					"" +
					filter.slice(index, index + 1);

				console.log(out);
			}
		} else {
			for (let index = 0; index < nickLen; index++) {
				out +=
					"&" +
					macro.value.slice(
						index % macroLen,
						(index % macroLen) + 1
					) +
					"" +
					filter.slice(index, index + 1);
			}
		}
	} else if (!repeat.value) {
		let sections = filter.length / macro.value.length;
		let stages = filter.length / sections;

		for (let index = 0; index < stages; index++) {
			out += `&${macro.value[index]}${filter.slice(
				Math.floor(sections * index),
				Math.floor(sections * (index + 1))
			)}`;
		}

		input.value = out;
	}

	input.value = out;
	showPreview();
};

const updateNickRepeat = (val: boolean) => {
	repeat.value = val;
	handleNickRepeat();
};

const updateMacro = (event: Event) => {
	macro.value =
		event.target &&
		"value" in event.target &&
		typeof event.target.value === "string"
			? event.target.value
			: "";

	handleNickRepeat();
};

const declarePrideFunc = ({
	code,
	repeat: colorRepeat,
}: PrideMCColor | PrideColor) => {
	// clear selected colors
	input.value = input.value.replace(/&([A-Fr0-9]|#[0-9A-F]{6})/gi, "");
	macro.value = code instanceof Array ? code.join("") : code;
	repeat.value = colorRepeat ?? false;

	let out = "";

	if (repeat.value && !(code instanceof Array)) {
		handleNickRepeat();
		return;
	}

	var nickLen = input.value.length;
	let colourLen = code.length;

	if (nickLen === 0) {
		return false;
	}

	if (nickLen > colourLen && !(code instanceof Array)) {
		repeat.value = true;
		handleNickRepeat();
		return;
	} else if (nickLen > 20) {
		status.value = "Nickname is too long.";
		return;
	}

	let colorCodeCharacterAmount = input.value.length / code.length;
	let amountOfCharacters = input.value.length / colorCodeCharacterAmount;

	for (let index = 0; index < amountOfCharacters; index++) {
		out += `&${code[index]}${input.value.slice(
			Math.floor(colorCodeCharacterAmount * index),
			Math.floor(colorCodeCharacterAmount * (index + 1))
		)}`;
	}

	input.value = out;
	showPreview();
};

const saveNick = async () => {
	const { data } = await useFetch<string>(
		"https://qc-nick-saver.nightlake.workers.dev/nick",
		{ method: "POST", body: input.value.toString() }
	);

	id.value = data.value;

	setTimeout(() => {
		id.value = null;
	}, 1500);
};
</script>
