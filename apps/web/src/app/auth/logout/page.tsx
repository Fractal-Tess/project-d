'use client';
import Link from 'next/link';
import { Button } from '@ui/components/ui/button';

export default function Page() {
  return (
    <section>
      <h1>Are you sure you would like to logout of your account</h1>
      <Link href="/">Home</Link>
      <Button>Sign Out</Button>
    </section>
  );
}
