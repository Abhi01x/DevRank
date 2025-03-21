"use client"

import { useState } from "react"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Trash2, Bell, BellOff } from "lucide-react"
import Image from "next/image"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

// Mock data for bookmarked products
const initialBookmarks = [
  {
    id: "1",
    name: "iPhone 15 Pro (128GB, Black)",
    image: "/placeholder.svg?height=80&width=80",
    currentPrice: 999,
    lowestPrice: 949,
    store: "Amazon",
    priceAlert: true,
    targetPrice: 950,
  },
  {
    id: "2",
    name: "Sony PlayStation 5 Slim Digital Edition",
    image: "/placeholder.svg?height=80&width=80",
    currentPrice: 449,
    lowestPrice: 399,
    store: "Best Buy",
    priceAlert: false,
    targetPrice: 400,
  },
  {
    id: "3",
    name: "Samsung Galaxy S24 Ultra",
    image: "/placeholder.svg?height=80&width=80",
    currentPrice: 1199,
    lowestPrice: 1099,
    store: "Samsung",
    priceAlert: true,
    targetPrice: 1000,
  },
]

export default function BookmarkedProducts() {
  const [bookmarks, setBookmarks] = useState(initialBookmarks)

  const removeBookmark = (id: string) => {
    setBookmarks(bookmarks.filter((bookmark) => bookmark.id !== id))
  }

  const togglePriceAlert = (id: string) => {
    setBookmarks(
      bookmarks.map((bookmark) => (bookmark.id === id ? { ...bookmark, priceAlert: !bookmark.priceAlert } : bookmark)),
    )
  }

  if (bookmarks.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl font-medium mb-2">No bookmarked products</h3>
        <p className="text-muted-foreground mb-6">Products you bookmark will appear here for easy tracking</p>
        <Button>Browse Products</Button>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {bookmarks.map((bookmark) => (
        <Card key={bookmark.id} className="overflow-hidden">
          <div className="flex flex-col sm:flex-row">
            <CardHeader className="p-4 sm:w-1/4">
              <div className="flex justify-center">
                <Image
                  src={bookmark.image || "/placeholder.svg"}
                  alt={bookmark.name}
                  width={80}
                  height={80}
                  className="object-contain"
                />
              </div>
            </CardHeader>
            <CardContent className="p-4 sm:w-2/4">
              <h3 className="font-medium">{bookmark.name}</h3>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="text-lg font-bold">${bookmark.currentPrice}</span>
                {bookmark.currentPrice > bookmark.lowestPrice && (
                  <span className="text-xs text-muted-foreground">Lowest: ${bookmark.lowestPrice}</span>
                )}
                {bookmark.currentPrice === bookmark.lowestPrice && (
                  <Badge variant="success" className="text-xs">
                    Lowest Price
                  </Badge>
                )}
              </div>
              <p className="text-xs text-muted-foreground mt-1">Best price on {bookmark.store}</p>
            </CardContent>
            <CardFooter className="p-4 sm:w-1/4 flex flex-col items-start gap-3">
              <div className="flex items-center space-x-2">
                <Switch
                  id={`price-alert-${bookmark.id}`}
                  checked={bookmark.priceAlert}
                  onCheckedChange={() => togglePriceAlert(bookmark.id)}
                />
                <Label htmlFor={`price-alert-${bookmark.id}`} className="flex items-center gap-1">
                  {bookmark.priceAlert ? (
                    <>
                      <Bell className="h-3 w-3" /> Alert at ${bookmark.targetPrice}
                    </>
                  ) : (
                    <>
                      <BellOff className="h-3 w-3" /> Price alert off
                    </>
                  )}
                </Label>
              </div>
              <div className="flex gap-2 mt-2">
                <Button size="sm">View Details</Button>
                <Button size="sm" variant="outline" onClick={() => removeBookmark(bookmark.id)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardFooter>
          </div>
        </Card>
      ))}
    </div>
  )
}

