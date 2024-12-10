export default defineOAuthDiscordEventHandler({
	config: {
		emailRequired: false
	},
	async onSuccess(event, result) {
		console.log(result);
		await setUserSession(event, {
			user: {
				discordId: result.user.id,
				token: result.tokens.access_token
			}
		});

		return sendRedirect(event, '/');
	}
});
