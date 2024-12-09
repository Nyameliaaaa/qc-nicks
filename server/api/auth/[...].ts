import { NuxtAuthHandler } from "#auth";
import DiscordProvider from "next-auth/providers/discord";

const config = useRuntimeConfig();

export default NuxtAuthHandler({
  secret: config.secret,
  providers: [
    // @ts-expect-error NuxtAuth weirdness
    DiscordProvider.default({
      clientId: config.clientId,
      clientSecret: config.clientSecret,
      authorization: "https://discord.com/api/oauth2/authorize?scope=identify",
    }),
  ],
});
