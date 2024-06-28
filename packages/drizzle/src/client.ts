import { createClient as libsqlClient } from '@libsql/client';
import { drizzle } from 'drizzle-orm/libsql';

import * as schema from './schema';

export function createClient({
  url,
  authToken
}: {
  url: string;
  authToken: string;
}) {
  const client = libsqlClient({
    url,
    authToken
  });

  const db = drizzle(client, { schema });

  return {
    client,
    db
  };
}
