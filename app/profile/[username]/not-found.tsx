import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Github, UserX, ArrowLeft } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2">
            <Github className="h-6 w-6" />
            <h1 className="text-xl font-bold">DevRank</h1>
          </Link>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center p-4">
        <div className="text-center max-w-md">
          <UserX className="h-16 w-16 mx-auto mb-6 text-muted-foreground" />
          <h1 className="text-3xl font-bold mb-2">Profile Not Found</h1>
          <p className="text-muted-foreground mb-6">
            We couldn't find the GitHub profile you're looking for. The username may be incorrect or the profile doesn't
            exist.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/analyze">
              <Button className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Try Another Username
              </Button>
            </Link>
            <Link href="/">
              <Button variant="outline">Go to Home</Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}

