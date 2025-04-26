"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Upload, X, FileText } from "lucide-react"

export function FileUploader() {
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState(0)

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0])
    }
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0])
    }
  }

  const handleFile = (file: File) => {
    setFile(file)

    // Create a preview for image files
    if (file.type.startsWith("image/")) {
      const reader = new FileReader()
      reader.onload = () => {
        setPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    } else {
      setPreview(null)
    }

    // Simulate upload and OCR processing
    simulateUpload()
  }

  const simulateUpload = () => {
    setUploading(true)
    setProgress(0)

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setUploading(false)
          return 100
        }
        return prev + 10
      })
    }, 300)
  }

  const removeFile = () => {
    setFile(null)
    setPreview(null)
    setUploading(false)
    setProgress(0)
  }

  return (
    <div className="space-y-4">
      {!file ? (
        <div
          className="flex flex-col items-center justify-center rounded-lg border border-dashed p-12 text-center"
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
        >
          <div className="flex flex-col items-center justify-center space-y-2">
            <div className="rounded-full bg-muted p-2">
              <Upload className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-semibold">Upload Job Posting</h3>
            <p className="text-sm text-muted-foreground">Drag and drop a screenshot or PDF of the job posting</p>
            <p className="text-xs text-muted-foreground">Our AI will extract the job details automatically</p>
            <label htmlFor="file-upload">
              <Button
                variant="outline"
                className="mt-2"
                onClick={() => document.getElementById("file-upload")?.click()}
              >
                Select File
              </Button>
              <input id="file-upload" type="file" accept="image/*,.pdf" className="hidden" onChange={handleFileInput} />
            </label>
          </div>
        </div>
      ) : (
        <Card>
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-4">
                {preview ? (
                  <div className="relative h-16 w-16 overflow-hidden rounded-md border">
                    <img src={preview || "/placeholder.svg"} alt="Preview" className="h-full w-full object-cover" />
                  </div>
                ) : (
                  <div className="flex h-16 w-16 items-center justify-center rounded-md border bg-muted">
                    <FileText className="h-8 w-8 text-muted-foreground" />
                  </div>
                )}
                <div>
                  <p className="font-medium">{file.name}</p>
                  <p className="text-sm text-muted-foreground">{(file.size / 1024).toFixed(2)} KB</p>
                </div>
              </div>
              <Button variant="ghost" size="icon" onClick={removeFile}>
                <X className="h-4 w-4" />
              </Button>
            </div>

            {uploading && (
              <div className="mt-4 space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Processing...</span>
                  <span>{progress}%</span>
                </div>
                <Progress value={progress} />
              </div>
            )}

            {progress === 100 && !uploading && (
              <div className="mt-4">
                <p className="text-sm text-green-600">Processing complete! Job details extracted successfully.</p>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
