'use client';

import { TRPCReactProvider } from '$/trpc/react';
import type { PropsWithChildren } from 'react';

type Props = PropsWithChildren;

export function Providers({ children }: Props) {
  return <TRPCReactProvider>{children}</TRPCReactProvider>;
}
