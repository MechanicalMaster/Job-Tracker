import Link from "next/link"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { formatDate } from "@/lib/utils"
import { Briefcase, MapPin, Calendar } from "lucide-react"

interface JobCardProps {
  id: string
  title: string
  company: string
  location: string
  status: "applied" | "interview" | "offer" | "rejected"
  date: string
}

export function JobCard({ id, title, company, location, status, date }: JobCardProps) {
  const statusColors = {
    applied: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
    interview: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
    offer: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
    rejected: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
  }

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <div className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-semibold">{title}</h3>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <Briefcase className="h-3 w-3" />
                <span>{company}</span>
              </div>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <MapPin className="h-3 w-3" />
                <span>{location}</span>
              </div>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <Calendar className="h-3 w-3" />
                <span>{formatDate(date)}</span>
              </div>
            </div>
            <Badge className={statusColors[status]}>{status.charAt(0).toUpperCase() + status.slice(1)}</Badge>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between border-t bg-muted/50 p-3">
        <Link href={`/dashboard/jobs/${id}`}>
          <Button variant="ghost" size="sm">
            View Details
          </Button>
        </Link>
        <Link href={`/dashboard/jobs/${id}/customize`}>
          <Button variant="outline" size="sm">
            Customize
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}
