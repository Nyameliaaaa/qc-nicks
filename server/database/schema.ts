import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

export const nicknames = sqliteTable('nicknames', {
	nicknameId: integer('nickname_id').primaryKey({ autoIncrement: true }),
	userId: text('user_id').notNull(),
	nicknameString: text('nickname_string').notNull(),
	createdAt: integer('created_at', { mode: 'timestamp' }).notNull()
});
