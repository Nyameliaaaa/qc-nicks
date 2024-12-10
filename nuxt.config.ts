// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	modules: [
		'@nuxtjs/tailwindcss',
		'@nuxtjs/color-mode',
		'nuxt-icon',
		'@nuxthub/core',
		'nuxt-auth-utils'
	],

	colorMode: {
		preference: 'system',
		fallback: 'light',
		classSuffix: '',
		storageKey: 'color-mode'
	},

	css: ['@/assets/css/tailwind.css'],
	tailwindcss: { exposeConfig: true },

	imports: {
		dirs: ['composables/**']
	},

	hub: {
		database: true
	},

	runtimeConfig: {
		oauth: {
			discord: {
				clientId: process.env.DISCORD_CLIENT_ID ?? '',
				clientSecret: process.env.DISCORD_CLIENT_SECRET ?? ''
			}
		}
	},

	compatibilityDate: '2024-12-10',

	devtools: {
		timeline: {
			enabled: true
		}
	}
});
