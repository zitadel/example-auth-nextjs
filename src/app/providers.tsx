'use client';

import { SessionProvider } from 'next-auth/react';
import React from 'react';

export function ZitadelProvider({ children }: { children: React.ReactNode }) {
  return <SessionProvider>{children}</SessionProvider>;
}
