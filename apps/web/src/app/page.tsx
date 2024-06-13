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
        Hello {session?.user.name}{' '}
        {session && (
          <img
            src={session.user.image ?? ''}
            className="m-4 inline-block rounded-full shadow-lg"
          ></img>
        )}{' '}
        &lt;3
      </h1>

      <h1>Hello world</h1>
      <Button>Hello world</Button>
      <Link
        href={session ? '/api/auth/signout' : '/api/auth/signin'}
        className="rounded-full bg-white/10 px-10 py-3 font-semibold no-underline transition hover:bg-white/20"
      >
        {session ? 'Sign out' : 'Sign in'}
      </Link>

      <CrudShowcase />
    </main>
  );
}

async function CrudShowcase() {
  const session = await getServerAuthSession();
  if (!session?.user) return null;

  const latestPost = await api.post.getLatest();

  return (
    <div className="w-full max-w-xs">
      {latestPost ? (
        <p className="truncate">Your most recent post: {latestPost.name}</p>
      ) : (
        <p>You have no posts yet.</p>
      )}

      <CreatePost />
    </div>
  );
}
