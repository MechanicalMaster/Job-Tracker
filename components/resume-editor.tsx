"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Bold, Italic, List, ListOrdered, Save } from "lucide-react"

export function ResumeEditor() {
  const [content, setContent] = useState(`# John Doe

**Email:** john@example.com | **Phone:** (123) 456-7890 | **Location:** New York, NY

## Summary
Experienced frontend developer with a passion for creating responsive and user-friendly web applications. Skilled in React, TypeScript, and modern web technologies.

## Experience
### Senior Frontend Developer
**Acme Inc** | Jan 2020 - Present
- Developed and maintained multiple React applications
- Implemented responsive designs and improved performance
- Collaborated with UX designers to create intuitive user interfaces

### Frontend Developer
**Tech Solutions** | Mar 2017 - Dec 2019
- Built web applications using React and Redux
- Worked in an agile team environment
- Implemented unit tests and integration tests

## Education
**Bachelor of Science in Computer Science**
University of Technology | 2013 - 2017

## Skills
- JavaScript/TypeScript
- React/Next.js
- HTML/CSS
- Tailwind CSS
- Git
- Responsive Design
- Testing (Jest, React Testing Library)
`)

  return (
    <Card>
      <CardContent className="p-6">
        <div className="mb-4 flex items-center gap-2 border-b pb-2">
          <Button variant="ghost" size="icon">
            <Bold className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon">
            <Italic className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon">
            <List className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon">
            <ListOrdered className="h-4 w-4" />
          </Button>
          <div className="ml-auto">
            <Button variant="outline" size="sm" className="gap-2">
              <Save className="h-4 w-4" /> Save
            </Button>
          </div>
        </div>

        <div className="min-h-[500px] rounded-md border bg-white p-4 text-sm">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="h-full w-full resize-none border-0 bg-transparent p-0 font-mono focus:outline-none focus:ring-0"
            style={{ minHeight: "500px" }}
          />
        </div>
      </CardContent>
    </Card>
  )
}
