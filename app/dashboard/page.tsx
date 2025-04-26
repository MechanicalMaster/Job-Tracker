"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { JobCard } from "@/components/job-card"
import { StatsCards } from "@/components/stats-cards"
import { Search, Plus, Smile } from "lucide-react"
import Link from "next/link"
import { JobFilters } from "@/components/job-filters"
import { useEffect, useState } from "react"

export default function DashboardPage() {
  // Retrieve user's name from localStorage or default to 'User'
  const [userName, setUserName] = useState("User")
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedName = localStorage.getItem("userName")
      if (storedName) setUserName(storedName)
    }
  }, [])

  return (
    <div className="flex flex-col gap-6">
      {/* Welcome Banner */}
      <div className="flex items-center gap-3 rounded-lg bg-blue-50 border border-blue-200 px-6 py-4 mb-2">
        <Smile className="text-blue-400 h-7 w-7" />
        <span className="text-lg font-semibold text-blue-700">Welcome, {userName}!</span>
      </div>
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Dashboard</h2>
          <p className="text-muted-foreground">Manage your job applications and track your progress.</p>
        </div>
        <Link href="/dashboard/add-job">
          <Button className="gap-2">
            <Plus className="h-4 w-4" /> Add Job
          </Button>
        </Link>
      </div>

      <StatsCards />

      <div className="flex flex-col gap-4 md:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input type="search" placeholder="Search jobs..." className="w-full pl-8" />
        </div>
        <JobFilters />
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList>
          <TabsTrigger value="all">All Jobs</TabsTrigger>
          <TabsTrigger value="applied">Applied</TabsTrigger>
          <TabsTrigger value="interview">Interview</TabsTrigger>
          <TabsTrigger value="offer">Offer</TabsTrigger>
          <TabsTrigger value="rejected">Rejected</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <JobCard
            id="1"
            title="Frontend Developer"
            company="Acme Inc"
            location="Remote"
            status="applied"
            date="2023-04-15"
          />
          <JobCard
            id="2"
            title="Full Stack Engineer"
            company="TechCorp"
            location="New York, NY"
            status="interview"
            date="2023-04-10"
          />
          <JobCard
            id="3"
            title="UI/UX Designer"
            company="DesignStudio"
            location="San Francisco, CA"
            status="rejected"
            date="2023-04-05"
          />
          <JobCard
            id="4"
            title="Product Manager"
            company="ProductLabs"
            location="Austin, TX"
            status="offer"
            date="2023-04-01"
          />
          <JobCard
            id="5"
            title="DevOps Engineer"
            company="CloudTech"
            location="Remote"
            status="applied"
            date="2023-03-28"
          />
        </TabsContent>
        <TabsContent value="applied" className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <JobCard
            id="1"
            title="Frontend Developer"
            company="Acme Inc"
            location="Remote"
            status="applied"
            date="2023-04-15"
          />
          <JobCard
            id="5"
            title="DevOps Engineer"
            company="CloudTech"
            location="Remote"
            status="applied"
            date="2023-03-28"
          />
        </TabsContent>
        <TabsContent value="interview" className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <JobCard
            id="2"
            title="Full Stack Engineer"
            company="TechCorp"
            location="New York, NY"
            status="interview"
            date="2023-04-10"
          />
        </TabsContent>
        <TabsContent value="offer" className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <JobCard
            id="4"
            title="Product Manager"
            company="ProductLabs"
            location="Austin, TX"
            status="offer"
            date="2023-04-01"
          />
        </TabsContent>
        <TabsContent value="rejected" className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <JobCard
            id="3"
            title="UI/UX Designer"
            company="DesignStudio"
            location="San Francisco, CA"
            status="rejected"
            date="2023-04-05"
          />
        </TabsContent>
      </Tabs>
    </div>
  )
}
