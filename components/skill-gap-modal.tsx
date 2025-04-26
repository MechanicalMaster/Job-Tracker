"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { SkillGapResources } from "@/components/skill-gap-resources"
import { AlertCircle } from "lucide-react"

interface SkillGapModalProps {
  skill: string
}

export function SkillGapModal({ skill }: SkillGapModalProps) {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Badge
          variant="secondary"
          className="cursor-pointer bg-red-100 text-red-800 hover:bg-red-200 dark:bg-red-900 dark:text-red-300 dark:hover:bg-red-800"
        >
          <AlertCircle className="mr-1 h-3 w-3" />
          {skill}
        </Badge>
      </DialogTrigger>
      <DialogContent className="max-h-[80vh] overflow-y-auto sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Skill Gap: {skill}</DialogTitle>
          <DialogDescription>
            This skill was identified as missing from your profile but is required for the job.
          </DialogDescription>
        </DialogHeader>
        <SkillGapResources skill={skill} />
      </DialogContent>
    </Dialog>
  )
}
