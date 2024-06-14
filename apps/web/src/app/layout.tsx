import '@repo/ui/globals.css';
import { GeistSans } from 'geist/font/sans';

import { TRPCReactProvider } from '$/trpc/react';
import { Header } from '$/app/_components/header/Header';
import type { PropsWithChildren } from 'react';

export const metadata = {
  title: 'Project-D',
  description: 'Project-D description',
  icons: [{ rel: 'icon', url: '/favicon.ico' }]
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable} bg-white text-black dark:bg-black dark:text-white`}
    >
      <body className="flex min-h-[100svh] flex-col items-center justify-center">
        <Header />

        <TRPCReactProvider>
          <main className="container mx-auto">{children}</main>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
