// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	modules: ["@nuxtjs/tailwindcss", "@nuxtjs/color-mode", "nuxt-icon"],
	colorMode: { preference: "light", fallback: "dark", classSuffix: "" },
	css: ["@/assets/css/tailwind.css"],
	tailwindcss: { exposeConfig: true },
	imports: {
		dirs: ["composables/**"],
	},
});
