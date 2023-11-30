import { Toaster } from 'sonner';

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

import { ThemeProvider } from '@/providers/ThemeProviders'
import { ConvexClientProvider } from '@/providers/Convex-provider'

import { EdgeStoreProvider } from '../lib/edgestore';
import { ModalProvider } from '@/providers/coverimg-provider';
const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Notejoy.',
  description: 'Notejoy: Unleash Your Ideas, Your Way. A Powerful, Intuitive, and Collaborative Note-Taking Platform that Inspires Creativity and Productivity.',
  icons: {
  icon: [
    {
      media: "(prefers-color-scheme: light)",
      url: "/Android.png",
      href: "/Android.png",
    },
    {
      media: "(prefers-color-scheme: dark)",
      url: "/Android.png",
      href: "/Android.png",
    }
  ]
}
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning >

      <body className={inter.className}>
        <ConvexClientProvider>

      <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
            >
              <EdgeStoreProvider>

        <Toaster />
        <ModalProvider/>
        <div className="h-full ">

        
        {children}
        
        </div>
              </EdgeStoreProvider>
        </ThemeProvider>
            </ConvexClientProvider>
        </body>
    </html>
  )
}
