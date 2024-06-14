import { getServerAuthSession } from '$/server/auth';

export default async function Page() {
  const session = await getServerAuthSession();
  return (
    <section className="flex flex-col items-center justify-center gap-y-8 text-3xl font-bold">
      <h1 className="">Profile page</h1>
      <code>
        <pre className="">{JSON.stringify(session, null, 2)}</pre>
      </code>
    </section>
  );
}
