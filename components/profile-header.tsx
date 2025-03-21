import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, Link2, Calendar, ExternalLink } from "lucide-react"
import type { GitHubProfile } from "@/lib/types"

interface ProfileHeaderProps {
  profile: GitHubProfile
}

export default function ProfileHeader({ profile }: ProfileHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
      <Image
        src={profile.avatarUrl || "/placeholder.svg"}
        alt={`${profile.name}'s avatar`}
        width={96}
        height={96}
        className="rounded-full border-4 border-background shadow-md"
      />

      <div className="flex-1 space-y-2 text-center md:text-left">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold">{profile.name}</h1>
          <div className="text-muted-foreground">@{profile.username}</div>
        </div>

        {profile.bio && <p className="text-sm max-w-2xl">{profile.bio}</p>}

        <div className="flex flex-wrap gap-3 justify-center md:justify-start">
          {profile.location && (
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <MapPin className="h-3 w-3" /> {profile.location}
            </div>
          )}
          {profile.blog && (
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Link2 className="h-3 w-3" /> {profile.blog}
            </div>
          )}
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <Calendar className="h-3 w-3" /> Joined {profile.joinedAt}
          </div>
        </div>

        <div className="flex flex-wrap gap-2 justify-center md:justify-start mt-4">
          <a href={`https://github.com/${profile.username}`} target="_blank" rel="noopener noreferrer">
            <Button size="sm" variant="outline" className="flex items-center gap-1">
              View on GitHub <ExternalLink className="h-3 w-3 ml-1" />
            </Button>
          </a>
          {profile.company && <Badge variant="secondary">{profile.company}</Badge>}
          {profile.hireable && (
            <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">
              Available for hire
            </Badge>
          )}
        </div>
      </div>
    </div>
  )
}

