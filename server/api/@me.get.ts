export default defineEventHandler(async event => {
	const session = await getUserSession(event);

	const discordUser = await $fetch<Record<string, string>>(
		'https://discord.com/api/v10/users/@me',
		{
			headers: { Authorization: `Bearer ${session.user?.token}` }
		}
	);

	return {
		username: discordUser.username,
		name: discordUser.global_name,
		avatar: discordUser.avatar
			? `https://cdn.discordapp.com/avatars/${discordUser.id}/${discordUser.avatar}.png`
			: `https://cdn.discordapp.com/embed/avatars/5.png`
	};
});
