import { getToken } from '#auth';
import { tables, useDrizzle, eq } from '~/server/utils/drizzle';

export default defineEventHandler(async event => {
	const token = await getToken({ event });

	const drizzle = useDrizzle();

	const nicknames = await drizzle
		.select({
			nicknameId: tables.nicknames.nicknameId,
			nickname: tables.nicknames.nicknameString,
			createdAt: tables.nicknames.createdAt
		})
		.from(tables.nicknames)
		.where(eq(tables.nicknames.userId, token?.sub ?? ''));

	return {
		nicknames,
		toJSON() {
			const newNicks: {
				nicknameId: number;
				nickname: string;
				createdAt: number;
			}[] = [];

			nicknames.forEach(({ createdAt, nickname, nicknameId }) => {
				newNicks.push({
					nickname,
					nicknameId,
					createdAt: createdAt.getMilliseconds()
				});
			});

			return {
				nicknames: newNicks
			};
		}
	};
});
