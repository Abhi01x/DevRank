"use client"

import { useEffect, useRef } from "react"
import type { Language } from "@/lib/types"

interface LanguageChartProps {
  languages: Language[]
}

export default function LanguageChart({ languages }: LanguageChartProps) {
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

    // Calculate total percentage
    const total = languages.reduce((sum, lang) => sum + lang.percentage, 0)

    // Draw pie chart
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    const radius = Math.min(centerX, centerY) - 10

    let startAngle = 0
    languages.forEach((lang) => {
      const sliceAngle = (lang.percentage / total) * 2 * Math.PI

      ctx.beginPath()
      ctx.moveTo(centerX, centerY)
      ctx.arc(centerX, centerY, radius, startAngle, startAngle + sliceAngle)
      ctx.closePath()

      ctx.fillStyle = lang.color
      ctx.fill()

      startAngle += sliceAngle
    })

    // Draw white circle in the middle for donut chart
    ctx.beginPath()
    ctx.arc(centerX, centerY, radius * 0.6, 0, 2 * Math.PI)
    ctx.fillStyle = "white"
    ctx.fill()
  }, [languages])

  return (
    <div>
      <canvas
        ref={canvasRef}
        style={{
          width: "100%",
          height: "200px",
        }}
      />
      <div className="grid grid-cols-2 gap-2 mt-4">
        {languages.map((lang) => (
          <div key={lang.name} className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: lang.color }} />
            <span className="text-sm">{lang.name}</span>
            <span className="text-xs text-muted-foreground ml-auto">{lang.percentage.toFixed(1)}%</span>
          </div>
        ))}
      </div>
    </div>
  )
}

