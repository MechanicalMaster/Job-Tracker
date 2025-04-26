import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight, BookOpen, Briefcase, GraduationCap } from "lucide-react"
import Link from "next/link"

interface RecommendationsProps {
  jobDescription: string
}

export function Recommendations({ jobDescription }: RecommendationsProps) {
  // In a real app, these would be generated based on the job description and user profile
  const skillRecommendations = [
    {
      id: "1",
      title: "Learn TypeScript",
      description: "Improve your TypeScript skills to meet the advanced level required for this position.",
      priority: "High",
    },
    {
      id: "2",
      title: "Add Redux to your skillset",
      description: "This job requires Redux experience which is missing from your profile.",
      priority: "High",
    },
    {
      id: "3",
      title: "Improve responsive design skills",
      description: "Enhance your knowledge of responsive design principles and techniques.",
      priority: "Medium",
    },
  ]

  const experienceRecommendations = [
    {
      id: "1",
      title: "Highlight React project experience",
      description: "Emphasize your experience with large-scale React applications in your resume.",
      priority: "High",
    },
    {
      id: "2",
      title: "Add metrics to your achievements",
      description: "Include quantifiable results and metrics in your experience descriptions.",
      priority: "Medium",
    },
  ]

  const educationRecommendations = [
    {
      id: "1",
      title: "Add relevant certifications",
      description: "Consider adding React or JavaScript certifications to strengthen your profile.",
      priority: "Low",
    },
  ]

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "text-red-600"
      case "Medium":
        return "text-yellow-600"
      case "Low":
        return "text-green-600"
      default:
        return ""
    }
  }

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case "High":
        return "!!!"
      case "Medium":
        return "!!"
      case "Low":
        return "!"
      default:
        return ""
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Skill Recommendations</CardTitle>
          <CardDescription>Suggested actions to improve your skills match for this position.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {skillRecommendations.map((recommendation) => (
            <div key={recommendation.id} className="flex items-start gap-4 rounded-lg border p-4">
              <div className="mt-0.5 rounded-full bg-muted p-1.5">
                <BookOpen className="h-4 w-4" />
              </div>
              <div className="flex-1 space-y-1">
                <div className="flex items-center gap-2">
                  <h4 className="font-medium">{recommendation.title}</h4>
                  <span className={`text-xs font-medium ${getPriorityColor(recommendation.priority)}`}>
                    {getPriorityIcon(recommendation.priority)} {recommendation.priority} Priority
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">{recommendation.description}</p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Experience Recommendations</CardTitle>
          <CardDescription>Suggested actions to improve how you present your experience.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {experienceRecommendations.map((recommendation) => (
            <div key={recommendation.id} className="flex items-start gap-4 rounded-lg border p-4">
              <div className="mt-0.5 rounded-full bg-muted p-1.5">
                <Briefcase className="h-4 w-4" />
              </div>
              <div className="flex-1 space-y-1">
                <div className="flex items-center gap-2">
                  <h4 className="font-medium">{recommendation.title}</h4>
                  <span className={`text-xs font-medium ${getPriorityColor(recommendation.priority)}`}>
                    {getPriorityIcon(recommendation.priority)} {recommendation.priority} Priority
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">{recommendation.description}</p>
              </div>
            </div>
          ))}
          <div className="pt-2">
            <Link href="/dashboard/profile">
              <Button variant="outline" className="w-full gap-2">
                Update Experience <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Education Recommendations</CardTitle>
          <CardDescription>Suggested actions to improve your educational qualifications.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {educationRecommendations.map((recommendation) => (
            <div key={recommendation.id} className="flex items-start gap-4 rounded-lg border p-4">
              <div className="mt-0.5 rounded-full bg-muted p-1.5">
                <GraduationCap className="h-4 w-4" />
              </div>
              <div className="flex-1 space-y-1">
                <div className="flex items-center gap-2">
                  <h4 className="font-medium">{recommendation.title}</h4>
                  <span className={`text-xs font-medium ${getPriorityColor(recommendation.priority)}`}>
                    {getPriorityIcon(recommendation.priority)} {recommendation.priority} Priority
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">{recommendation.description}</p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
