import { Suspense } from "react"
import { Skeleton } from "@/components/ui/skeleton"
import SearchBar from "@/components/search-bar"
import ProductComparison from "@/components/product-comparison"

interface SearchPageProps {
  searchParams: { q?: string }
}

export default function SearchPage({ searchParams }: SearchPageProps) {
  const query = searchParams.q || ""

  return (
    <main className="container mx-auto px-4 py-8">
      <section className="mb-8">
        <h1 className="text-3xl font-bold mb-6">ShopLens</h1>
        <SearchBar />
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">
          Search results for: <span className="font-normal">{query}</span>
        </h2>

        <Suspense fallback={<SearchResultsSkeleton />}>
          <ProductComparison />
        </Suspense>
      </section>
    </main>
  )
}

function SearchResultsSkeleton() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-[400px] w-full rounded-lg" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Skeleton className="h-[200px] rounded-lg" />
        <Skeleton className="h-[200px] rounded-lg" />
        <Skeleton className="h-[200px] rounded-lg" />
      </div>
    </div>
  )
}

