import '@repo/ui/globals.css';

import { GeistSans } from 'geist/font/sans';
import type { PropsWithChildren } from 'react';
import { Providers } from './_components/Providers.client';

export const metadata = {
  title: 'Project-D',
  description: 'Project-D description',
  icons: [{ rel: 'icon', url: '/favicon.ico' }]
};

export default async function RootLayout({ children }: PropsWithChildren) {

  return (
    <html
      lang="en"
      className={`${GeistSans.variable} bg-white text-black dark:bg-black dark:text-white`}
    >
      <body className="flex min-h-[100svh] flex-col items-center justify-center">
        <Providers>
          <main className="container mx-auto">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
