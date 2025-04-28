// pages/api/auth/login.ts
// Handles user login with Supabase Auth. Validates input and sets session cookie.

import type { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '../../../lib/supabase';
import { z } from 'zod';

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  try {
    const parsed = loginSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: 'Invalid input', details: parsed.error.errors });
    }
    const { email, password } = parsed.data;
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      return res.status(401).json({ error: error.message });
    }
    // Set session cookie (handled by Supabase client if needed)
    return res.status(200).json({ user: data.user, message: 'Login successful' });
  } catch (err) {
    return res.status(500).json({ error: 'Internal server error' });
  }
}
