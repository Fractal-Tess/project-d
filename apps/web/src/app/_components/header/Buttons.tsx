'use client';
import { Button } from '@ui/components/ui/button';
import { signIn, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export function SignOut() {
  return <Button onClick={() => signOut()}>Sign out</Button>;
}

export function SignIn() {
  return <Button onClick={() => signIn()}>Sign in</Button>;
}

export function Register() {
  const router = useRouter();
  return (
    <Button onClick={() => router.push('/auth/register')}>Register</Button>
  );
}
