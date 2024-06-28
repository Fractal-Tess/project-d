import 'server-only';

import { headers as nextHeaders } from 'next/headers';
import { cache } from 'react';

import { createCaller } from '$/server/api/root';
import { createTRPCContext } from '$/server/api/trpc';

const createContext = cache(() => {
  const headers = new Headers(nextHeaders());
  headers.set('x-trpc-source', 'rsc');

  return createTRPCContext({
    headers
  });
});

export const api = createCaller(createContext);
