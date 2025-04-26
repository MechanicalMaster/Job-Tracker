"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Wand2 } from "lucide-react"

interface CoverLetterGeneratorProps {
  jobId: string
  jobTitle: string
  jobCompany: string
  // Potentially add job description, user profile data etc. for better generation context
}

export function CoverLetterGenerator({ jobId, jobTitle, jobCompany }: CoverLetterGeneratorProps) {
  const [coverLetter, setCoverLetter] = useState<string>("")
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const handleGenerate = async () => {
    setIsLoading(true)
    console.log(`Generating cover letter for job ${jobId} (${jobTitle} at ${jobCompany})...`)
    // TODO: Implement AI generation logic
    // Example: Fetch from an API endpoint `/api/generate-cover-letter`
    // Pass job details and maybe user profile info
    await new Promise(resolve => setTimeout(resolve, 1500)) // Simulate API call
    setCoverLetter(`Dear Hiring Manager,\n\nI am writing to express my interest in the ${jobTitle} position at ${jobCompany}.\n\n[Your generated content here]...\n\nSincerely,\n[Your Name]`)
    setIsLoading(false)
  }

  const handleSave = () => {
    console.log(`Saving cover letter for job ${jobId}...`)
    // TODO: Implement save logic (e.g., API call to backend)
    alert("Cover letter saved (simulated)!")
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Cover Letter</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button onClick={handleGenerate} disabled={isLoading} className="gap-2">
          <Wand2 className="h-4 w-4" />
          {isLoading ? "Generating..." : "Generate with AI"}
        </Button>
        <Textarea
          placeholder="Your cover letter will appear here. You can generate one with AI or write your own."
          value={coverLetter}
          onChange={(e) => setCoverLetter(e.target.value)}
          rows={15}
          className="mt-2"
        />
      </CardContent>
      <CardFooter className="border-t px-6 py-4">
        <Button onClick={handleSave} disabled={!coverLetter || isLoading}>
          Save Cover Letter
        </Button>
      </CardFooter>
    </Card>
  )
}
