import { NextResponse } from "next/server"

// This API route is used to check if the GitHub API token is set
export async function GET() {
  const token = process.env.GITHUB_API_TOKEN

  return NextResponse.json({
    hasToken: !!token,
    // Don't return the actual token for security reasons
  })
}

