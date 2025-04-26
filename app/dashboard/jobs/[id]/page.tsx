import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { QualificationAnalysis } from "@/components/qualification-analysis"
import { CoverLetterGenerator } from "@/components/cover-letter-generator"
import Link from "next/link"
import { ArrowLeft, Edit, Trash, ExternalLink } from "lucide-react"

export default function JobDetailsPage({ params }: { params: { id: string } }) {
  // In a real app, you would fetch the job details from the API
  const job = {
    id: params.id,
    title: "Frontend Developer",
    company: "Acme Inc",
    location: "Remote",
    status: "applied",
    date: "2023-04-15",
    description:
      "We are looking for a Frontend Developer to join our team. You will be responsible for building user interfaces and implementing designs.",
    requirements:
      "- 3+ years of experience with React\n- Strong knowledge of JavaScript and TypeScript\n- Experience with responsive design and CSS frameworks",
    tags: ["React", "TypeScript", "Remote"],
    url: "https://example.com/job/123",
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-4">
          <Link href="/dashboard">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h2 className="text-2xl font-bold tracking-tight">{job.title}</h2>
            <p className="text-muted-foreground">
              {job.company} • {job.location}
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Link href={`/dashboard/jobs/${job.id}/customize`}>
            <Button variant="outline">Customize Resume</Button>
          </Link>
          <Link href={`/dashboard/jobs/${job.id}/edit`}>
            <Button variant="outline" size="icon">
              <Edit className="h-4 w-4" />
            </Button>
          </Link>
          <Button variant="outline" size="icon">
            <Trash className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <Badge variant="outline">{job.status}</Badge>
        {job.tags.map((tag) => (
          <Badge key={tag} variant="secondary">
            {tag}
          </Badge>
        ))}
      </div>

      <Tabs defaultValue="details" className="w-full">
        <TabsList>
          <TabsTrigger value="details">Details</TabsTrigger>
          <TabsTrigger value="analysis">Qualification Analysis</TabsTrigger>
          <TabsTrigger value="cover-letter">Cover Letter</TabsTrigger>
        </TabsList>
        <TabsContent value="details" className="mt-4 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Job Description</CardTitle>
              {job.url && (
                <CardDescription>
                  <a
                    href={job.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-sm text-blue-500 hover:underline"
                  >
                    View original posting <ExternalLink className="h-3 w-3" />
                  </a>
                </CardDescription>
              )}
            </CardHeader>
            <CardContent>
              <p className="whitespace-pre-line">{job.description}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Requirements</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="whitespace-pre-line">{job.requirements}</p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="analysis" className="mt-4">
          <QualificationAnalysis
            jobId={job.id}
            jobTitle={job.title}
            jobDescription={job.description}
            jobRequirements={job.requirements}
          />
        </TabsContent>
        <TabsContent value="cover-letter" className="mt-4">
          <CoverLetterGenerator
            jobId={job.id}
            jobTitle={job.title}
            jobCompany={job.company}
          />
        </TabsContent>
      </Tabs>
    </div>
  )
}
