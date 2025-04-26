"use client"

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Download, FileText, FileSignature } from "lucide-react"

// Mock data for demonstration
const resumes = [
  {
    jobId: "1",
    jobTitle: "Frontend Developer",
    company: "Acme Inc",
    resumeUrl: "/resumes/frontend-developer.pdf",
    coverLetterUrl: "/cover-letters/frontend-developer.pdf",
    createdAt: "2025-04-20",
  },
  {
    jobId: "2",
    jobTitle: "Full Stack Engineer",
    company: "TechCorp",
    resumeUrl: "/resumes/fullstack-engineer.pdf",
    coverLetterUrl: "/cover-letters/fullstack-engineer.pdf",
    createdAt: "2025-04-18",
  },
  {
    jobId: "3",
    jobTitle: "UI/UX Designer",
    company: "DesignStudio",
    resumeUrl: "/resumes/uiux-designer.pdf",
    coverLetterUrl: "/cover-letters/uiux-designer.pdf",
    createdAt: "2025-04-15",
  },
]

export default function ResumesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">My Customised Resumes</h2>
        <p className="text-muted-foreground">
          View and manage your resumes and cover letters tailored for each job application.
        </p>
      </div>
      <Separator />
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {resumes.map((resume) => (
          <Card key={resume.jobId}>
            <CardHeader>
              <CardTitle>{resume.jobTitle}</CardTitle>
              <CardDescription>{resume.company}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">Resume</span>
                <a href={resume.resumeUrl} target="_blank" rel="noopener noreferrer">
                  <Button size="sm" variant="outline" className="ml-2 gap-1">
                    <Download className="h-4 w-4" /> Download
                  </Button>
                </a>
              </div>
              <div className="flex items-center gap-2">
                <FileSignature className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">Cover Letter</span>
                <a href={resume.coverLetterUrl} target="_blank" rel="noopener noreferrer">
                  <Button size="sm" variant="outline" className="ml-2 gap-1">
                    <Download className="h-4 w-4" /> Download
                  </Button>
                </a>
              </div>
              <div className="text-xs text-muted-foreground mt-2">
                Created on: <span className="font-semibold">{resume.createdAt}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
