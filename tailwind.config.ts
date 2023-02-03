import type { Config } from "tailwindcss";
import forms from "@tailwindcss/forms";

export default <Partial<Config>>{
	content: [
		"./components/**/*.{js,vue,ts}",
		"./layouts/**/*.vue",
		"./pages/**/*.vue",
		"./plugins/**/*.{js,ts}",
		"./nuxt.config.{js,ts}",
		"./app.vue",
	],
	theme: { extend: {} },
	darkMode: "class",
	plugins: [forms],
};
