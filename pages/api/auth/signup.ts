// pages/api/auth/signup.ts
// Handles user signup with Supabase Auth. Validates input and creates new user.

import type { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '../../../lib/supabase';
import { z } from 'zod';

const signupSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  name: z.string().min(1),
  confirmPassword: z.string().min(8),
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  try {
    const parsed = signupSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: 'Invalid input', details: parsed.error.errors });
    }
    const { email, password, name, confirmPassword } = parsed.data;
    if (password !== confirmPassword) {
      return res.status(400).json({ error: 'Passwords do not match' });
    }
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { name } },
    });
    if (error) {
      return res.status(400).json({ error: error.message });
    }
    return res.status(200).json({ user: data.user, message: 'Signup successful. Please confirm your email.' });
  } catch (err) {
    return res.status(500).json({ error: 'Internal server error' });
  }
}
