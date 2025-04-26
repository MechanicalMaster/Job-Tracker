"use server"

import { redirect } from "next/navigation"
import { z } from "zod"

// Form validation schema
const jobSchema = z.object({
  title: z.string().min(1, { message: "Job title is required" }),
  company: z.string().min(1, { message: "Company name is required" }),
  location: z.string().optional(),
  description: z.string().optional(),
  requirements: z.string().optional(),
  tags: z.string().optional(),
})

export async function addJobAction(formData: FormData) {
  // In a real app, validate the form data
  const title = formData.get("title") as string
  const company = formData.get("company") as string
  const location = formData.get("location") as string
  const description = formData.get("description") as string
  const requirements = formData.get("requirements") as string
  const tags = formData.get("tags") as string

  try {
    // Validate form data
    jobSchema.parse({ title, company, location, description, requirements, tags })

    // In a real app, you would save the job to the database
    // For now, we'll just simulate a successful save

    // Generate a random ID for the job
    const id = Math.floor(Math.random() * 1000).toString()

    // Redirect to the job details page
    redirect(`/dashboard/jobs/${id}`)
  } catch (error) {
    // In a real app, you would handle validation errors
    console.error("Add job error:", error)

    // For demo purposes, redirect to dashboard
    redirect("/dashboard")
  }
}

export async function updateJobAction(id: string, formData: FormData) {
  // Similar to addJobAction, but for updating an existing job
  // In a real app, you would update the job in the database

  // Redirect to the job details page
  redirect(`/dashboard/jobs/${id}`)
}

export async function deleteJobAction(id: string) {
  // In a real app, you would delete the job from the database

  // Redirect to the dashboard
  redirect("/dashboard")
}
