"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { updateProfileAction } from "@/app/actions/profile"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function ProfilePage() {
  const [education, setEducation] = useState([
    { school: "", degree: "", field: "", start: "", end: "", grade: "", description: "" }
  ])
  const [experience, setExperience] = useState([
    { company: "", title: "", location: "", start: "", end: "", responsibilities: "" }
  ])
  const [projects, setProjects] = useState([
    { name: "", description: "", technologies: "", link: "", role: "" }
  ])

  const handleAddEducation = () => {
    setEducation([...education, { school: "", degree: "", field: "", start: "", end: "", grade: "", description: "" }])
  }
  const handleRemoveEducation = (idx: number) => {
    setEducation(education.filter((_, i) => i !== idx))
  }
  const handleEduChange = (idx: number, field: string, value: string) => {
    setEducation(education.map((edu, i) => i === idx ? { ...edu, [field]: value } : edu))
  }

  const handleAddExperience = () => {
    setExperience([...experience, { company: "", title: "", location: "", start: "", end: "", responsibilities: "" }])
  }
  const handleRemoveExperience = (idx: number) => {
    setExperience(experience.filter((_, i) => i !== idx))
  }
  const handleExpChange = (idx: number, field: string, value: string) => {
    setExperience(experience.map((exp, i) => i === idx ? { ...exp, [field]: value } : exp))
  }

  const handleAddProject = () => {
    setProjects([...projects, { name: "", description: "", technologies: "", link: "", role: "" }])
  }
  const handleRemoveProject = (idx: number) => {
    setProjects(projects.filter((_, i) => i !== idx))
  }
  const handleProjectChange = (idx: number, field: string, value: string) => {
    setProjects(projects.map((proj, i) => i === idx ? { ...proj, [field]: value } : proj))
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-4">
        <Link href="/dashboard">
          <Button variant="outline" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Master Profile</h2>
          <p className="text-muted-foreground">Manage your personal information and resume data.</p>
        </div>
      </div>
      <Tabs defaultValue="personal" className="w-full">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="personal">Personal</TabsTrigger>
          <TabsTrigger value="education">Education</TabsTrigger>
          <TabsTrigger value="experience">Experience</TabsTrigger>
          <TabsTrigger value="skills">Skills</TabsTrigger>
          <TabsTrigger value="projects">Projects</TabsTrigger>
          <TabsTrigger value="other">Other</TabsTrigger>
        </TabsList>
        <form action={updateProfileAction}>
          <TabsContent value="personal" className="mt-4 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>Update your personal details and contact information.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" name="name" placeholder="John Doe" />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" name="email" type="email" placeholder="john@example.com" />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" name="phone" placeholder="(123) 456-7890" />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="location">Location</Label>
                  <Input id="location" name="location" placeholder="New York, NY" />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="linkedin">LinkedIn</Label>
                  <Input id="linkedin" name="linkedin" placeholder="https://linkedin.com/in/johndoe" />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="portfolio">Portfolio/Website</Label>
                  <Input id="portfolio" name="portfolio" placeholder="https://johndoe.com" />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="summary">Professional Summary</Label>
                  <Textarea
                    id="summary"
                    name="summary"
                    placeholder="A brief summary of your professional background and career goals"
                    className="min-h-[100px]"
                  />
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-end">
              <Button type="submit">Save Changes</Button>
            </div>
          </TabsContent>

          <TabsContent value="education" className="mt-4 space-y-4">
            {education.map((edu, idx) => (
              <Card key={idx} className="relative">
                <CardHeader>
                  <CardTitle>Education {education.length > 1 ? idx + 1 : ""}</CardTitle>
                  <CardDescription>Add your educational background.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-2">
                    <Label>School/University</Label>
                    <Input value={edu.school} onChange={e => handleEduChange(idx, "school", e.target.value)} placeholder="e.g. MIT" />
                  </div>
                  <div className="grid gap-2">
                    <Label>Degree</Label>
                    <Input value={edu.degree} onChange={e => handleEduChange(idx, "degree", e.target.value)} placeholder="e.g. B.Tech" />
                  </div>
                  <div className="grid gap-2">
                    <Label>Field of Study</Label>
                    <Input value={edu.field} onChange={e => handleEduChange(idx, "field", e.target.value)} placeholder="e.g. Computer Science" />
                  </div>
                  <div className="flex gap-2">
                    <div className="flex-1">
                      <Label>Start Year</Label>
                      <Input value={edu.start} onChange={e => handleEduChange(idx, "start", e.target.value)} placeholder="YYYY" />
                    </div>
                    <div className="flex-1">
                      <Label>End Year</Label>
                      <Input value={edu.end} onChange={e => handleEduChange(idx, "end", e.target.value)} placeholder="YYYY or Present" />
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label>Grade/Score</Label>
                    <Input value={edu.grade} onChange={e => handleEduChange(idx, "grade", e.target.value)} placeholder="e.g. 9.1 CGPA" />
                  </div>
                  <div className="grid gap-2">
                    <Label>Description</Label>
                    <Textarea value={edu.description} onChange={e => handleEduChange(idx, "description", e.target.value)} placeholder="Describe your coursework, honors, etc." className="min-h-[80px]" />
                  </div>
                  {education.length > 1 && (
                    <Button type="button" variant="destructive" size="sm" className="absolute top-4 right-4" onClick={() => handleRemoveEducation(idx)}>
                      Remove
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
            <div className="flex justify-end">
              <Button type="button" variant="outline" onClick={handleAddEducation}>+ Add Education</Button>
            </div>
            <div className="flex justify-end">
              <Button type="submit">Save Changes</Button>
            </div>
          </TabsContent>

          <TabsContent value="experience" className="mt-4 space-y-4">
            {experience.map((exp, idx) => (
              <Card key={idx} className="relative">
                <CardHeader>
                  <CardTitle>Experience {experience.length > 1 ? idx + 1 : ""}</CardTitle>
                  <CardDescription>Add your work experience.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-2">
                    <Label>Company</Label>
                    <Input value={exp.company} onChange={e => handleExpChange(idx, "company", e.target.value)} placeholder="e.g. Google" />
                  </div>
                  <div className="grid gap-2">
                    <Label>Job Title</Label>
                    <Input value={exp.title} onChange={e => handleExpChange(idx, "title", e.target.value)} placeholder="e.g. Software Engineer" />
                  </div>
                  <div className="grid gap-2">
                    <Label>Location</Label>
                    <Input value={exp.location} onChange={e => handleExpChange(idx, "location", e.target.value)} placeholder="e.g. Mountain View, CA" />
                  </div>
                  <div className="flex gap-2">
                    <div className="flex-1">
                      <Label>Start Date</Label>
                      <Input value={exp.start} onChange={e => handleExpChange(idx, "start", e.target.value)} placeholder="YYYY-MM" />
                    </div>
                    <div className="flex-1">
                      <Label>End Date</Label>
                      <Input value={exp.end} onChange={e => handleExpChange(idx, "end", e.target.value)} placeholder="YYYY-MM or Present" />
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label>Responsibilities & Achievements</Label>
                    <Textarea value={exp.responsibilities} onChange={e => handleExpChange(idx, "responsibilities", e.target.value)} placeholder="Describe your key responsibilities and achievements in this role" className="min-h-[100px]" />
                  </div>
                  {experience.length > 1 && (
                    <Button type="button" variant="destructive" size="sm" className="absolute top-4 right-4" onClick={() => handleRemoveExperience(idx)}>
                      Remove
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
            <div className="flex justify-end">
              <Button type="button" variant="outline" onClick={handleAddExperience}>+ Add Experience</Button>
            </div>
            <div className="flex justify-end">
              <Button type="submit">Save Changes</Button>
            </div>
          </TabsContent>

          <TabsContent value="skills" className="mt-4 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Skills</CardTitle>
                <CardDescription>Add your technical and soft skills.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="technicalSkills">Technical Skills</Label>
                  <Textarea
                    id="technicalSkills"
                    name="technicalSkills"
                    placeholder="List your technical skills (e.g., JavaScript, React, Node.js)"
                    className="min-h-[100px]"
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="softSkills">Soft Skills</Label>
                  <Textarea
                    id="softSkills"
                    name="softSkills"
                    placeholder="List your soft skills (e.g., Communication, Leadership, Problem Solving)"
                    className="min-h-[100px]"
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="languages">Languages</Label>
                  <Textarea
                    id="languages"
                    name="languages"
                    placeholder="List languages you speak and your proficiency level"
                    className="min-h-[100px]"
                  />
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-end">
              <Button type="submit">Save Changes</Button>
            </div>
          </TabsContent>

          <TabsContent value="projects" className="mt-4 space-y-4">
            {projects.map((proj, idx) => (
              <Card key={idx} className="relative">
                <CardHeader>
                  <CardTitle>Project {projects.length > 1 ? idx + 1 : ""}</CardTitle>
                  <CardDescription>Add your key projects that can be included in your resume.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-2">
                    <Label>Project Name</Label>
                    <Input value={proj.name} onChange={e => handleProjectChange(idx, "name", e.target.value)} placeholder="e.g. Job Tracker App" />
                  </div>
                  <div className="grid gap-2">
                    <Label>Description</Label>
                    <Textarea value={proj.description} onChange={e => handleProjectChange(idx, "description", e.target.value)} placeholder="Describe the project, your role, and its impact." className="min-h-[80px]" />
                  </div>
                  <div className="grid gap-2">
                    <Label>Technologies Used</Label>
                    <Input value={proj.technologies} onChange={e => handleProjectChange(idx, "technologies", e.target.value)} placeholder="e.g. React, Node.js, PostgreSQL" />
                  </div>
                  <div className="grid gap-2">
                    <Label>Link (optional)</Label>
                    <Input value={proj.link} onChange={e => handleProjectChange(idx, "link", e.target.value)} placeholder="e.g. https://github.com/yourproject" />
                  </div>
                  <div className="grid gap-2">
                    <Label>Role/Impact</Label>
                    <Textarea value={proj.role} onChange={e => handleProjectChange(idx, "role", e.target.value)} placeholder="Describe your role or the impact of the project." className="min-h-[60px]" />
                  </div>
                  {projects.length > 1 && (
                    <Button type="button" variant="destructive" size="sm" className="absolute top-4 right-4" onClick={() => handleRemoveProject(idx)}>
                      Remove
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
            <div className="flex justify-end">
              <Button type="button" variant="outline" onClick={handleAddProject}>+ Add Project</Button>
            </div>
            <div className="flex justify-end">
              <Button type="submit">Save Changes</Button>
            </div>
          </TabsContent>

          <TabsContent value="other" className="mt-4 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Other Information</CardTitle>
                <CardDescription>Add certifications, projects, and other relevant information.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="certifications">Certifications</Label>
                  <Textarea
                    id="certifications"
                    name="certifications"
                    placeholder="List your certifications and credentials"
                    className="min-h-[100px]"
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="projects">Projects</Label>
                  <Textarea
                    id="projects"
                    name="projects"
                    placeholder="Describe your notable projects"
                    className="min-h-[100px]"
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="volunteer">Volunteer Experience</Label>
                  <Textarea
                    id="volunteer"
                    name="volunteer"
                    placeholder="Describe your volunteer experience"
                    className="min-h-[100px]"
                  />
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-end">
              <Button type="submit">Save Changes</Button>
            </div>
          </TabsContent>
        </form>
      </Tabs>
    </div>
  )
}
