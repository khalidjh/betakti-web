import type { Locale } from '$lib/i18n';

declare global {
  namespace App {
    interface Error {
      code?: string;
    }
    interface Locals {
      user: {
        uid: string;
        email: string | null;
        subscription: 'free' | 'pro' | null;
        isAdmin: boolean;
      } | null;
      locale: Locale;
    }
    interface PageData {
      locale?: Locale;
    }
  }
}

export {};
