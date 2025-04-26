import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ResumeEditor } from "@/components/resume-editor"
import { AISuggestions } from "@/components/ai-suggestions"
import Link from "next/link"
import { ArrowLeft, Download, Check } from "lucide-react"

export default function ResumeCustomizerPage({ params }: { params: { id: string } }) {
  // In a real app, you would fetch the job details and resume data from the API
  const job = {
    id: params.id,
    title: "Frontend Developer",
    company: "Acme Inc",
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-4">
          <Link href={`/dashboard/jobs/${job.id}`}>
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Resume Customizer</h2>
            <p className="text-muted-foreground">
              {job.title} at {job.company}
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" /> Download PDF
          </Button>
          <Button className="gap-2">
            <Check className="h-4 w-4" /> Apply to Job
          </Button>
        </div>
      </div>

      <div className="flex flex-col gap-4 lg:flex-row">
        <div className="flex-1 space-y-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium">Resume Template</h3>
                  <Select defaultValue="professional">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select template" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="professional">Professional</SelectItem>
                      <SelectItem value="modern">Modern</SelectItem>
                      <SelectItem value="creative">Creative</SelectItem>
                      <SelectItem value="minimal">Minimal</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium">Version</h3>
                  <Select defaultValue="v1">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select version" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="v1">Version 1 (Current)</SelectItem>
                      <SelectItem value="v2">Version 2</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          <ResumeEditor />
        </div>

        <div className="w-full lg:w-80">
          <AISuggestions jobId={job.id} />
        </div>
      </div>
    </div>
  )
}
