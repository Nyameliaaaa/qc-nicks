// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    "@nuxtjs/tailwindcss",
    "@nuxtjs/color-mode",
    "nuxt-icon",
    "@sidebase/nuxt-auth",
    "@nuxthub/core",
  ],

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

  auth: {
    baseURL: process.env.AUTH_ORIGIN,
    provider: {
      type: "authjs",
      trustHost: false,
      defaultProvider: "discord",
      addDefaultCallbackUrl: true,
    },
    globalAppMiddleware: false,
  },

  hub: {
    database: true,
  },

  runtimeConfig: {
    secret: process.env.NUXT_AUTH_SECRET ?? "",
    clientId: process.env.DISCORD_CLIENT_ID ?? "",
    clientSecret: process.env.DISCORD_CLIENT_SECRET ?? "",
  },

  compatibilityDate: "2024-12-10",

  devtools: {
    timeline: {
      enabled: true,
    },
  },
});