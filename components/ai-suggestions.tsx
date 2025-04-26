import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, RefreshCw } from "lucide-react"

interface AISuggestionsProps {
  jobId: string
}

export function AISuggestions({ jobId }: AISuggestionsProps) {
  // In a real app, you would fetch the suggestions from the API
  const suggestions = [
    {
      id: "1",
      category: "Skills",
      content: "Proficient in React and Next.js development",
    },
    {
      id: "2",
      category: "Skills",
      content: "Experience with TypeScript and modern JavaScript",
    },
    {
      id: "3",
      category: "Experience",
      content: "Developed responsive web applications with focus on performance",
    },
    {
      id: "4",
      category: "Experience",
      content: "Implemented CI/CD pipelines for automated testing and deployment",
    },
    {
      id: "5",
      category: "Keywords",
      content: "Frontend architecture",
    },
    {
      id: "6",
      category: "Keywords",
      content: "Component-based design",
    },
  ]

  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base">AI Suggestions</CardTitle>
        <Button variant="ghost" size="icon">
          <RefreshCw className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">
          Click on a suggestion to add it to your resume at the cursor position.
        </p>

        <div className="space-y-4">
          <div>
            <h4 className="mb-2 text-sm font-medium">Skills</h4>
            <div className="space-y-2">
              {suggestions
                .filter((s) => s.category === "Skills")
                .map((suggestion) => (
                  <div key={suggestion.id} className="flex items-start gap-2 rounded-md border p-2 text-sm">
                    <Button variant="ghost" size="icon" className="h-5 w-5 shrink-0">
                      <Plus className="h-3 w-3" />
                    </Button>
                    <p>{suggestion.content}</p>
                  </div>
                ))}
            </div>
          </div>

          <div>
            <h4 className="mb-2 text-sm font-medium">Experience</h4>
            <div className="space-y-2">
              {suggestions
                .filter((s) => s.category === "Experience")
                .map((suggestion) => (
                  <div key={suggestion.id} className="flex items-start gap-2 rounded-md border p-2 text-sm">
                    <Button variant="ghost" size="icon" className="h-5 w-5 shrink-0">
                      <Plus className="h-3 w-3" />
                    </Button>
                    <p>{suggestion.content}</p>
                  </div>
                ))}
            </div>
          </div>

          <div>
            <h4 className="mb-2 text-sm font-medium">Keywords</h4>
            <div className="space-y-2">
              {suggestions
                .filter((s) => s.category === "Keywords")
                .map((suggestion) => (
                  <div key={suggestion.id} className="flex items-start gap-2 rounded-md border p-2 text-sm">
                    <Button variant="ghost" size="icon" className="h-5 w-5 shrink-0">
                      <Plus className="h-3 w-3" />
                    </Button>
                    <p>{suggestion.content}</p>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
