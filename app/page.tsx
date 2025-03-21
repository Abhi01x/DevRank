import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Github } from "lucide-react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Github className="h-6 w-6" />
            <h1 className="text-xl font-bold">DevRank</h1>
          </div>
          <nav>
            <ul className="flex gap-6">
              <li>
                <Link href="/" className="font-medium">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-foreground transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-muted-foreground hover:text-foreground transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        <section className="py-20 bg-gradient-to-b from-primary/10 to-background">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Analyze Your GitHub Profile</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
              Get insights into your GitHub activity, calculate your Dev Score, and discover ways to improve your
              profile.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <Link href="/analyze">
                <Button size="lg" className="px-8">
                  Analyze Your Profile
                </Button>
              </Link>
              <Link href="/examples">
                <Button size="lg" variant="outline" className="px-8">
                  View Examples
                </Button>
              </Link>
            </div>

            <div className="relative mx-auto max-w-4xl rounded-lg overflow-hidden shadow-xl border">
              <Image
                src="/placeholder.svg?height=600&width=1200"
                alt="DevRank Dashboard Preview"
                width={1200}
                height={600}
                className="w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent bottom-0 h-1/3"></div>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <FeatureCard
                title="Repository Analysis"
                description="Get detailed insights into your repositories, including stars, forks, and code quality metrics."
              />
              <FeatureCard
                title="Dev Score"
                description="Receive a comprehensive score based on your contributions, projects, and GitHub activity."
              />
              <FeatureCard
                title="Coding Streaks"
                description="Track your contribution streaks and consistency over time."
              />
              <FeatureCard
                title="Improvement Tips"
                description="Get personalized recommendations to enhance your GitHub profile and increase visibility."
              />
            </div>
          </div>
        </section>

        <section className="py-16 bg-muted/50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <StepCard
                number="1"
                title="Enter Your GitHub Username"
                description="Simply provide your GitHub username to begin the analysis process."
              />
              <StepCard
                number="2"
                title="Analyze Your Profile"
                description="Our algorithm examines your repositories, contributions, and activity patterns."
              />
              <StepCard
                number="3"
                title="Get Your Results"
                description="Receive your Dev Score, insights, and personalized improvement recommendations."
              />
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to See Your Dev Score?</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
              Discover how your GitHub profile ranks and get actionable insights to improve.
            </p>
            <Link href="/analyze">
              <Button size="lg" className="px-8">
                Analyze Your Profile Now
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <footer className="border-t py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <Github className="h-5 w-5" />
              <span className="font-semibold">DevRank</span>
            </div>
            <div className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} DevRank. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

function FeatureCard({ title, description }: { title: string; description: string }) {
  return (
    <Card>
      <CardContent className="pt-6">
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  )
}

function StepCard({ number, title, description }: { number: string; title: string; description: string }) {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-xl mb-4">
        {number}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  )
}

