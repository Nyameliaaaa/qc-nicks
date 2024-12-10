import { tables, useDrizzle, eq, and } from '~/server/utils/drizzle';

export default defineEventHandler(async event => {
	const session = await getUserSession(event);

	const drizzle = useDrizzle();
	const nickname = await drizzle
		.select({
			nicknameId: tables.nicknames.nicknameId,
			nickname: tables.nicknames.nicknameString,
			createdAt: tables.nicknames.createdAt
		})
		.from(tables.nicknames)
		.where(
			and(
				eq(tables.nicknames.userId, session.user?.discordId ?? ''),
				eq(
					tables.nicknames.nicknameId,
					Number(event?.context?.params?.nicknameId ?? 0)
				)
			)
		);

	if (!nickname) {
		setResponseStatus(event, 404);
		return {
			errorCode: 1002,
			message: 'This nickname does not exist.'
		};
	}

	return nickname;
});
