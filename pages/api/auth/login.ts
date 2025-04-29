// pages/api/auth/login.ts
// Handles user login with Supabase Auth. Validates input and sets session cookie.

import type { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '../../../lib/supabase';
import { z } from 'zod';
import * as cookie from 'cookie';

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  try {
    console.log('Login API received req.body:', req.body);
    const parsed = loginSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: 'Invalid input', details: parsed.error.errors });
    }
    const { email, password } = parsed.data;
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      return res.status(401).json({ error: error.message });
    }
    // Set the session cookie manually
    if (data.session) {
      res.setHeader(
        'Set-Cookie',
        cookie.serialize('sb-access-token', data.session.access_token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'lax',
          path: '/',
          maxAge: 60 * 60 * 24 * 7, // 1 week
        })
      );
    }
    return res.status(200).json({ user: data.user, message: 'Login successful' });
  } catch (err) {
    console.error('Login API error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
