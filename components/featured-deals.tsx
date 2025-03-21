import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Image from "next/image"

// Mock data for featured deals
const featuredDeals = [
  {
    id: "1",
    name: "Sony WH-1000XM5 Wireless Headphones",
    image: "/placeholder.svg?height=150&width=150",
    currentPrice: 299,
    originalPrice: 399,
    discount: 25,
    store: "Amazon",
    link: "#",
  },
  {
    id: "2",
    name: 'Samsung 55" QLED 4K Smart TV',
    image: "/placeholder.svg?height=150&width=150",
    currentPrice: 799,
    originalPrice: 999,
    discount: 20,
    store: "Best Buy",
    link: "#",
  },
  {
    id: "3",
    name: "Apple iPad Air (5th Generation)",
    image: "/placeholder.svg?height=150&width=150",
    currentPrice: 499,
    originalPrice: 599,
    discount: 17,
    store: "Walmart",
    link: "#",
  },
  {
    id: "4",
    name: "Dyson V12 Detect Slim Cordless Vacuum",
    image: "/placeholder.svg?height=150&width=150",
    currentPrice: 549,
    originalPrice: 649,
    discount: 15,
    store: "Target",
    link: "#",
  },
]

export default function FeaturedDeals() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Today's Best Deals</h2>
        <Button variant="ghost" className="flex items-center gap-1">
          View all <ArrowRight className="h-4 w-4" />
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {featuredDeals.map((deal) => (
          <Card key={deal.id} className="overflow-hidden">
            <CardHeader className="p-4 pb-0">
              <div className="flex justify-center">
                <Image
                  src={deal.image || "/placeholder.svg"}
                  alt={deal.name}
                  width={150}
                  height={150}
                  className="object-contain h-32"
                />
              </div>
            </CardHeader>
            <CardContent className="p-4">
              <Badge className="mb-2 bg-red-500">{deal.discount}% OFF</Badge>
              <h3 className="font-medium line-clamp-2 h-12">{deal.name}</h3>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="text-lg font-bold">${deal.currentPrice}</span>
                <span className="text-sm text-muted-foreground line-through">${deal.originalPrice}</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">on {deal.store}</p>
            </CardContent>
            <CardFooter className="p-4 pt-0">
              <Button className="w-full" size="sm">
                View Deal
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

