"use server"

import { cookies, headers } from "next/headers"
import { redirect } from "next/navigation"
import { z } from "zod"

// Form validation schemas
const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters" }),
})

const signupSchema = z
  .object({
    name: z.string().min(2, { message: "Name must be at least 2 characters" }),
    email: z.string().email({ message: "Please enter a valid email address" }),
    password: z.string().min(8, { message: "Password must be at least 8 characters" }),
    confirmPassword: z.string().min(8, { message: "Password must be at least 8 characters" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  })

// Helper to get absolute URL for API routes
function getApiUrl(path: string) {
  const host = headers().get("host");
  const protocol = process.env.NODE_ENV === "production" ? "https" : "http";
  return `${protocol}://${host}${path}`;
}

// --- Supabase API integration helpers ---
async function postJson(path: string, body: any) {
  const url = getApiUrl(path);
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
    credentials: 'include',
  });
  return res.json();
}

async function getJson(path: string) {
  const url = getApiUrl(path);
  const res = await fetch(url, { credentials: 'include' });
  return res.json();
}

// --- Updated Actions ---

export async function loginAction(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  try {
    loginSchema.parse({ email, password });
    const result = await postJson('/api/auth/login', { email, password });
    if (result.user) {
      redirect('/dashboard');
    } else {
      // TODO: Surface error to UI
      throw new Error(result.error || 'Login failed');
    }
  } catch (error) {
    // TODO: Surface error to UI
    console.error("Login error:", error);
    throw error;
  }
}

export async function signupAction(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;
  try {
    signupSchema.parse({ name, email, password, confirmPassword });
    const result = await postJson('/api/auth/signup', { name, email, password, confirmPassword });
    if (result.user) {
      redirect('/dashboard');
    } else {
      // TODO: Surface error to UI
      throw new Error(result.error || 'Signup failed');
    }
  } catch (error) {
    // TODO: Surface error to UI
    console.error("Signup error:", error);
    throw error;
  }
}

export async function logoutAction() {
  await postJson('/api/auth/logout', {});
  redirect('/login');
}

export async function checkAuth() {
  const result = await getJson('/api/auth/session');
  return result.isAuthenticated;
}
