"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { InfoIcon } from "lucide-react"
import type { GitHubProfile } from "@/lib/types"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

interface DevScoreCardProps {
  profile: GitHubProfile
}

export default function DevScoreCard({ profile }: DevScoreCardProps) {
  const [open, setOpen] = useState(false)

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Dev Score</CardTitle>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <InfoIcon className="h-4 w-4" />
                <span className="sr-only">About Dev Score</span>
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>About Dev Score</DialogTitle>
                <DialogDescription>Dev Score is calculated based on several factors including:</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 mt-4">
                <div>
                  <h4 className="font-medium">Repository Quality (40%)</h4>
                  <p className="text-sm text-muted-foreground">Stars, forks, and code quality metrics.</p>
                </div>
                <div>
                  <h4 className="font-medium">Contribution Activity (30%)</h4>
                  <p className="text-sm text-muted-foreground">Frequency and consistency of contributions.</p>
                </div>
                <div>
                  <h4 className="font-medium">Community Engagement (20%)</h4>
                  <p className="text-sm text-muted-foreground">Pull requests, issues, and collaboration.</p>
                </div>
                <div>
                  <h4 className="font-medium">Profile Completeness (10%)</h4>
                  <p className="text-sm text-muted-foreground">Bio, pinned repositories, and README.</p>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col items-center">
        <div className="relative">
          <svg className="w-32 h-32" viewBox="0 0 100 100">
            <circle className="text-muted stroke-current" strokeWidth="10" fill="transparent" r="40" cx="50" cy="50" />
            <circle
              className="text-primary stroke-current"
              strokeWidth="10"
              strokeLinecap="round"
              fill="transparent"
              r="40"
              cx="50"
              cy="50"
              strokeDasharray={`${(2 * Math.PI * 40 * profile.devScore) / 100} ${2 * Math.PI * 40}`}
              strokeDashoffset={2 * Math.PI * 10}
              transform="rotate(-90 50 50)"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-3xl font-bold">{profile.devScore}</div>
          </div>
        </div>

        <div className="mt-6 w-full space-y-2">
          <div className="flex justify-between text-sm">
            <span>Repository Quality</span>
            <span className="font-medium">{profile.scores.repositoryQuality}/100</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div className="bg-primary rounded-full h-2" style={{ width: `${profile.scores.repositoryQuality}%` }} />
          </div>

          <div className="flex justify-between text-sm">
            <span>Contribution Activity</span>
            <span className="font-medium">{profile.scores.contributionActivity}/100</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div className="bg-primary rounded-full h-2" style={{ width: `${profile.scores.contributionActivity}%` }} />
          </div>

          <div className="flex justify-between text-sm">
            <span>Community Engagement</span>
            <span className="font-medium">{profile.scores.communityEngagement}/100</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div className="bg-primary rounded-full h-2" style={{ width: `${profile.scores.communityEngagement}%` }} />
          </div>

          <div className="flex justify-between text-sm">
            <span>Profile Completeness</span>
            <span className="font-medium">{profile.scores.profileCompleteness}/100</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div className="bg-primary rounded-full h-2" style={{ width: `${profile.scores.profileCompleteness}%` }} />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

