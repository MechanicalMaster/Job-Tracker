import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, BookOpen, Video, Code } from "lucide-react"

interface SkillGapResourcesProps {
  skill: string
}

export function SkillGapResources({ skill }: SkillGapResourcesProps) {
  // In a real app, these would be fetched based on the skill
  const resources = [
    {
      id: "1",
      title: `Introduction to ${skill}`,
      type: "course",
      platform: "Udemy",
      url: "#",
      duration: "10 hours",
      level: "Beginner",
    },
    {
      id: "2",
      title: `${skill} for Experienced Developers`,
      type: "tutorial",
      platform: "YouTube",
      url: "#",
      duration: "45 minutes",
      level: "Intermediate",
    },
    {
      id: "3",
      title: `Advanced ${skill} Techniques`,
      type: "documentation",
      platform: "Official Docs",
      url: "#",
      level: "Advanced",
    },
    {
      id: "4",
      title: `Building a Real-World App with ${skill}`,
      type: "project",
      platform: "GitHub",
      url: "#",
      level: "Intermediate",
    },
  ]

  const getResourceIcon = (type: string) => {
    switch (type) {
      case "course":
        return <BookOpen className="h-4 w-4" />
      case "tutorial":
        return <Video className="h-4 w-4" />
      case "documentation":
        return <BookOpen className="h-4 w-4" />
      case "project":
        return <Code className="h-4 w-4" />
      default:
        return <BookOpen className="h-4 w-4" />
    }
  }

  const getLevelColor = (level: string) => {
    switch (level) {
      case "Beginner":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "Intermediate":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
      case "Advanced":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300"
      default:
        return ""
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Learning Resources for {skill}</CardTitle>
        <CardDescription>Recommended resources to help you learn and improve your {skill} skills.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {resources.map((resource) => (
          <div key={resource.id} className="flex items-start gap-4 rounded-lg border p-4">
            <div className="mt-1 rounded-full bg-muted p-1">{getResourceIcon(resource.type)}</div>
            <div className="flex-1 space-y-1">
              <div className="flex items-start justify-between">
                <h4 className="font-medium">{resource.title}</h4>
                <Badge variant="secondary" className={getLevelColor(resource.level)}>
                  {resource.level}
                </Badge>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span>{resource.platform}</span>
                {resource.duration && (
                  <>
                    <span>•</span>
                    <span>{resource.duration}</span>
                  </>
                )}
              </div>
              <div className="pt-2">
                <a href={resource.url} target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" size="sm" className="gap-2">
                    <ExternalLink className="h-3 w-3" /> View Resource
                  </Button>
                </a>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
