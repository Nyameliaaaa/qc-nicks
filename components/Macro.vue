<template>
	<block>
		<form @submit.prevent="useUpdateMacro">
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
						v-model="macroState.macro"
					/>
					<div>
						<input
							type="submit"
							value="Apply"
							class="dark:text-white font-semibold hover:font-bold transition-all cursor-pointer bg-slate-200 p-2 rounded-md dark:bg-neutral-700"
						/>
					</div>
				</div>
				<div class="flex flex-row gap-2 mt-2">
					<Switch
						v-model="macroState.repeat"
						@update:model-value="useUpdateMacro"
						:class="
							macroState.repeat ? 'bg-pink-600' : 'bg-slate-700'
						"
						class="relative inline-flex h-6 w-11 items-center rounded-full"
					>
						<span class="sr-only">Repeat</span>
						<span
							:class="
								macroState.repeat
									? 'translate-x-6'
									: 'translate-x-1'
							"
							class="inline-block h-4 w-4 transform rounded-full bg-white transition"
						/>
					</Switch>
					<p class="text-md font-semibold dark:text-white">Repeat</p>
				</div>
			</label>
		</form>
	</block>
</template>

<script setup lang="ts">
import { Switch } from "@headlessui/vue";

const macroState = useMacro();
</script>
