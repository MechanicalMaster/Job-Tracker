import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles } from "lucide-react"
import Link from "next/link"

interface OverviewProps {
  jobDescription: string
  jobId?: string
}

export function Overview({ jobDescription, jobId = "1" }: OverviewProps) {
  // In a real app, these would be calculated based on the job description and user profile
  const overallMatch = 72
  const skillsMatch = 65
  const experienceMatch = 80
  const educationMatch = 90

  const getMatchColor = (value: number) => {
    if (value >= 80) return "text-green-600"
    if (value >= 60) return "text-yellow-600"
    return "text-red-600"
  }

  const getProgressColor = (value: number) => {
    if (value >= 80) return "bg-green-600"
    if (value >= 60) return "bg-yellow-600"
    return "bg-red-600"
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Qualification Match Overview</CardTitle>
          <CardDescription>How well your profile matches the requirements for this position.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-col items-center justify-center space-y-2 rounded-lg bg-muted p-6 text-center">
            <div className="text-4xl font-bold">
              <span className={getMatchColor(overallMatch)}>{overallMatch}%</span>
            </div>
            <p className="text-sm text-muted-foreground">Overall Match Score</p>
            <div className="mt-2 w-full max-w-md">
              <Progress value={overallMatch} className={`h-2 ${getProgressColor(overallMatch)}`} />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2 rounded-lg border p-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium">Skills</h3>
                <span className={`text-sm font-bold ${getMatchColor(skillsMatch)}`}>{skillsMatch}%</span>
              </div>
              <Progress value={skillsMatch} className={`h-1.5 ${getProgressColor(skillsMatch)}`} />
            </div>

            <div className="space-y-2 rounded-lg border p-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium">Experience</h3>
                <span className={`text-sm font-bold ${getMatchColor(experienceMatch)}`}>{experienceMatch}%</span>
              </div>
              <Progress value={experienceMatch} className={`h-1.5 ${getProgressColor(experienceMatch)}`} />
            </div>

            <div className="space-y-2 rounded-lg border p-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium">Education</h3>
                <span className={`text-sm font-bold ${getMatchColor(educationMatch)}`}>{educationMatch}%</span>
              </div>
              <Progress value={educationMatch} className={`h-1.5 ${getProgressColor(educationMatch)}`} />
            </div>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row">
            <Link href={`/dashboard/jobs/${jobId}/customize`} className="flex-1">
              <Button className="w-full gap-2">
                <Sparkles className="h-4 w-4" /> Customize Resume
              </Button>
            </Link>
            <Link href={`/dashboard/profile`} className="flex-1">
              <Button variant="outline" className="w-full gap-2">
                Update Profile <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
