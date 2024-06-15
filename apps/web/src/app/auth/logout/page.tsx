import { getServerAuthSession } from '$/server/auth';
import { redirect } from 'next/navigation';
import SignOutButton from './_components/Logout.client';

type Props = {
  searchParams: {
    callbackUrl?: string;
  };
};

export default async function Page({ searchParams }: Props) {
  const callbackUrl = searchParams.callbackUrl ?? '/';
  const session = await getServerAuthSession();
  if (!session) redirect(callbackUrl);

  return (
    <section className="flex flex-col items-center justify-center gap-y-4">
      <h1 className="">
        Are you sure you would like to logout of your account
      </h1>
      <SignOutButton />
    </section>
  );
}
