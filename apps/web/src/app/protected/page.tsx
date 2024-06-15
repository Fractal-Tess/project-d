import { getServerAuthSession } from '$/server/auth';
import { redirect } from 'next/navigation';

export default async function Page() {
  const session = await getServerAuthSession();
  if (!session) return redirect('/');

  return (
    <h1 className="text-balance text-center text-2xl font-extrabold">
      You will only be able to this this page if you are signed in
    </h1>
  );
}
