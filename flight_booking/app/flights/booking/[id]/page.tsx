import { Suspense } from "react"
import { notFound } from "next/navigation"
import { BookingForm } from "@/components/booking-form"
import { FlightSummary } from "@/components/flight-summary"
import { PriceBreakdown } from "@/components/price-breakdown"
import { Skeleton } from "@/components/ui/skeleton"

// Mock function to get flight details
async function getFlight(id: string) {
  // In a real app, this would be an API call
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // Mock data
  const flights = {
    "fl-1": {
      id: "fl-1",
      airline: {
        name: "Delta Airlines",
        logo: "/placeholder.svg?height=40&width=40",
        code: "DL",
      },
      flightNumber: "DL1234",
      departure: {
        airport: "New York (JFK)",
        time: "08:30",
        date: "2023-12-15",
      },
      arrival: {
        airport: "London (LHR)",
        time: "20:45",
        date: "2023-12-15",
      },
      duration: "7h 15m",
      stops: 0,
      price: 349,
      seatsAvailable: 12,
    },
    "fl-2": {
      id: "fl-2",
      airline: {
        name: "American Airlines",
        logo: "/placeholder.svg?height=40&width=40",
        code: "AA",
      },
      flightNumber: "AA789",
      departure: {
        airport: "New York (JFK)",
        time: "10:15",
        date: "2023-12-15",
      },
      arrival: {
        airport: "London (LHR)",
        time: "22:30",
        date: "2023-12-15",
      },
      duration: "7h 15m",
      stops: 1,
      stopDetails: "Layover: 1h 30m in Boston (BOS)",
      price: 299,
      seatsAvailable: 5,
    },
    "fl-3": {
      id: "fl-3",
      airline: {
        name: "British Airways",
        logo: "/placeholder.svg?height=40&width=40",
        code: "BA",
      },
      flightNumber: "BA112",
      departure: {
        airport: "New York (JFK)",
        time: "18:45",
        date: "2023-12-15",
      },
      arrival: {
        airport: "London (LHR)",
        time: "07:00",
        date: "2023-12-16",
      },
      duration: "7h 15m",
      stops: 0,
      price: 399,
      seatsAvailable: 20,
    },
  }

  return flights[id as keyof typeof flights] || null
}

export default function BookingPage({ params }: { params: { id: string } }) {
  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-2xl font-bold mb-6">Complete Your Booking</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Suspense fallback={<FlightSummarySkeleton />}>
              <FlightSummaryWrapper flightId={params.id} />
            </Suspense>

            <BookingForm flightId={params.id} />
          </div>

          <div className="lg:col-span-1">
            <Suspense fallback={<PriceBreakdownSkeleton />}>
              <PriceBreakdownWrapper flightId={params.id} />
            </Suspense>
          </div>
        </div>
      </div>
    </main>
  )
}

async function FlightSummaryWrapper({ flightId }: { flightId: string }) {
  const flight = await getFlight(flightId)

  if (!flight) {
    notFound()
  }

  return <FlightSummary flight={flight} />
}

async function PriceBreakdownWrapper({ flightId }: { flightId: string }) {
  const flight = await getFlight(flightId)

  if (!flight) {
    notFound()
  }

  return <PriceBreakdown flight={flight} />
}

function FlightSummarySkeleton() {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm mb-6">
      <Skeleton className="h-6 w-1/3 mb-4" />
      <div className="flex flex-col md:flex-row gap-4">
        <Skeleton className="h-12 w-12" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-4 w-1/4" />
          <Skeleton className="h-4 w-1/3" />
        </div>
      </div>
    </div>
  )
}

function PriceBreakdownSkeleton() {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <Skeleton className="h-6 w-1/2 mb-4" />
      <div className="space-y-4">
        <div className="flex justify-between">
          <Skeleton className="h-4 w-1/3" />
          <Skeleton className="h-4 w-1/4" />
        </div>
        <div className="flex justify-between">
          <Skeleton className="h-4 w-1/3" />
          <Skeleton className="h-4 w-1/4" />
        </div>
        <div className="flex justify-between">
          <Skeleton className="h-4 w-1/3" />
          <Skeleton className="h-4 w-1/4" />
        </div>
        <Skeleton className="h-px w-full" />
        <div className="flex justify-between">
          <Skeleton className="h-6 w-1/3" />
          <Skeleton className="h-6 w-1/4" />
        </div>
      </div>
    </div>
  )
}

