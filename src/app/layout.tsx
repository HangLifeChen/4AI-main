import type { Metadata } from "next";
import { DM_Sans, Geist, Geist_Mono } from "next/font/google";
import { Animation, Footer, Header } from '@/components/common';
import Script from 'next/script';
import { UserProvider } from "@/stores";
import { AppKitProvider } from "@/components/common/reown-provider";
import { Suspense } from "react";
import { ToastProvider } from '@heroui/react';
import "./globals.css";

const dmSans = DM_Sans({
  variable: '--font-dm-sans',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: "4AI",
  description: "4AI is a decentralized AI marketplace on BSC where anyone can request, build and deploy AI agents.",
  // icons: {
  //   icon: '/favicon.ico',
  // },
  openGraph: {
    title: '4AI',
    description: '4AI is a decentralized AI marketplace on BSC where anyone can request, build and deploy AI agents.',
    url: 'https://4bsc.ai/',
    siteName: '4AI',
    images: [
      {
        url: 'https://4bsc.ai/banner.png',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: '4AI',
    description: '4AI is a decentralized AI marketplace on BSC where anyone can request, build and deploy AI agents.',
    images: ['https://4bsc.ai/banner.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* <head>
        <Script
          async
          src='https://www.googletagmanager.com/gtag/js?id=G-0PPDJT5YSC'
          strategy='afterInteractive'
        />
        <Script strategy='afterInteractive'>
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-0PPDJT5YSC');
          `}
        </Script>
      </head> */}
      <body
        className={`${dmSans.className} bg-black text-[16px] text-[#fff] flex flex-col dark`}
      >
        <Suspense fallback={null}>
          <ToastProvider
            placement='top-center'
            toastOffset={60}
            maxVisibleToasts={2}
            toastProps={{
              timeout: 2000,
            }}
          />

          <AppKitProvider>
            <UserProvider>
              <Animation>
                <Header />
                {children}
                <Footer />
              </Animation>
            </UserProvider>
          </AppKitProvider>
        </Suspense>
      </body>
    </html>
  );
}
