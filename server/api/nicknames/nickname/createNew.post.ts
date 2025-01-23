import { tables, useDrizzle, eq, and } from '~/server/utils/drizzle';

export default defineEventHandler(async event => {
	const session = await getUserSession(event);
	const body = await readBody(event);

	const drizzle = useDrizzle();
	try {
		const nickname = await drizzle
			.insert(tables.nicknames)
			.values({
				nicknameString: body.nickname,
				userId: session.user?.discordId ?? '',
				createdAt: new Date()
			})
			.returning({
				nicknameId: tables.nicknames.nicknameId,
				nickname: tables.nicknames.nicknameString,
				createdAt: tables.nicknames.createdAt
			});

		return nickname;
	} catch {
		return createError({
			statusCode: 500,
			statusMessage: 'Failed to create nickname!'
		});
	}
});
