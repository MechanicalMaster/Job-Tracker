import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { formatDate } from "@/lib/utils"
import { Download, Eye } from "lucide-react"

interface JobApplicationsProps {
  jobId: string
}

export function JobApplications({ jobId }: JobApplicationsProps) {
  // In a real app, you would fetch the applications from the API
  const applications = [
    {
      id: "1",
      resumeVersion: "Professional Template v1",
      date: "2023-04-18T09:15:00Z",
      status: "submitted",
    },
    {
      id: "2",
      resumeVersion: "Professional Template v2",
      date: "2023-04-20T11:30:00Z",
      status: "follow-up",
    },
  ]

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Application History</CardTitle>
        </CardHeader>
        <CardContent>
          {applications.length === 0 ? (
            <p className="text-center text-muted-foreground">
              No applications yet. Customize your resume and apply to this job.
            </p>
          ) : (
            <div className="space-y-4">
              {applications.map((application) => (
                <div
                  key={application.id}
                  className="flex flex-col gap-2 rounded-lg border p-4 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div>
                    <h4 className="font-medium">{application.resumeVersion}</h4>
                    <p className="text-sm text-muted-foreground">Applied on {formatDate(application.date)}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">
                      {application.status === "submitted" ? "Submitted" : "Follow-up Sent"}
                    </Badge>
                    <Button variant="outline" size="icon">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
