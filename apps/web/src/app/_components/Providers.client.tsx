'use client';

import type { Session } from '$/server/auth';
import { TRPCReactProvider } from '$/trpc/react';
import { SessionProvider } from 'next-auth/react';
import type { PropsWithChildren } from 'react';

type Props = {
  session: Session;
} & PropsWithChildren;

export function Providers({ session, children }: Props) {
  return (
    <SessionProvider session={session}>
      <TRPCReactProvider>{children}</TRPCReactProvider>
    </SessionProvider>
  );
}
