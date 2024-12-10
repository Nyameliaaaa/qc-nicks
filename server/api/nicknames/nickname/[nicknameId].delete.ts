import { getToken } from '#auth';
import { tables, useDrizzle, eq, and } from '~/server/utils/drizzle';

export default defineEventHandler(async event => {
	const token = await getToken({ event });

	if (!token) {
		event.node.res.statusCode = 401;
		return {
			errorCode: 1001,
			message: 'You must be authenticated to view this resource.'
		};
	}

	const drizzle = useDrizzle();
	const nickname = await drizzle
		.delete(tables.nicknames)
		.where(
			and(
				eq(tables.nicknames.userId, token?.sub ?? ''),
				eq(
					tables.nicknames.nicknameId,
					Number(event?.context?.params?.nicknameId ?? 0)
				)
			)
		);

	if (!nickname) {
		event.node.res.statusCode = 404;
		return {
			errorCode: 1002,
			message: 'This nickname does not exist.'
		};
	}

	return nickname;
});
