import Link from 'next/link';

import { CreatePost } from '$/app/_components/create-post';
import { getServerAuthSession } from '$/server/auth';
import { api } from '$/trpc/server';
import { Button } from '@ui/components/ui/button';

export default async function Home() {
  const hello = await api.post.hello({ text: 'from tRPC' });
  const session = await getServerAuthSession();

  return (
    <main className="container mx-auto flex min-h-screen flex-col items-center justify-center gap-y-12 bg-slate-700 text-white">
      <h1>
        {/* Using session */}
        Hello {session?.user.name}{' '}
        {session && (
          <img
            src={session.user.image ?? ''}
            className="m-4 inline-block rounded-full shadow-lg"
          ></img>
        )}{' '}
        &lt;3
      </h1>

      {/* Data coming from tRPC backend */}
      <h1>{hello.greeting}</h1>

      {/* Component used from UI lib */}
      <Button>Hello world</Button>

      {/* Sign in link */}
      <Link
        href={session ? '/api/auth/signout' : '/api/auth/signin'}
        className="rounded-full bg-white/10 px-10 py-3 font-semibold no-underline transition hover:bg-white/20"
      >
        {session ? 'Sign out' : 'Sign in'}
      </Link>

      {/* Showcasing crud */}
      <CrudShowcase />
    </main>
  );
}

async function CrudShowcase() {
  const session = await getServerAuthSession();
  if (!session?.user) return null;

  const latestPosts = await api.post.getLatest();

  return (
    <div className="flex w-full max-w-xs flex-col gap-y-4 rounded-sm">
      <ul className="flex flex-col gap-y-4 rounded-md">
        {latestPosts.map(({ name }, idx) => (
          <li
            key={idx}
            className="text-bold truncate rounded-md border-2 text-2xl shadow-md"
          >
            {name}
          </li>
        ))}
      </ul>

      <CreatePost />
    </div>
  );
}
