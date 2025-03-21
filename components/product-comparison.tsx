import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ShoppingCart, Heart, Bell, ArrowUpDown } from "lucide-react"
import Image from "next/image"
import PriceHistoryChart from "./price-history-chart"
import AIRecommendation from "./ai-recommendation"

// This would normally come from an API
const mockProductData = {
  id: "1",
  name: "iPhone 15 Pro (128GB, Black)",
  image: "/placeholder.svg?height=200&width=200",
  description: "Apple iPhone 15 Pro with A17 Pro chip, 48MP camera system, and titanium design",
  prices: [
    { store: "Amazon", price: 999, link: "#", inStock: true },
    { store: "Flipkart", price: 989, link: "#", inStock: true },
    { store: "Best Buy", price: 1029, link: "#", inStock: false },
    { store: "Apple Store", price: 999, link: "#", inStock: true },
  ],
  lowestEver: 949,
  priceHistory: [
    { date: "2023-09", price: 999 },
    { date: "2023-10", price: 999 },
    { date: "2023-11", price: 979 },
    { date: "2023-12", price: 949 },
    { date: "2024-01", price: 969 },
    { date: "2024-02", price: 989 },
  ],
}

export default function ProductComparison() {
  // Sort prices from lowest to highest
  const sortedPrices = [...mockProductData.prices].sort((a, b) => a.price - b.price)
  const lowestPrice = sortedPrices[0]

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
      <Card className="lg:col-span-2">
        <CardHeader>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-shrink-0">
              <Image
                src={mockProductData.image || "/placeholder.svg"}
                alt={mockProductData.name}
                width={200}
                height={200}
                className="rounded-lg object-contain bg-gray-50"
              />
            </div>
            <div>
              <CardTitle>{mockProductData.name}</CardTitle>
              <CardDescription className="mt-2">{mockProductData.description}</CardDescription>
              <div className="flex gap-2 mt-4">
                <Button variant="outline" size="sm" className="flex gap-1">
                  <Heart className="h-4 w-4" /> Bookmark
                </Button>
                <Button variant="outline" size="sm" className="flex gap-1">
                  <Bell className="h-4 w-4" /> Price Alert
                </Button>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <ArrowUpDown className="mr-2 h-4 w-4" /> Price Comparison
          </h3>
          <div className="space-y-4">
            {sortedPrices.map((item, index) => (
              <div key={item.store} className="flex items-center justify-between border-b pb-3">
                <div className="flex items-center gap-2">
                  {index === 0 && <Badge variant="success">Best Price</Badge>}
                  <span className="font-medium">{item.store}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className={`text-lg font-bold ${index === 0 ? "text-green-600" : ""}`}>${item.price}</span>
                  <Button
                    variant={item.inStock ? "default" : "outline"}
                    size="sm"
                    disabled={!item.inStock}
                    className="flex gap-1"
                  >
                    <ShoppingCart className="h-4 w-4" />
                    {item.inStock ? "Buy Now" : "Out of Stock"}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter className="text-sm text-muted-foreground">
          Lowest ever price: ${mockProductData.lowestEver} • Last updated: Today
        </CardFooter>
      </Card>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Price History</CardTitle>
          </CardHeader>
          <CardContent>
            <PriceHistoryChart priceHistory={mockProductData.priceHistory} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">AI Recommendation</CardTitle>
          </CardHeader>
          <CardContent>
            <AIRecommendation productId={mockProductData.id} />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

