import '@repo/ui/globals.css';
import { GeistSans } from 'geist/font/sans';
import { Header } from '$/app/_components/header/Header.server';
import type { PropsWithChildren } from 'react';
import { getServerAuthSession } from '$/server/auth';
import { Providers } from './_components/Providers.client';

export const metadata = {
  title: 'Project-D',
  description: 'Project-D description',
  icons: [{ rel: 'icon', url: '/favicon.ico' }]
};

export default async function RootLayout({ children }: PropsWithChildren) {
  const session = await getServerAuthSession();
  return (
    <html
      lang="en"
      className={`${GeistSans.variable} bg-white text-black dark:bg-black dark:text-white`}
    >
      <body className="flex min-h-[100svh] flex-col items-center justify-center">
        <Providers session={session}>
          <Header />
          <main className="container mx-auto">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
