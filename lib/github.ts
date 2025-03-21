import type { GitHubProfile, Repository, Language } from "./types"

// Function to fetch GitHub profile data using the GitHub API
export async function fetchGitHubProfile(username: string): Promise<GitHubProfile | null> {
  try {
    // Get the GitHub API token from environment variables
    const token = process.env.GITHUB_API_TOKEN

    // Headers for GitHub API requests
    const headers: HeadersInit = {
      Accept: "application/vnd.github.v3+json",
    }

    // Add authorization header if token exists
    if (token) {
      headers["Authorization"] = `token ${token}`
    }

    // Fetch basic user data
    const userResponse = await fetch(`https://api.github.com/users/${username}`, { headers })

    if (!userResponse.ok) {
      if (userResponse.status === 404) {
        return null // User not found
      }
      throw new Error(`GitHub API error: ${userResponse.statusText}`)
    }

    const userData = await userResponse.json()

    // Fetch repositories
    const reposResponse = await fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=updated`, {
      headers,
    })
    const reposData = await reposResponse.json()

    // Process repositories data
    const repositories: Repository[] = reposData.map((repo: any) => ({
      id: repo.id.toString(),
      name: repo.name,
      description: repo.description,
      url: repo.html_url,
      language: repo.language,
      stars: repo.stargazers_count,
      forks: repo.forks_count,
      watchers: repo.watchers_count,
      issues: repo.open_issues_count,
      createdAt: repo.created_at,
      updatedAt: repo.updated_at,
      isArchived: repo.archived,
      isFork: repo.fork,
    }))

    // Calculate total stars and forks
    const totalStars = repositories.reduce((sum, repo) => sum + repo.stars, 0)
    const totalForks = repositories.reduce((sum, repo) => sum + repo.forks, 0)

    // Calculate language distribution
    const languageMap = new Map<string, number>()
    repositories.forEach((repo) => {
      if (repo.language) {
        const current = languageMap.get(repo.language) || 0
        languageMap.set(repo.language, current + 1)
      }
    })

    const totalReposWithLanguage = repositories.filter((repo) => repo.language).length
    const languages: Language[] = Array.from(languageMap.entries())
      .map(([name, count]) => ({
        name,
        percentage: (count / totalReposWithLanguage) * 100,
        color: getLanguageColor(name),
      }))
      .sort((a, b) => b.percentage - a.percentage)

    // Generate mock contribution data (in a real app, you would fetch this from the GitHub API)
    const contributions = generateMockContributions()

    // Calculate Dev Score based on various metrics
    const repositoryQuality = calculateRepositoryQuality(repositories)
    const contributionActivity = calculateContributionActivity(contributions)
    const communityEngagement = calculateCommunityEngagement(repositories)
    const profileCompleteness = calculateProfileCompleteness(userData)

    const devScore = Math.round(
      repositoryQuality * 0.4 + contributionActivity * 0.3 + communityEngagement * 0.2 + profileCompleteness * 0.1,
    )

    // Generate improvement tips based on the analysis
    const improvementTips = generateImprovementTips(userData, repositories, devScore)

    // Format dates
    const joinedAt = new Date(userData.created_at).toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    })

    // Return the complete profile data
    return {
      username: userData.login,
      name: userData.name || userData.login,
      avatarUrl: userData.avatar_url,
      bio: userData.bio,
      company: userData.company,
      location: userData.location,
      blog: userData.blog,
      email: userData.email,
      hireable: userData.hireable || false,
      twitterUsername: userData.twitter_username,
      followers: userData.followers,
      following: userData.following,
      publicRepos: userData.public_repos,
      publicGists: userData.public_gists,
      joinedAt,
      updatedAt: userData.updated_at,
      totalStars,
      totalForks,
      repositories,
      languages,
      contributions,
      achievements: generateAchievements(repositories, userData),
      devScore,
      scores: {
        repositoryQuality,
        contributionActivity,
        communityEngagement,
        profileCompleteness,
      },
      stats: {
        commits: Math.round(contributions.reduce((sum, c) => sum + c.count, 0)),
        pullRequests: Math.round(repositories.length * 2.5),
        issues: Math.round(repositories.reduce((sum, repo) => sum + repo.issues, 0)),
        codeReviews: Math.round(repositories.length * 1.8),
      },
      improvementTips,
    }
  } catch (error) {
    console.error("Error fetching GitHub profile:", error)
    return null
  }
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

// Generate mock contribution data
function generateMockContributions() {
  return Array.from({ length: 364 }, (_, i) => {
    const date = new Date()
    date.setDate(date.getDate() - 364 + i)

    const dayOfWeek = date.getDay()
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6

    const maxCount = isWeekend ? 5 : 10
    const randomFactor = Math.random()

    const count = randomFactor < 0.3 ? 0 : Math.floor(randomFactor * maxCount)

    return {
      date: date.toISOString().split("T")[0],
      count,
    }
  })
}

// Calculate repository quality score
function calculateRepositoryQuality(repositories: Repository[]): number {
  if (repositories.length === 0) return 50

  const totalStars = repositories.reduce((sum, repo) => sum + repo.stars, 0)
  const totalForks = repositories.reduce((sum, repo) => sum + repo.forks, 0)
  const avgStars = totalStars / repositories.length
  const avgForks = totalForks / repositories.length

  // Calculate score based on stars and forks (simplified algorithm)
  let score = 50

  if (avgStars > 100) score += 25
  else if (avgStars > 50) score += 20
  else if (avgStars > 10) score += 15
  else if (avgStars > 5) score += 10
  else if (avgStars > 1) score += 5

  if (avgForks > 20) score += 25
  else if (avgForks > 10) score += 20
  else if (avgForks > 5) score += 15
  else if (avgForks > 1) score += 10
  else if (avgForks > 0) score += 5

  return Math.min(100, score)
}

// Calculate contribution activity score
function calculateContributionActivity(contributions: { count: number }[]): number {
  const totalContributions = contributions.reduce((sum, c) => sum + c.count, 0)
  const daysWithContributions = contributions.filter((c) => c.count > 0).length
  const contributionRate = daysWithContributions / contributions.length

  // Calculate score based on total contributions and consistency
  let score = 50

  if (totalContributions > 1000) score += 25
  else if (totalContributions > 500) score += 20
  else if (totalContributions > 200) score += 15
  else if (totalContributions > 100) score += 10
  else if (totalContributions > 50) score += 5

  if (contributionRate > 0.8) score += 25
  else if (contributionRate > 0.6) score += 20
  else if (contributionRate > 0.4) score += 15
  else if (contributionRate > 0.2) score += 10
  else if (contributionRate > 0.1) score += 5

  return Math.min(100, score)
}

// Calculate community engagement score
function calculateCommunityEngagement(repositories: Repository[]): number {
  if (repositories.length === 0) return 50

  const totalIssues = repositories.reduce((sum, repo) => sum + repo.issues, 0)
  const avgIssues = totalIssues / repositories.length

  // Calculate score based on issues (simplified algorithm)
  let score = 50

  if (avgIssues > 10) score += 25
  else if (avgIssues > 5) score += 20
  else if (avgIssues > 2) score += 15
  else if (avgIssues > 1) score += 10
  else if (avgIssues > 0) score += 5

  // Add points for non-fork repositories
  const nonForkRatio = repositories.filter((repo) => !repo.isFork).length / repositories.length

  if (nonForkRatio > 0.8) score += 25
  else if (nonForkRatio > 0.6) score += 20
  else if (nonForkRatio > 0.4) score += 15
  else if (nonForkRatio > 0.2) score += 10
  else score += 5

  return Math.min(100, score)
}

// Calculate profile completeness score
function calculateProfileCompleteness(userData: any): number {
  let score = 50

  // Add points for each completed profile field
  if (userData.name) score += 10
  if (userData.bio) score += 10
  if (userData.location) score += 5
  if (userData.company) score += 5
  if (userData.blog) score += 5
  if (userData.twitter_username) score += 5
  if (userData.email) score += 10

  return Math.min(100, score)
}

// Generate achievements based on profile data
function generateAchievements(repositories: Repository[], userData: any) {
  const achievements = []

  // Arctic Code Vault Contributor (placeholder - would need actual API data)
  achievements.push({
    id: "1",
    name: "Arctic Code Vault Contributor",
    description: "Contributed code to the 2020 GitHub Archive Program",
    icon: "🏆",
  })

  // Pull Shark - if they have enough repositories
  if (repositories.length >= 5) {
    achievements.push({
      id: "2",
      name: "Pull Shark",
      description: "Had multiple pull requests merged",
      icon: "🦈",
    })
  }

  // Starstruck - if any repository has 100+ stars
  if (repositories.some((repo) => repo.stars >= 100)) {
    achievements.push({
      id: "3",
      name: "Starstruck",
      description: "Created a repository that has 100+ stars",
      icon: "🌟",
    })
  }

  // Galaxy Brain (placeholder)
  achievements.push({
    id: "4",
    name: "Galaxy Brain",
    description: "Answered multiple questions with upvotes",
    icon: "🧠",
  })

  return achievements
}

// Generate improvement tips based on analysis
function generateImprovementTips(userData: any, repositories: Repository[], devScore: number) {
  const tips = []

  // Check for README files
  const reposWithoutDescription = repositories.filter((repo) => !repo.description).length
  if (reposWithoutDescription > 0) {
    tips.push({
      id: "tip1",
      title: "Add descriptions to repositories",
      description: `${reposWithoutDescription} repositories are missing descriptions.`,
      details:
        "Repository descriptions help others understand what your projects do at a glance. They improve discoverability and make your profile more professional.",
      priority: "High",
      actionItems: [
        "Add concise descriptions to repositories that are missing them",
        "Focus on explaining the purpose and key features",
        "Use keywords relevant to the technology or domain",
      ],
      resources: [{ title: "GitHub Guide: Best Practices", url: "https://guides.github.com/" }],
    })
  }

  // Check profile completeness
  if (!userData.bio) {
    tips.push({
      id: "tip2",
      title: "Add a bio to your profile",
      description: "Your GitHub profile is missing a bio.",
      details:
        "A bio helps others understand who you are, what you do, and what you're interested in. It makes your profile more approachable and professional.",
      priority: "Medium",
      actionItems: [
        "Add a concise bio that describes your skills and interests",
        "Mention your current role or status",
        "Include technologies you work with",
      ],
      resources: [
        {
          title: "GitHub Docs: Customizing your profile",
          url: "https://docs.github.com/en/account-and-profile/setting-up-and-managing-your-github-profile/customizing-your-profile",
        },
      ],
    })
  }

  // Suggest creating more original repositories if most are forks
  const forkRatio = repositories.filter((repo) => repo.isFork).length / repositories.length
  if (forkRatio > 0.7 && repositories.length > 3) {
    tips.push({
      id: "tip3",
      title: "Create more original repositories",
      description: "Most of your repositories are forks rather than original projects.",
      details:
        "While forking is great for contributing to open source, having original repositories showcases your ability to create and maintain projects.",
      priority: "Medium",
      actionItems: [
        "Start a new project based on your interests or needs",
        "Convert a fork into an original project with significant changes",
        "Document your original projects thoroughly",
      ],
      resources: [
        {
          title: "GitHub Guide: Creating a repository",
          url: "https://docs.github.com/en/repositories/creating-and-managing-repositories/creating-a-new-repository",
        },
      ],
    })
  }

  return tips
}

