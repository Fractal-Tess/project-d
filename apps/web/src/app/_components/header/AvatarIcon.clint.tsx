'use client';
import { Avatar, AvatarFallback, AvatarImage } from '@ui/components/ui/avatar';
import { useSession } from 'next-auth/react';

export function AvatarIcon() {
  const session = useSession();
  return (
    <Avatar className="!ml-32">
      <AvatarImage src={session?.data?.user?.image ?? undefined} />
      <AvatarFallback className="text-sm">
        {session?.data?.user?.name
          ?.split(' ')
          .map(token => token.charAt(0).toUpperCase()) ?? 'NULL'}
      </AvatarFallback>
    </Avatar>
  );
}
