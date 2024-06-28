import { type Config } from 'drizzle-kit';
import { ENV } from './env';

export default {
  schema: './src/schema/index.ts',
  dialect: 'sqlite',
  out: './migrations',
  driver: 'turso',
  dbCredentials: {
    url: ENV.TURSO_CONNECTION_URL,
    authToken: ENV.TURSO_AUTH_TOKEN
  }
} satisfies Config;
