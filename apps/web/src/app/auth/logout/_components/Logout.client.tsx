'use client';
import { Button } from '@ui/components/ui/button';
import { signOut } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import React from 'react';

export default function SignOutButton() {
  const params = useSearchParams();
  const callbackUrl = params.get('callbackUrl') ?? '/';
  return (
    <Button onClick={() => signOut({ callbackUrl, redirect: true })}>
      Logout
    </Button>
  );
}
