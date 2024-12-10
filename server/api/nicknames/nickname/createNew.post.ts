import { getToken } from '#auth';
import { tables, useDrizzle, eq, and } from '~/server/utils/drizzle';

export default defineEventHandler(async event => {
	const token = await getToken({ event });
	const body = await readBody(event);

	const drizzle = useDrizzle();
	const nickname = await drizzle
		.insert(tables.nicknames)
		.values({
			nicknameString: body.nickname,
			userId: token?.sub ?? '',
			createdAt: new Date()
		})
		.returning({
			nicknameId: tables.nicknames.nicknameId,
			nickname: tables.nicknames.nicknameString,
			createdAt: tables.nicknames.createdAt
		});

	return nickname;
});
