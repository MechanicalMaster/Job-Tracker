// lib/supabase-auth.ts
// Sets up Supabase Auth helpers for Next.js API routes (server-side session management).
// Uses @supabase/auth-helpers-nextjs for cookie/session integration.

import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export function getSupabaseServerClient() {
  return createRouteHandlerClient({
    cookies,
  });
}
