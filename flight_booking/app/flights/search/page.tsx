import { Suspense } from "react"
import { SearchResults } from "@/components/search-results"
import { SearchFilters } from "@/components/search-filters"
import { SearchSummary } from "@/components/search-summary"
import { Skeleton } from "@/components/ui/skeleton"

export default function SearchPage({
  searchParams,
}: {
  searchParams: {
    origin?: string
    destination?: string
    departureDate?: string
    returnDate?: string
    passengers?: string
    cabinClass?: string
    tripType?: string
  }
}) {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <SearchSummary searchParams={searchParams} />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mt-6">
          <div className="lg:col-span-1">
            <SearchFilters />
          </div>

          <div className="lg:col-span-3">
            <Suspense fallback={<SearchResultsSkeleton />}>
              <SearchResults searchParams={searchParams} />
            </Suspense>
          </div>
        </div>
      </div>
    </main>
  )
}

function SearchResultsSkeleton() {
  return (
    <div className="space-y-4">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="bg-white rounded-lg p-4 shadow-sm">
          <div className="flex flex-col md:flex-row gap-4">
            <Skeleton className="h-24 w-full md:w-32" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-6 w-1/3" />
              <Skeleton className="h-4 w-1/2" />
              <div className="flex gap-2 mt-2">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-4 w-16" />
              </div>
            </div>
            <div className="md:w-32 space-y-2 flex flex-col items-end justify-between">
              <Skeleton className="h-6 w-24" />
              <Skeleton className="h-10 w-full" />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

