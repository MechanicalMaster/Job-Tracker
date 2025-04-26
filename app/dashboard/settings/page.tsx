"use client"

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { useState, useRef } from "react"

export default function SettingsPage() {
  // Placeholder functions for actions - implement actual logic later
  const [userName, setUserName] = useState("User")
  const [userPhoto, setUserPhoto] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleExportData = () => {
    console.log("Exporting data...")
    // TODO: Implement data export logic
  }

  const handleManageSubscription = () => {
    console.log("Managing subscription...")
    // TODO: Implement subscription management logic (e.g., redirect to Stripe portal)
  }

  const handleDeleteAccount = () => {
    console.warn("Deleting account...")
    // TODO: Implement account deletion logic with confirmation
  }

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader()
      reader.onload = (ev) => {
        setUserPhoto(ev.target?.result as string)
      }
      reader.readAsDataURL(e.target.files[0])
    }
  }

  return (
    <div className="space-y-6">
      {/* User Profile Section */}
      <Card>
        <CardHeader>
          <CardTitle>Profile</CardTitle>
          <CardDescription>Update your name and photo.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="flex flex-col items-center gap-2">
              <div className="w-20 h-20 rounded-full border bg-muted flex items-center justify-center overflow-hidden">
                {userPhoto ? (
                  <img src={userPhoto} alt="User Avatar" className="object-cover w-full h-full" />
                ) : (
                  <span className="text-4xl">👤</span>
                )}
              </div>
              <Button variant="outline" size="sm" onClick={() => fileInputRef.current?.click()}>
                Change Photo
              </Button>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                ref={fileInputRef}
                onChange={handlePhotoChange}
              />
            </div>
            <div className="flex-1 w-full">
              <label className="block text-sm font-medium mb-1">Name</label>
              <Input
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="Enter your name"
                className="w-full max-w-xs"
              />
            </div>
          </div>
        </CardContent>
        <CardFooter className="border-t px-6 py-4">
          <Button>Save Changes</Button>
        </CardFooter>
      </Card>
      <Separator />

      <div>
        <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
        <p className="text-muted-foreground">
          Manage your account settings, data, and subscription.
        </p>
      </div>
      <Separator />

      <Card>
        <CardHeader>
          <CardTitle>Data Management</CardTitle>
          <CardDescription>Export your job application data.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Download a copy of all your job application data in CSV format.
          </p>
        </CardContent>
        <CardFooter className="border-t px-6 py-4">
          <Button onClick={handleExportData}>Export Data</Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Subscription</CardTitle>
          <CardDescription>
            Manage your subscription plan and billing details.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* TODO: Display current plan details here */}
          <p className="text-sm text-muted-foreground">
            You are currently on the Free plan.
          </p>
        </CardContent>
        <CardFooter className="border-t px-6 py-4">
          <Button onClick={handleManageSubscription}>Manage Subscription</Button>
        </CardFooter>
      </Card>

      <Card className="border-destructive">
        <CardHeader>
          <CardTitle>Delete Account</CardTitle>
          <CardDescription>
            Permanently delete your account and all associated data.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-destructive">
            This action cannot be undone. All your job applications, resumes,
            and profile information will be permanently lost.
          </p>
        </CardContent>
        <CardFooter className="border-t px-6 py-4">
          <Button variant="destructive" onClick={handleDeleteAccount}>
            Delete Account
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
