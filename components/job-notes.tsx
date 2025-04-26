"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { formatDate } from "@/lib/utils"

interface JobNotesProps {
  jobId: string
}

export function JobNotes({ jobId }: JobNotesProps) {
  const [notes, setNotes] = useState([
    {
      id: "1",
      content:
        "Had a great initial call with the recruiter. They mentioned they're looking for someone with React experience.",
      date: "2023-04-16T10:30:00Z",
    },
    {
      id: "2",
      content: "Technical interview scheduled for next week. Need to review React hooks and TypeScript.",
      date: "2023-04-17T14:45:00Z",
    },
  ])

  const [newNote, setNewNote] = useState("")

  const addNote = () => {
    if (!newNote.trim()) return

    const note = {
      id: Date.now().toString(),
      content: newNote,
      date: new Date().toISOString(),
    }

    setNotes([note, ...notes])
    setNewNote("")
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Add Note</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Textarea
              placeholder="Add a note about this job application..."
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
              className="min-h-[100px]"
            />
            <Button onClick={addNote}>Add Note</Button>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        {notes.map((note) => (
          <Card key={note.id}>
            <CardContent className="p-4">
              <p className="whitespace-pre-line">{note.content}</p>
              <p className="mt-2 text-sm text-muted-foreground">{formatDate(note.date)}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
