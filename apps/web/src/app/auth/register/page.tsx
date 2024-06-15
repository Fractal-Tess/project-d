import Form from './_components/Form.client';
import { getServerAuthSession } from '$/server/auth';
import { redirect } from 'next/navigation';

type Props = {
  searchParams: {
    callbackUrl: string;
  };
};
export default async function Page({ searchParams }: Props) {
  const callbackUrl = searchParams.callbackUrl ?? '/';
  const session = await getServerAuthSession();
  if (session) redirect(callbackUrl);

  return (
    <section className="container mx-auto flex flex-1 flex-col items-center justify-center gap-y-4 rounded-md">
      <h1 className="text-4xl font-extrabold tracking-wider">Register</h1>
      <Form />
    </section>
  );
}
