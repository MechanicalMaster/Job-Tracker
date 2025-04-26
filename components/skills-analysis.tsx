import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, AlertCircle } from "lucide-react"
import { SkillGapModal } from "@/components/skill-gap-modal"

interface SkillsAnalysisProps {
  jobDescription: string
}

export function SkillsAnalysis({ jobDescription }: SkillsAnalysisProps) {
  // In a real app, these would be extracted from the job description and user profile
  const matchedSkills = [
    { name: "React", level: "Expert" },
    { name: "JavaScript", level: "Expert" },
    { name: "CSS", level: "Advanced" },
  ]

  const partialSkills = [
    { name: "TypeScript", level: "Intermediate", required: "Advanced" },
    { name: "Responsive Design", level: "Basic", required: "Advanced" },
  ]

  const missingSkills = [
    { name: "Redux", importance: "High" },
    { name: "Next.js", importance: "Medium" },
    { name: "Jest", importance: "Medium" },
  ]

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Skills Match Analysis</CardTitle>
          <CardDescription>
            Analysis of your skills compared to the requirements in the job description.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium">Overall Skills Match</h3>
              <span className="text-sm font-medium">65%</span>
            </div>
            <Progress value={65} className="h-2" />
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="mb-2 text-sm font-medium">Matched Skills</h3>
              <div className="flex flex-wrap gap-2">
                {matchedSkills.map((skill) => (
                  <Badge
                    key={skill.name}
                    variant="secondary"
                    className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                  >
                    <CheckCircle className="mr-1 h-3 w-3" />
                    {skill.name} ({skill.level})
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <h3 className="mb-2 text-sm font-medium">Partial Matches</h3>
              <div className="flex flex-wrap gap-2">
                {partialSkills.map((skill) => (
                  <Badge
                    key={skill.name}
                    variant="secondary"
                    className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
                  >
                    <AlertCircle className="mr-1 h-3 w-3" />
                    {skill.name} ({skill.level} vs. {skill.required})
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <h3 className="mb-2 text-sm font-medium">Missing Skills</h3>
              <div className="flex flex-wrap gap-2">
                {missingSkills.map((skill) => (
                  <SkillGapModal key={skill.name} skill={skill.name} />
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
