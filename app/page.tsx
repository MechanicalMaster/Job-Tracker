"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, FileText, BarChart3, Wand2, UserCheck, CheckCircle, Sparkles } from "lucide-react"

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-background via-slate-50 to-white">
      <header className="border-b bg-background/80 backdrop-blur">
        <div className="container mx-auto flex h-16 items-center justify-between max-w-screen-lg">
          <div className="flex items-center gap-2 font-semibold">
            <span className="text-xl">JobTrack</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="ghost">Login</Button>
            </Link>
            <Link href="/signup">
              <Button>Sign Up</Button>
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-1 w-full flex flex-col items-center">
        {/* Hero Section */}
        <section className="w-full flex flex-col items-center justify-center container mx-auto max-w-screen-lg grid gap-6 pb-8 pt-12 md:py-20">
          <div className="flex flex-col items-center gap-4 animate-fade-in-up text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight bg-gradient-to-r from-blue-600 via-fuchsia-500 to-pink-500 bg-clip-text text-transparent animate-slide-in">
              Supercharge Your Job Search
            </h1>
            <p className="max-w-[700px] text-xl text-muted-foreground animate-fade-in delay-100">
              Organize your job hunt, create perfect resumes, and get AI-powered insights—all in one place.
            </p>
            <div className="flex gap-4 mt-4 animate-bounce-in justify-center">
              <Link href="/signup">
                <Button size="lg" className="gap-2 animate-bounce">
                  Get Started Free <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
              <Link href="/login">
                <Button size="lg" variant="outline">
                  Login
                </Button>
              </Link>
            </div>
          </div>
          <div className="flex justify-center mt-10">
            <Sparkles className="h-24 w-24 text-blue-500 animate-pulse drop-shadow-lg" />
          </div>
        </section>

        {/* Features Section */}
        <section className="w-full container mx-auto max-w-screen-lg py-12">
          <h2 className="text-3xl font-bold text-center mb-10 animate-fade-in-up">Everything You Need to Land Your Next Job</h2>
          <div className="grid gap-8 md:grid-cols-3">
            <div className="rounded-lg border bg-card p-6 shadow-lg hover:scale-105 hover:shadow-xl transition-transform group">
              <FileText className="h-10 w-10 text-blue-500 group-hover:animate-wiggle mb-2 mx-auto" />
              <h3 className="text-xl font-semibold text-center">Track Applications</h3>
              <p className="text-muted-foreground mt-2 text-center">
                Keep all your job applications in one place with status updates, reminders, and progress tracking.
              </p>
            </div>
            <div className="rounded-lg border bg-card p-6 shadow-lg hover:scale-105 hover:shadow-xl transition-transform group">
              <BarChart3 className="h-10 w-10 text-fuchsia-500 group-hover:animate-wiggle mb-2 mx-auto" />
              <h3 className="text-xl font-semibold text-center">Smart Analytics</h3>
              <p className="text-muted-foreground mt-2 text-center">
                Visualize your progress, get actionable insights, and optimize your job search strategy.
              </p>
            </div>
            <div className="rounded-lg border bg-card p-6 shadow-lg hover:scale-105 hover:shadow-xl transition-transform group">
              <Wand2 className="h-10 w-10 text-pink-500 group-hover:animate-wiggle mb-2 mx-auto" />
              <h3 className="text-xl font-semibold text-center">AI Resume & Cover Letters</h3>
              <p className="text-muted-foreground mt-2 text-center">
                Instantly generate and customize resumes or cover letters tailored to each job with AI.
              </p>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="w-full container mx-auto max-w-screen-lg py-16">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-10 animate-fade-in-up">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center p-6 rounded-lg bg-white border shadow-md animate-fade-in-up">
              <UserCheck className="h-8 w-8 text-blue-600 mb-2 animate-bounce" />
              <h4 className="font-semibold text-lg">Sign Up & Set Up</h4>
              <p className="text-muted-foreground mt-1">Create your profile, add your experience, and import your resume.</p>
            </div>
            <div className="flex flex-col items-center text-center p-6 rounded-lg bg-white border shadow-md animate-fade-in-up delay-100">
              <FileText className="h-8 w-8 text-fuchsia-600 mb-2 animate-bounce" />
              <h4 className="font-semibold text-lg">Track & Apply</h4>
              <p className="text-muted-foreground mt-1">Manage applications, deadlines, and progress in one dashboard.</p>
            </div>
            <div className="flex flex-col items-center text-center p-6 rounded-lg bg-white border shadow-md animate-fade-in-up delay-200">
              <CheckCircle className="h-8 w-8 text-green-600 mb-2 animate-bounce" />
              <h4 className="font-semibold text-lg">Get Hired</h4>
              <p className="text-muted-foreground mt-1">Leverage AI insights to stand out and land your dream job faster.</p>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t py-6 w-full">
        <div className="container mx-auto max-w-screen-lg flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-center text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} JobTrack. All rights reserved.
          </p>
        </div>
      </footer>
      {/* TailwindCSS keyframe animations */}
      <style jsx global>{`
        @keyframes fade-in-up {
          0% { opacity: 0; transform: translateY(40px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fade-in-up 1s cubic-bezier(0.4,0,0.2,1) both;
        }
        @keyframes slide-in {
          0% { opacity: 0; transform: translateX(-40px); }
          100% { opacity: 1; transform: translateX(0); }
        }
        .animate-slide-in {
          animation: slide-in 1.2s cubic-bezier(0.4,0,0.2,1) both;
        }
        @keyframes fade-in {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }
        .animate-fade-in {
          animation: fade-in 1.2s cubic-bezier(0.4,0,0.2,1) both;
        }
        @keyframes bounce-in {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }
        .animate-bounce-in {
          animation: bounce-in 1.1s cubic-bezier(0.4,0,0.2,1) both;
        }
        @keyframes wiggle {
          0%, 100% { transform: rotate(-3deg); }
          50% { transform: rotate(3deg); }
        }
        .animate-wiggle {
          animation: wiggle 0.4s ease-in-out;
        }
      `}</style>
    </div>
  )
}
