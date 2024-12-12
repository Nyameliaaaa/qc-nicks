<template>
	<block title="Macro">
		<form @submit.prevent="useUpdateMacro">
			<label class="block">
				<div class="flex flex-row items-center justify-between my-2 divide-x-2 divide-mantle">
					<input type="text"
						class="block w-full p-2 bg-base focus:bg-surface0 rounded-l-md transition-all duration-500 outline-none focus:ring-2 focus:ring-pink font-semibold font-mono"
						v-model="macroState.macro" />
					<div>
						<input type="submit" value="Apply"
							class="cursor-pointer block p-2 bg-base text-pink hover:bg-pink hover:text-mantle rounded-r-md transition-all duration-500 font-semibold" />
					</div>
				</div>
				<div class="mt-2 flex flex-row gap-2">
					<Switch v-model="macroState.repeat" @update:model-value="useUpdateMacro"
						:class="macroState.repeat ? 'bg-pink' : 'bg-base'"
						class="relative inline-flex h-6 w-11 items-center rounded-full">
						<span class="sr-only">Repeat</span>
						<span class="inline-block h-4 w-4 transform rounded-full transition-all duration-300"
							:class="macroState.repeat ? 'bg-mantle translate-x-6' : 'bg-pink translate-x-1'" />
					</Switch>
					<p class="text-md font-semibold">Repeat</p>
				</div>
			</label>
		</form>
	</block>
</template>

<script setup lang="ts">
import { Switch } from "@headlessui/vue";

const macroState = useMacro();
</script>
