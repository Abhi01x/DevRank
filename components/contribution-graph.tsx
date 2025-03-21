"use client"

import { useEffect, useRef } from "react"
import type { Contribution } from "@/lib/types"

interface ContributionGraphProps {
  contributions: Contribution[]
}

export default function ContributionGraph({ contributions }: ContributionGraphProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const dpr = window.devicePixelRatio || 1
    const rect = canvas.getBoundingClientRect()
    canvas.width = rect.width * dpr
    canvas.height = rect.height * dpr
    ctx.scale(dpr, dpr)

    // Clear canvas
    ctx.clearRect(0, 0, rect.width, rect.height)

    // Draw contribution graph
    const cellSize = 12
    const cellGap = 2
    const weeksCount = 52
    const daysCount = 7

    // Calculate max contribution for color scaling
    const maxContribution = Math.max(...contributions.map((c) => c.count))

    // Draw cells
    contributions.forEach((contribution, index) => {
      const week = Math.floor(index / daysCount)
      const day = index % daysCount

      if (week < weeksCount) {
        const x = week * (cellSize + cellGap)
        const y = day * (cellSize + cellGap)

        // Calculate color intensity based on contribution count
        const intensity = contribution.count / maxContribution
        const color = getContributionColor(intensity)

        ctx.fillStyle = color
        ctx.fillRect(x, y, cellSize, cellSize)
      }
    })

    // Draw month labels
    ctx.fillStyle = "#888"
    ctx.font = "10px sans-serif"
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    const monthPositions = [0, 4, 8, 13, 17, 21, 26, 30, 35, 39, 43, 48]

    monthPositions.forEach((pos, i) => {
      const x = pos * (cellSize + cellGap)
      const y = daysCount * (cellSize + cellGap) + 10
      ctx.fillText(months[i], x, y)
    })

    // Draw day labels
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
    days.forEach((day, i) => {
      if (i % 2 === 0) {
        // Only show every other day to save space
        const x = -30
        const y = i * (cellSize + cellGap) + 10
        ctx.fillText(day, x, y)
      }
    })
  }, [contributions])

  return (
    <div className="overflow-x-auto pb-4">
      <div className="min-w-[800px] pl-8 pt-2">
        <canvas
          ref={canvasRef}
          style={{
            width: "100%",
            height: "120px",
          }}
        />
      </div>
      <div className="flex items-center justify-end gap-2 mt-4">
        <span className="text-xs text-muted-foreground">Less</span>
        {[0.1, 0.3, 0.5, 0.7, 0.9].map((intensity, i) => (
          <div key={i} className="w-3 h-3" style={{ backgroundColor: getContributionColor(intensity) }} />
        ))}
        <span className="text-xs text-muted-foreground">More</span>
      </div>
    </div>
  )
}

function getContributionColor(intensity: number): string {
  // Use a green color scale similar to GitHub
  const colors = [
    "#ebedf0", // No contributions
    "#9be9a8", // Level 1
    "#40c463", // Level 2
    "#30a14e", // Level 3
    "#216e39", // Level 4
  ]

  if (intensity === 0) return colors[0]
  if (intensity < 0.25) return colors[1]
  if (intensity < 0.5) return colors[2]
  if (intensity < 0.75) return colors[3]
  return colors[4]
}

