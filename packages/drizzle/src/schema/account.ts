import { relations } from 'drizzle-orm';
import {
  index,
  primaryKey,
  sqliteTable,
  text
} from 'drizzle-orm/sqlite-core';
import { user } from './user';

export const account = sqliteTable(
  'account',
  {
    userId: text('user_id', { length: 255 }).notNull(),
    provider: text('provider', {
      length: 255,
      enum: ['discord', 'credentials']
    }).notNull(),
    passwordHash: text('password_hash', { length: 255 }),
    providerAccountId: text('provider_account_Id', { length: 255 }).notNull(),
    refreshToken: text('refresh_token'),
    accessToken: text('access_token')
  },
  account => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId]
    }),
    userIdIdx: index('account_userId_idx').on(account.userId)
  })
);

export const accountsRelations = relations(account, ({ one }) => ({
  user: one(user, { fields: [account.userId], references: [user.id] })
}));
