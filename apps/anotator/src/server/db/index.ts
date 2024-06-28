import { env } from '$/env';
import { createClient } from '@repo/drizzle/client';
export * from '@repo/drizzle/schema';

export const { db, client } = createClient({
  url: env.TURSO_CONNECTION_URL,
  authToken: env.TURSO_AUTH_TOKEN
});
