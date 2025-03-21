"use client"

import { useState, useEffect } from "react"
import { Lightbulb } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"

interface AIRecommendationProps {
  productId: string
}

export default function AIRecommendation({ productId }: AIRecommendationProps) {
  const [recommendation, setRecommendation] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate API call to get AI recommendation
    const fetchRecommendation = async () => {
      setLoading(true)
      try {
        // In a real app, this would be an API call using the AI SDK
        // const response = await fetch(`/api/recommendations/${productId}`);
        // const data = await response.json();
        // setRecommendation(data.recommendation);

        // Simulating API response delay
        await new Promise((resolve) => setTimeout(resolve, 1500))

        // Mock recommendation
        setRecommendation(
          "Based on historical price data, we recommend waiting for Black Friday sales in November when this product is likely to drop by 15-20%. The current price is slightly higher than the 6-month average.",
        )
      } catch (error) {
        console.error("Error fetching recommendation:", error)
        setRecommendation("Unable to generate recommendation at this time.")
      } finally {
        setLoading(false)
      }
    }

    fetchRecommendation()
  }, [productId])

  if (loading) {
    return (
      <div className="space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
      </div>
    )
  }

  return (
    <div className="flex items-start gap-2 text-sm">
      <Lightbulb className="h-5 w-5 text-yellow-500 flex-shrink-0 mt-0.5" />
      <p>{recommendation}</p>
    </div>
  )
}

