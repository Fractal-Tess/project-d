'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { Skeleton } from '@ui/components/ui/skeleton';

export function AuthLinks() {
  const session = useSession();
  const [callbackUrl, setCallbackUrl] = useState('/');
  const pathname = usePathname();
  const searchparams = useSearchParams();
  useEffect(() => {
    setCallbackUrl(
      encodeURI(searchparams.get('callbackUrl') ?? window.location.href)
    );
  }, [pathname, searchparams]);

  // If loading show skeleton
  return session.status === 'loading' ? (
    <>
      <Skeleton className="h-8 w-16" />
      <Skeleton className="h-8 w-16" />
    </>
  ) : session.data?.user ? (
    // Show profile and signout if we have valid session
    <>
      <Link href="/profile">Profile</Link>
      <Link href={`/auth/logout?callbackUrl=${callbackUrl}`}>Logout</Link>
    </>
  ) : (
    // Show sign in and register links otherwise
    <>
      <Link href={`/auth/login?callbackUrl=${callbackUrl}`}>Sign in</Link>
      <Link href={`/auth/register?callbackUrl=${callbackUrl}`}>Register</Link>
    </>
  );
}
