"use server"

import { cookies } from "next/headers"
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

export async function loginAction(formData: FormData) {
  // In a real app, validate the form data
  const email = formData.get("email") as string
  const password = formData.get("password") as string

  try {
    // Validate form data
    loginSchema.parse({ email, password })

    // In a real app, you would verify credentials against a database
    // For now, we'll just simulate a successful login with dummy credentials
    if (email === "demo@example.com" && password === "password123") {
      // Set a session cookie
      cookies().set("session", "dummy-session-token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 24 * 7, // 1 week
        path: "/",
      })

      // Redirect to dashboard
      redirect("/dashboard")
    }

    // For demo purposes, let's just redirect to dashboard anyway
    cookies().set("session", "dummy-session-token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: "/",
    })

    redirect("/dashboard")
  } catch (error) {
    // In a real app, you would handle validation errors
    console.error("Login error:", error)

    // For demo purposes, redirect to dashboard anyway
    cookies().set("session", "dummy-session-token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: "/",
    })

    redirect("/dashboard")
  }
}

export async function signupAction(formData: FormData) {
  // In a real app, validate the form data
  const name = formData.get("name") as string
  const email = formData.get("email") as string
  const password = formData.get("password") as string
  const confirmPassword = formData.get("confirmPassword") as string

  try {
    // Validate form data
    signupSchema.parse({ name, email, password, confirmPassword })

    // In a real app, you would create a user in the database
    // For now, we'll just simulate a successful signup

    // Set a session cookie
    cookies().set("session", "dummy-session-token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: "/",
    })

    // Redirect to dashboard
    redirect("/dashboard")
  } catch (error) {
    // In a real app, you would handle validation errors
    console.error("Signup error:", error)

    // For demo purposes, redirect to dashboard anyway
    cookies().set("session", "dummy-session-token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: "/",
    })

    redirect("/dashboard")
  }
}

export async function logoutAction() {
  // Delete the session cookie
  cookies().delete("session")

  // Redirect to home page
  redirect("/")
}

export async function checkAuth() {
  // Check if the session cookie exists
  const session = cookies().get("session")

  return !!session
}
