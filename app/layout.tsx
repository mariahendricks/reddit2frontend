import { Livvic } from 'next/font/google';
import type { Metadata } from 'next';
import { Toaster } from 'sonner';

import { cn } from '@/utils/classnames';
import { QueryClientProvider } from '@/providers/query-client-provider';
import './globals.css';

const livvic= Livvic({ weight: '400', subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Your Blog Posts',
  description: 'Your personal blog posts!',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body
        className={cn(
          livvic.className,
          'flex min-h-screen flex-col items-center bg-blue-50 font-medium text-zinc-800',
        )}
      >
        <QueryClientProvider>
          {children}
          <Toaster />
        </QueryClientProvider>
      </body>
    </html>
  )
}
