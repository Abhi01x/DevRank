"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Star, GitFork, Eye, Search, Code, Filter } from "lucide-react"
import type { Repository } from "@/lib/types"
import { useTheme } from "next-themes"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

interface RepositoriesListProps {
  repositories: Repository[]
}

export default function RepositoriesList({ repositories }: RepositoriesListProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("stars")
  const [ignoreTskWork, setIgnoreTskWork] = useState(false)
  const { theme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // After mounting, we can safely show the UI that depends on the theme
  useEffect(() => {
    setMounted(true)
  }, [])

  const isDarkMode = mounted && (theme === "dark" || resolvedTheme === "dark")

  // Filter repositories based on search query and tsk filter (if enabled in dark mode)
  const filteredRepos = repositories.filter((repo) => {
    // First apply the search filter
    const matchesSearch =
      repo.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (repo.description && repo.description.toLowerCase().includes(searchQuery.toLowerCase()))

    // Then apply the tsk filter if in dark mode and the option is enabled
    if (isDarkMode && ignoreTskWork) {
      return matchesSearch && !repo.name.toLowerCase().includes("tsk")
    }

    return matchesSearch
  })

  // Sort repositories based on selected sort option
  const sortedRepos = [...filteredRepos].sort((a, b) => {
    switch (sortBy) {
      case "stars":
        return b.stars - a.stars
      case "forks":
        return b.forks - a.forks
      case "updated":
        return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
      case "name":
        return a.name.localeCompare(b.name)
      default:
        return 0
    }
  })

  return (
    <div>
      <div className="flex flex-col gap-4 mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              type="text"
              placeholder="Search repositories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="w-full sm:w-48">
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger>
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="stars">Most Stars</SelectItem>
                <SelectItem value="forks">Most Forks</SelectItem>
                <SelectItem value="updated">Recently Updated</SelectItem>
                <SelectItem value="name">Name</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Dark mode specific filter option - only show when mounted to avoid hydration mismatch */}
        {mounted && isDarkMode && (
          <div className="flex items-center space-x-2 bg-secondary/50 p-2 rounded-md">
            <Switch id="ignore-tsk" checked={ignoreTskWork} onCheckedChange={setIgnoreTskWork} />
            <Label htmlFor="ignore-tsk" className="flex items-center gap-2 cursor-pointer">
              <Filter className="h-4 w-4" />
              Ignore repositories with "tsk" in the name
            </Label>
          </div>
        )}
      </div>

      {sortedRepos.length === 0 ? (
        <div className="text-center py-8">
          <Code className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium mb-1">No repositories found</h3>
          <p className="text-muted-foreground">Try adjusting your search query or filters</p>
        </div>
      ) : (
        <div className="space-y-6">
          {sortedRepos.map((repo) => (
            <div key={repo.id} className="border-b pb-6 last:border-0">
              <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
                <div>
                  <h3 className="font-medium text-lg">{repo.name}</h3>
                  {repo.description && <p className="text-muted-foreground mt-1 mb-2">{repo.description}</p>}
                  <div className="flex flex-wrap gap-2 mt-2">
                    {repo.language && (
                      <Badge variant="outline" className="flex items-center gap-1">
                        <span
                          className="h-2 w-2 rounded-full"
                          style={{ backgroundColor: getLanguageColor(repo.language) }}
                        />
                        {repo.language}
                      </Badge>
                    )}
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Star className="h-3 w-3" /> {repo.stars}
                    </div>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <GitFork className="h-3 w-3" /> {repo.forks}
                    </div>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Eye className="h-3 w-3" /> {repo.watchers}
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <a href={repo.url} target="_blank" rel="noopener noreferrer">
                    <Button size="sm" variant="outline">
                      View Repo
                    </Button>
                  </a>
                  <Button size="sm" variant="ghost">
                    Analyze
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// Helper function to get a color for a language
function getLanguageColor(language: string): string {
  const colors: Record<string, string> = {
    JavaScript: "#f1e05a",
    TypeScript: "#3178c6",
    Python: "#3572A5",
    Java: "#b07219",
    Go: "#00ADD8",
    Rust: "#dea584",
    C: "#555555",
    "C++": "#f34b7d",
    "C#": "#178600",
    Ruby: "#701516",
    PHP: "#4F5D95",
    HTML: "#e34c26",
    CSS: "#563d7c",
    Shell: "#89e051",
  }

  return colors[language] || "#8257e5"
}

