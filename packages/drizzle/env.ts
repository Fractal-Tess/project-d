import { z } from 'zod';
import { config } from 'dotenv';

const validator = z.object({
  TURSO_CONNECTION_URL: z.string(),
  TURSO_AUTH_TOKEN: z.string()
});

const parsed = validator.parse(config().parsed);

export const ENV = Object.freeze(parsed);
