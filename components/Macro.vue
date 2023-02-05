<template>
	<block>
		<form @submit.prevent="useUpdateMacro">
			<label class="block">
				<h2
					class="text-md font-medium text-gray-800 dark:text-gray-400"
				>
					Macro
				</h2>

				<div class="flex flex-row items-center justify-between gap-4">
					<input
						type="text"
						class="mt-0 block w-full border-0 border-b-2 border-black bg-white px-0.5 transition-all duration-500 focus:border-pink-600 focus:ring-0 dark:border-gray-200 dark:bg-neutral-800 dark:text-white dark:focus:border-pink-500"
						v-model="macroState.macro"
					/>
					<div>
						<input
							type="submit"
							value="Apply"
							class="cursor-pointer rounded-md bg-white p-2 font-semibold transition-all duration-500 hover:font-bold dark:bg-neutral-700 dark:text-white"
						/>
					</div>
				</div>
				<div class="mt-2 flex flex-row gap-2">
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
