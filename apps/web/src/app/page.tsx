import { CreatePost } from '$/app/_components/create-post.client';
import { getServerAuthSession } from '$/server/auth';
import { api } from '$/trpc/server';
import DeleteButton from './deleteButton';

export default async function Home() {

  return (
    <section className="container mx-auto flex min-h-screen flex-col items-center justify-center gap-y-4">
      <h1 className="text-5xl font-extrabold tracking-wider">Landing page</h1>
      <h2 className="text-3xl font-bold tracking-wider">
        Login to see posts...
      </h2>

      <CrudShowcase />
    </section>
  );
}

async function CrudShowcase() {
  const session = await getServerAuthSession();
  if (!session?.user) return null;

  const latestPosts = await api.post.getLatest();

  return (
    <div className="flex w-full max-w-xs flex-col gap-y-4 rounded-sm">
      <h2 className="text-center text-2xl font-bold">Posts</h2>
      <ul className="flex flex-col gap-y-4 rounded-md">
        {latestPosts.map(({ user, name, id }, idx) => (
          <li
            key={idx}
            className="text-bold truncate rounded-md border-2 px-4 py-3 shadow-md"
          >
            <span>{user.name}</span>: <span>{name}</span>
            <DeleteButton id={id} />
          </li>
        ))}
      </ul>

      <CreatePost />
    </div>
  );
}
