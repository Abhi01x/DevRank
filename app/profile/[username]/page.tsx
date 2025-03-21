import type React from "react"
import { Suspense } from "react"
import { notFound } from "next/navigation"
import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { Github, ArrowLeft, Star, GitFork, Calendar, Code, Users } from "lucide-react"
import ProfileHeader from "@/components/profile-header"
import DevScoreCard from "@/components/dev-score-card"
import RepositoriesList from "@/components/repositories-list"
import ContributionGraph from "@/components/contribution-graph"
import LanguageChart from "@/components/language-chart"
import ImprovementTips from "@/components/improvement-tips"
import { fetchGitHubProfile } from "@/lib/github"

export async function generateMetadata({ params }: { params: { username: string } }): Promise<Metadata> {
  return {
    title: `${params.username}'s GitHub Profile Analysis | DevRank`,
    description: `Analyze ${params.username}'s GitHub profile, repositories, and contributions with DevRank.`,
  }
}

export default async function ProfilePage({ params }: { params: { username: string } }) {
  // In a real app, we would fetch this data from the GitHub API
  // For now, we'll use mock data
  const profile = await fetchGitHubProfile(params.username)

  if (!profile) {
    notFound()
  }

  return (
    <div className="min-h-screen">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2">
            <Github className="h-6 w-6" />
            <h1 className="text-xl font-bold">DevRank</h1>
          </Link>
          <Link href="/analyze">
            <Button variant="outline" size="sm" className="flex items-center gap-1">
              <ArrowLeft className="h-4 w-4" />
              New Analysis
            </Button>
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Suspense fallback={<ProfileHeaderSkeleton />}>
          <ProfileHeader profile={profile} />
        </Suspense>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
          <div className="lg:col-span-1">
            <Suspense fallback={<DevScoreSkeleton />}>
              <DevScoreCard profile={profile} />
            </Suspense>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="text-lg">Profile Stats</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <StatItem
                    icon={<Star className="h-4 w-4 text-yellow-500" />}
                    label="Total Stars"
                    value={profile.totalStars}
                  />
                  <StatItem icon={<GitFork className="h-4 w-4" />} label="Total Forks" value={profile.totalForks} />
                  <StatItem
                    icon={<Code className="h-4 w-4 text-blue-500" />}
                    label="Repositories"
                    value={profile.repositories.length}
                  />
                  <StatItem
                    icon={<Users className="h-4 w-4 text-green-500" />}
                    label="Followers"
                    value={profile.followers}
                  />
                  <StatItem
                    icon={<Calendar className="h-4 w-4 text-purple-500" />}
                    label="Joined"
                    value={profile.joinedAt}
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="text-lg">Top Languages</CardTitle>
              </CardHeader>
              <CardContent>
                <Suspense fallback={<LanguageChartSkeleton />}>
                  <LanguageChart languages={profile.languages} />
                </Suspense>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-2">
            <Tabs defaultValue="overview">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="repositories">Repositories</TabsTrigger>
                <TabsTrigger value="contributions">Contributions</TabsTrigger>
                <TabsTrigger value="improvements">Improvements</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Contribution Activity</CardTitle>
                    <CardDescription>Your GitHub contribution activity over the past year</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Suspense fallback={<ContributionGraphSkeleton />}>
                      <ContributionGraph contributions={profile.contributions} />
                    </Suspense>
                  </CardContent>
                </Card>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Top Repositories</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {profile.repositories.slice(0, 3).map((repo) => (
                          <div key={repo.id} className="border-b pb-4 last:border-0 last:pb-0">
                            <div className="flex justify-between items-start">
                              <div>
                                <h3 className="font-medium">{repo.name}</h3>
                                <p className="text-sm text-muted-foreground line-clamp-2 mt-1">{repo.description}</p>
                              </div>
                              <Badge variant="outline" className="flex items-center gap-1">
                                <Star className="h-3 w-3" /> {repo.stars}
                              </Badge>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Achievement Badges</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 gap-4">
                        {profile.achievements.map((achievement) => (
                          <div
                            key={achievement.id}
                            className="flex flex-col items-center text-center p-3 border rounded-lg"
                          >
                            <div className="text-2xl mb-2">{achievement.icon}</div>
                            <h4 className="font-medium text-sm">{achievement.name}</h4>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="repositories" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Repositories</CardTitle>
                    <CardDescription>All public repositories created or contributed to</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Suspense fallback={<RepositoriesListSkeleton />}>
                      <RepositoriesList repositories={profile.repositories} />
                    </Suspense>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="contributions" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Contribution Activity</CardTitle>
                    <CardDescription>Your GitHub contribution activity over the past year</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Suspense fallback={<ContributionGraphSkeleton />}>
                      <ContributionGraph contributions={profile.contributions} />
                    </Suspense>

                    <div className="mt-8">
                      <h3 className="text-lg font-medium mb-4">Contribution Breakdown</h3>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <StatCard label="Commits" value={profile.stats.commits} />
                        <StatCard label="Pull Requests" value={profile.stats.pullRequests} />
                        <StatCard label="Issues" value={profile.stats.issues} />
                        <StatCard label="Code Reviews" value={profile.stats.codeReviews} />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="improvements" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Improvement Recommendations</CardTitle>
                    <CardDescription>Personalized tips to enhance your GitHub profile</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Suspense fallback={<ImprovementTipsSkeleton />}>
                      <ImprovementTips profile={profile} />
                    </Suspense>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  )
}

function StatItem({ icon, label, value }: { icon: React.ReactNode; label: string; value: number | string }) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        {icon}
        <span className="text-sm text-muted-foreground">{label}</span>
      </div>
      <span className="font-medium">{value}</span>
    </div>
  )
}

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="bg-muted p-4 rounded-lg text-center">
      <div className="text-2xl font-bold">{value}</div>
      <div className="text-sm text-muted-foreground">{label}</div>
    </div>
  )
}

function ProfileHeaderSkeleton() {
  return (
    <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
      <Skeleton className="h-24 w-24 rounded-full" />
      <div className="flex-1 space-y-2 text-center md:text-left">
        <Skeleton className="h-8 w-48 mx-auto md:mx-0" />
        <Skeleton className="h-4 w-32 mx-auto md:mx-0" />
        <Skeleton className="h-4 w-64 mx-auto md:mx-0" />
      </div>
    </div>
  )
}

function DevScoreSkeleton() {
  return (
    <Card>
      <CardHeader>
        <Skeleton className="h-6 w-24" />
      </CardHeader>
      <CardContent className="flex flex-col items-center">
        <Skeleton className="h-32 w-32 rounded-full" />
        <Skeleton className="h-8 w-16 mt-4" />
        <div className="w-full mt-4 space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>
      </CardContent>
    </Card>
  )
}

function LanguageChartSkeleton() {
  return <Skeleton className="h-48 w-full" />
}

function ContributionGraphSkeleton() {
  return <Skeleton className="h-48 w-full" />
}

function RepositoriesListSkeleton() {
  return (
    <div className="space-y-4">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="flex justify-between items-start pb-4 border-b last:border-0">
          <div className="space-y-2">
            <Skeleton className="h-5 w-48" />
            <Skeleton className="h-4 w-64" />
          </div>
          <div className="flex gap-2">
            <Skeleton className="h-8 w-16" />
            <Skeleton className="h-8 w-16" />
          </div>
        </div>
      ))}
    </div>
  )
}

function ImprovementTipsSkeleton() {
  return (
    <div className="space-y-4">
      {[1, 2, 3].map((i) => (
        <div key={i} className="p-4 border rounded-lg">
          <Skeleton className="h-6 w-48 mb-2" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>
      ))}
    </div>
  )
}

