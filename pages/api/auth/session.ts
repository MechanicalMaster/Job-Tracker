// pages/api/auth/session.ts
// Checks if the user is authenticated by verifying the session cookie.

import type { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '../../../lib/supabase';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  try {
    const { data: { session }, error } = await supabase.auth.getSession();
    if (error || !session) {
      return res.status(200).json({ isAuthenticated: false });
    }
    const { user } = session;
    return res.status(200).json({
      user: { id: user.id, email: user.email, name: user.user_metadata?.name },
      isAuthenticated: true,
    });
  } catch (err) {
    return res.status(500).json({ error: 'Internal server error' });
  }
}
