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
    provider: {
      type: "authjs",
      trustHost: false,
      defaultProvider: "discord",
      addDefaultCallbackUrl: true,
    },
  },
  hub: {
    database: true,
  },
  runtimeConfig: {
    clientId: process.env.DISCORD_CLIENT_ID ?? "",
    clientSecret: process.env.DISCORD_CLIENT_SECRET ?? "",
  },
});
