import { NextResponse } from "next/server"
import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

// Mock price history data - in a real app, this would come from a database
const priceHistoryData = {
  "1": [
    { date: "2023-09", price: 999 },
    { date: "2023-10", price: 999 },
    { date: "2023-11", price: 979 },
    { date: "2023-12", price: 949 },
    { date: "2024-01", price: 969 },
    { date: "2024-02", price: 989 },
  ],
}

export async function GET(request: Request, { params }: { params: { productId: string } }) {
  try {
    const productId = params.productId

    // Get price history for the product
    const priceHistory = priceHistoryData[productId as keyof typeof priceHistoryData] || []

    if (priceHistory.length === 0) {
      return NextResponse.json(
        { recommendation: "Not enough price history data to make a recommendation." },
        { status: 200 },
      )
    }

    // In a real application, we would use the AI SDK to generate a recommendation
    // based on the price history data
    const { text } = await generateText({
      model: openai("gpt-4o"),
      prompt: `
        You are a shopping assistant that helps users decide when to buy products.
        Based on the following price history for a product, provide a brief recommendation 
        on whether the user should buy now or wait for a better price.
        
        Price history: ${JSON.stringify(priceHistory)}
        
        Current month: March 2024
        
        Your recommendation should be concise (2-3 sentences) and include:
        1. Whether they should buy now or wait
        2. If waiting, when might be a better time to buy
        3. A brief explanation of your reasoning based on the price trends
      `,
    })

    return NextResponse.json({ recommendation: text }, { status: 200 })
  } catch (error) {
    console.error("Error generating recommendation:", error)
    return NextResponse.json({ error: "Failed to generate recommendation" }, { status: 500 })
  }
}

