"use server"

import { redirect } from "next/navigation"

export async function updateProfileAction(formData: FormData) {
  // In a real app, you would validate and save the profile data to the database

  // Redirect back to the profile page
  redirect("/dashboard/profile")
}
