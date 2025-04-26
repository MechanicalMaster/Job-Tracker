import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { FileUploader } from "@/components/file-uploader"
import { addJobAction } from "@/app/actions/jobs"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function AddJobPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-4">
        <Link href="/dashboard">
          <Button variant="outline" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Add Job</h2>
          <p className="text-muted-foreground">Add a new job posting to track your application.</p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardContent className="pt-6">
            <FileUploader />
          </CardContent>
        </Card>

        <form action={addJobAction} className="space-y-6">
          <div className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Job Title</Label>
              <Input id="title" name="title" placeholder="e.g. Frontend Developer" />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="company">Company</Label>
              <Input id="company" name="company" placeholder="e.g. Acme Inc" />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="location">Location</Label>
              <Input id="location" name="location" placeholder="e.g. Remote, New York, NY" />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="description">Job Description</Label>
              <Textarea
                id="description"
                name="description"
                placeholder="Paste or enter the job description"
                className="min-h-[150px]"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="requirements">Requirements</Label>
              <Textarea
                id="requirements"
                name="requirements"
                placeholder="List the job requirements"
                className="min-h-[100px]"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="tags">Tags (comma separated)</Label>
              <Input id="tags" name="tags" placeholder="e.g. React, TypeScript, Remote" />
            </div>
          </div>

          <div className="flex gap-4">
            <Button type="submit" className="flex-1">
              Save & View
            </Button>
            <Button type="button" variant="outline" className="flex-1">
              Save Draft
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
