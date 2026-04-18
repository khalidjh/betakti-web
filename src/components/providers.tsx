'use client';

import { Toaster } from 'sonner';
import { AuthProvider } from '@/lib/auth/context';
import type { ReactNode } from 'react';

export function Providers({ children, dir }: { children: ReactNode; dir: 'rtl' | 'ltr' }) {
  return (
    <AuthProvider>
      {children}
      <Toaster position={dir === 'rtl' ? 'top-left' : 'top-right'} richColors />
    </AuthProvider>
  );
}
