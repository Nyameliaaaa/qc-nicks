import { tables, useDrizzle, eq, and } from '~/server/utils/drizzle';

export default defineEventHandler(async event => {
	const session = await getUserSession(event);

	const drizzle = useDrizzle();
	const nickname = await drizzle
		.delete(tables.nicknames)
		.where(
			and(
				eq(tables.nicknames.userId, session.user?.discordId ?? ''),
				eq(
					tables.nicknames.nicknameId,
					Number(event?.context?.params?.nicknameId ?? 0)
				)
			)
		);

	return nickname;
});
