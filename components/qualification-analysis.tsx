"use client"
import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SkillsAnalysis } from "@/components/skills-analysis"
import { Recommendations } from "@/components/recommendations"
import { Overview } from "@/components/overview"
import { ResumeImprovementSuggestions } from "@/components/resume-improvement-suggestions"

interface QualificationAnalysisProps {
  jobId: string
  jobTitle: string
  jobDescription: string
  jobRequirements: string
}

export function QualificationAnalysis({
  jobId,
  jobTitle,
  jobDescription,
  jobRequirements,
}: QualificationAnalysisProps) {
  const [activeTab, setActiveTab] = useState("overview")

  // Combine job description and requirements for analysis
  const fullJobDescription = `${jobDescription}\n\n${jobRequirements}`

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="skills">Skills Analysis</TabsTrigger>
        <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
        <TabsTrigger value="resume">Resume Improvements</TabsTrigger>
      </TabsList>

      <TabsContent value="overview" className="mt-4 space-y-4">
        <Overview jobDescription={fullJobDescription} jobId={jobId} />
      </TabsContent>
      <TabsContent value="skills" className="mt-4 space-y-4">
        <SkillsAnalysis jobDescription={fullJobDescription} />
      </TabsContent>
      <TabsContent value="recommendations" className="mt-4 space-y-4">
        <Recommendations jobDescription={fullJobDescription} />
      </TabsContent>
      <TabsContent value="resume" className="mt-4 space-y-4">
        <ResumeImprovementSuggestions jobTitle={jobTitle} />
      </TabsContent>
    </Tabs>
  )
}
