export interface GitHubProfile {
  username: string
  name: string
  avatarUrl: string
  bio: string | null
  company: string | null
  location: string | null
  blog: string | null
  email: string | null
  hireable: boolean
  twitterUsername: string | null
  followers: number
  following: number
  publicRepos: number
  publicGists: number
  joinedAt: string
  updatedAt: string
  totalStars: number
  totalForks: number
  repositories: Repository[]
  languages: Language[]
  contributions: Contribution[]
  achievements: Achievement[]
  devScore: number
  scores: {
    repositoryQuality: number
    contributionActivity: number
    communityEngagement: number
    profileCompleteness: number
  }
  stats: {
    commits: number
    pullRequests: number
    issues: number
    codeReviews: number
  }
  improvementTips: ImprovementTip[]
}

export interface Repository {
  id: string
  name: string
  description: string | null
  url: string
  language: string | null
  stars: number
  forks: number
  watchers: number
  issues: number
  createdAt: string
  updatedAt: string
  isArchived: boolean
  isFork: boolean
}

export interface Language {
  name: string
  percentage: number
  color: string
}

export interface Contribution {
  date: string
  count: number
}

export interface Achievement {
  id: string
  name: string
  description: string
  icon: string
}

export interface ImprovementTip {
  id: string
  title: string
  description: string
  details: string
  priority: string
  actionItems?: string[]
  resources?: {
    title: string
    url: string
  }[]
}

