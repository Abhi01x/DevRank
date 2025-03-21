"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Github, Search, User, Star, GitFork, Code, AlertCircle } from "lucide-react"
import Link from "next/link"
import GitHubTokenSetup from "@/components/github-token-setup"

export default function AnalyzePage() {
  const [username, setUsername] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!username.trim()) {
      setError("Please enter a GitHub username")
      return
    }

    setError("")
    setIsLoading(true)

    // In a real app, we would validate the username here
    // For now, we'll just simulate a delay and redirect
    setTimeout(() => {
      setIsLoading(false)
      router.push(`/profile/${username}`)
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/10 to-background">
      <header className="border-b bg-background">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2">
            <Github className="h-6 w-6" />
            <h1 className="text-xl font-bold">DevRank</h1>
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto mb-12">
          <GitHubTokenSetup />
        </div>

        <div className="max-w-md mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Analyze GitHub Profile</CardTitle>
              <CardDescription>
                Enter a GitHub username to analyze their profile and calculate their Dev Score.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
                      <Input
                        type="text"
                        placeholder="GitHub username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                    {error && (
                      <div className="text-sm text-destructive flex items-center gap-1">
                        <AlertCircle className="h-4 w-4" />
                        {error}
                      </div>
                    )}
                  </div>
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? (
                      <span className="flex items-center gap-2">
                        <span className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin"></span>
                        Analyzing...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <Search className="h-4 w-4" />
                        Analyze Profile
                      </span>
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <div className="text-sm text-muted-foreground">Try these popular profiles:</div>
              <div className="flex flex-wrap gap-2">
                <Button variant="outline" size="sm" onClick={() => setUsername("facebook")}>
                  facebook
                </Button>
                <Button variant="outline" size="sm" onClick={() => setUsername("google")}>
                  google
                </Button>
                <Button variant="outline" size="sm" onClick={() => setUsername("microsoft")}>
                  microsoft
                </Button>
                <Button variant="outline" size="sm" onClick={() => setUsername("vercel")}>
                  vercel
                </Button>
              </div>
            </CardFooter>
          </Card>
        </div>

        <div className="mt-16 max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-6 text-center">What We Analyze</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <AnalysisCard
              icon={<Star className="h-8 w-8 text-yellow-500" />}
              title="Repository Quality"
              description="Stars, forks, watchers, and overall code quality metrics."
            />
            <AnalysisCard
              icon={<Code className="h-8 w-8 text-blue-500" />}
              title="Contribution Activity"
              description="Frequency, consistency, and impact of your contributions."
            />
            <AnalysisCard
              icon={<GitFork className="h-8 w-8 text-green-500" />}
              title="Community Engagement"
              description="Pull requests, issues, and collaboration with others."
            />
          </div>
        </div>
      </main>
    </div>
  )
}

function AnalysisCard({ icon, title, description }) {
  return (
    <div className="flex flex-col items-center text-center p-6 bg-card rounded-lg border shadow-sm">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  )
}

