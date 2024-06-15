'use server';

import { getServerAuthSession } from '$/server/auth';
import { Navbar } from './Navbar';
import { AvatarIcon } from './AvatarIcon';
import { AuthLinks } from './AuthLinks';

export async function Header() {
  const session = await getServerAuthSession();

  return (
    <div
      className={
        'fixed inset-x-0 top-10 z-50 mx-auto flex max-w-2xl items-center justify-center rounded-[48px] border-2 border-black shadow-[0px_25px_50px_0_rgb(0_0_0_/_0.75)] dark:border-white'
      }
    >
      <Navbar />

      <div className="flex items-center justify-center gap-x-4">
        <AvatarIcon session={session} />
        <AuthLinks session={session} />
      </div>
    </div>
  );
}
