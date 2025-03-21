"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { GitHubProfile } from "@/lib/types"
import { CheckCircle2, AlertTriangle, Info, ArrowRight } from "lucide-react"

interface ImprovementTipsProps {
  profile: GitHubProfile
}

export default function ImprovementTips({ profile }: ImprovementTipsProps) {
  const [expandedTip, setExpandedTip] = useState<string | null>(null)

  const toggleTip = (id: string) => {
    if (expandedTip === id) {
      setExpandedTip(null)
    } else {
      setExpandedTip(id)
    }
  }

  return (
    <div className="space-y-4">
      {profile.improvementTips.map((tip) => (
        <Card key={tip.id} className={`border-l-4 ${getTipBorderColor(tip.priority)}`}>
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <div className="flex items-start gap-2">
                {getTipIcon(tip.priority)}
                <div>
                  <CardTitle className="text-base">{tip.title}</CardTitle>
                  <CardDescription>{tip.description}</CardDescription>
                </div>
              </div>
              <Badge variant={getTipBadgeVariant(tip.priority)}>{tip.priority}</Badge>
            </div>
          </CardHeader>
          {expandedTip === tip.id && (
            <CardContent>
              <div className="space-y-4">
                <div className="text-sm">{tip.details}</div>
                {tip.actionItems && (
                  <div>
                    <h4 className="text-sm font-medium mb-2">Action Items:</h4>
                    <ul className="list-disc pl-5 text-sm space-y-1">
                      {tip.actionItems.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {tip.resources && (
                  <div>
                    <h4 className="text-sm font-medium mb-2">Resources:</h4>
                    <ul className="list-disc pl-5 text-sm space-y-1">
                      {tip.resources.map((resource, index) => (
                        <li key={index}>
                          <a
                            href={resource.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:underline"
                          >
                            {resource.title}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </CardContent>
          )}
          <div className="px-6 pb-4">
            <Button variant="ghost" size="sm" onClick={() => toggleTip(tip.id)} className="text-xs">
              {expandedTip === tip.id ? "Show Less" : "Show More"}
              <ArrowRight
                className={`h-3 w-3 ml-1 transition-transform ${expandedTip === tip.id ? "rotate-90" : ""}`}
              />
            </Button>
          </div>
        </Card>
      ))}
    </div>
  )
}

function getTipBorderColor(priority: string): string {
  switch (priority) {
    case "High":
      return "border-red-500"
    case "Medium":
      return "border-yellow-500"
    case "Low":
      return "border-blue-500"
    default:
      return "border-gray-500"
  }
}

function getTipBadgeVariant(priority: string): "destructive" | "default" | "secondary" | "outline" {
  switch (priority) {
    case "High":
      return "destructive"
    case "Medium":
      return "default"
    case "Low":
      return "secondary"
    default:
      return "outline"
  }
}

function getTipIcon(priority: string) {
  switch (priority) {
    case "High":
      return <AlertTriangle className="h-5 w-5 text-red-500 mt-0.5" />
    case "Medium":
      return <Info className="h-5 w-5 text-yellow-500 mt-0.5" />
    case "Low":
      return <CheckCircle2 className="h-5 w-5 text-blue-500 mt-0.5" />
    default:
      return null
  }
}

