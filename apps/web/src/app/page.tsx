import Link from 'next/link';

import { CreatePost } from '$/app/_components/create-post';
import { getServerAuthSession } from '$/server/auth';
import { api } from '$/trpc/server';
import { Button } from '@ui/components/ui/button';

export default async function Home() {
  const hello = await api.post.hello({ text: 'from tRPC' });
  const session = await getServerAuthSession();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <h1>Hello world</h1>
      <Button>Hello world</Button>
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
