"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { AlertCircle, CheckCircle, Github, Key } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function GitHubTokenSetup() {
  const [token, setToken] = useState("")
  const [hasToken, setHasToken] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  // Check if token is already set
  useEffect(() => {
    let isMounted = true

    const checkToken = async () => {
      try {
        const response = await fetch("/api/github-token")
        const data = await response.json()

        if (isMounted) {
          setHasToken(data.hasToken)
          setIsLoading(false)
        }
      } catch (err) {
        console.error("Error checking token:", err)
        if (isMounted) {
          setError("Failed to check if GitHub token is set")
          setIsLoading(false)
        }
      }
    }

    checkToken()

    // Cleanup function to prevent state updates on unmounted component
    return () => {
      isMounted = false
    }
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    setError("")
    setSuccess("")

    if (!token.trim()) {
      setError("Please enter a GitHub token")
      return
    }

    // In a real app, you would send the token to your backend to store it securely
    // For this demo, we'll just show a success message
    setSuccess(
      "GitHub token has been saved! In a real application, this would be stored securely in your environment variables.",
    )
    setHasToken(true)
  }

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Checking GitHub API Setup...</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center py-4">
            <div className="h-8 w-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (hasToken) {
    return (
      <Card className="border-green-500/20 bg-green-500/5">
        <CardHeader>
          <div className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-500" />
            <CardTitle>GitHub API Token Configured</CardTitle>
          </div>
          <CardDescription>Your GitHub API token is set up and ready to use.</CardDescription>
        </CardHeader>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Key className="h-5 w-5 text-primary" />
          <CardTitle>Set Up GitHub API Token</CardTitle>
        </div>
        <CardDescription>
          To analyze GitHub profiles, you need to provide a GitHub Personal Access Token.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {success && (
          <Alert className="mb-4 border-green-500/20 bg-green-500/5 text-green-500">
            <CheckCircle className="h-4 w-4" />
            <AlertTitle>Success</AlertTitle>
            <AlertDescription>{success}</AlertDescription>
          </Alert>
        )}

        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-medium mb-2">How to create a GitHub Personal Access Token:</h3>
            <ol className="list-decimal list-inside text-sm text-muted-foreground space-y-1">
              <li>Go to your GitHub Settings &gt; Developer settings &gt; Personal access tokens</li>
              <li>Click "Generate new token" (classic)</li>
              <li>Give it a name like "DevRank App"</li>
              <li>Select the "public_repo" and "read:user" scopes</li>
              <li>Click "Generate token" and copy the token</li>
            </ol>
          </div>

          <div className="space-y-2">
            <label htmlFor="github-token" className="text-sm font-medium">
              GitHub Personal Access Token
            </label>
            <Input
              id="github-token"
              type="password"
              placeholder="ghp_xxxxxxxxxxxxxxxxxxxx"
              value={token}
              onChange={(e) => setToken(e.target.value)}
            />
            <p className="text-xs text-muted-foreground">
              Your token is used only for API requests and is never stored on our servers.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full">
            <Button onClick={handleSubmit} className="flex items-center gap-2">
              <Key className="h-4 w-4" />
              Save Token
            </Button>
            <a
              href="https://github.com/settings/tokens"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto"
            >
              <Button variant="outline" className="w-full flex items-center gap-2">
                <Github className="h-4 w-4" />
                Go to GitHub Tokens
              </Button>
            </a>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

