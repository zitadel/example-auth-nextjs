import './globals.css';
import { Metadata } from 'next';
import { ZitadelProvider } from '@/app/providers';
import React from 'react';
import { ErrorBoundary } from '@/components/ErrorBoundary';

export const metadata: Metadata = {
  title: 'Zitadel PKCE Demo',
  description: 'PKCE authentication demo with Zitadel',
  icons: {
    icon: '/favicon.svg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50 min-h-screen flex flex-col">
        <ErrorBoundary showDetails={process.env.NODE_ENV === 'development'}>
          <ZitadelProvider>{children}</ZitadelProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
