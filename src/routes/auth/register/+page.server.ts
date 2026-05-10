import { superValidate } from 'sveltekit-superforms';
import { zod4 } from 'sveltekit-superforms/adapters';
import { registerSchema } from '$lib/auth/schemas';
import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ locals, url }) => {
  if (locals.user) {
    const next = url.searchParams.get('next') ?? '/home';
    throw redirect(303, next);
  }
  const form = await superValidate(zod4(registerSchema));
  return { form, next: url.searchParams.get('next') ?? '/home' };
};
