import { relations, sql } from 'drizzle-orm';
import { int, text, sqliteTable } from 'drizzle-orm/sqlite-core';
import { account } from './account';

export const user = sqliteTable('user', {
  id: text('id', { length: 255 }).primaryKey().notNull(),
  name: text('name', { length: 255 }),
  email: text('email', { length: 255 }).notNull(),
  image: text('image', { length: 255 }),
  createdAt: int('created_at', {
    mode: 'timestamp'
  }).default(sql`CURRENT_TIMESTAMP`),
  role: text('role', {
    length: 255,
    enum: ['user', 'moderator', 'admin']
  }).default('user')
});

export const userRelations = relations(user, ({ many }) => ({
  accounts: many(account)
}));
