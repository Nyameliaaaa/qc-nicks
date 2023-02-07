// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	modules: ["@nuxtjs/tailwindcss", "@nuxtjs/color-mode", "nuxt-icon"],
	colorMode: {
		preference: "system",
		fallback: "light",
		classSuffix: "",
		storageKey: "color-mode",
	},
	css: ["@/assets/css/tailwind.css"],
	tailwindcss: { exposeConfig: true },
	imports: {
		dirs: ["composables/**"],
	},
	app: {
		baseURL: "/qc-nicks/",
	},
});
