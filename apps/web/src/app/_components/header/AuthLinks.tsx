'use client';
import Link from 'next/link';
import type { Session } from '$/server/auth';
import { useEffect, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

type Props = {
  session: Session;
};
export function AuthLinks({ session }: Props) {
  const [callbackUrl, setCallbackUrl] = useState('/');
  const pathname = usePathname();
  const searchparams = useSearchParams();
  useEffect(() => {
    setCallbackUrl(
      encodeURI(searchparams.get('callbackUrl') ?? window.location.href)
    );
  }, [pathname, searchparams]);

  return session ? (
    <>
      <Link href="/profile">Profile</Link>
      <Link href={`/auth/signOut?callbackUrl=${callbackUrl}`}>Sign Out</Link>
    </>
  ) : (
    <>
      <Link href={`/auth/login?callbackUrl=${callbackUrl}`}>Sign in</Link>
      <Link href={`/auth/register?callbackUrl=${callbackUrl}`}>Register</Link>
    </>
  );
}
