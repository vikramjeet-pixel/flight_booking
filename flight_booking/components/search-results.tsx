import Image from "next/image"
import Link from "next/link"
import { Clock, Luggage } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

// Mock function to simulate fetching flight data
async function getFlights(searchParams: Record<string, string | undefined>) {
  // In a real app, this would be an API call
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // Mock data
  return [
    {
      id: "fl-1",
      airline: {
        name: "Delta Airlines",
        logo: "/placeholder.svg?height=40&width=40",
        code: "DL",
      },
      flightNumber: "DL1234",
      departure: {
        airport: searchParams.origin || "New York (JFK)",
        time: "08:30",
        date: searchParams.departureDate || "2023-12-15",
      },
      arrival: {
        airport: searchParams.destination || "London (LHR)",
        time: "20:45",
        date: searchParams.departureDate || "2023-12-15",
      },
      duration: "7h 15m",
      stops: 0,
      price: 349,
      seatsAvailable: 12,
    },
    {
      id: "fl-2",
      airline: {
        name: "American Airlines",
        logo: "/placeholder.svg?height=40&width=40",
        code: "AA",
      },
      flightNumber: "AA789",
      departure: {
        airport: searchParams.origin || "New York (JFK)",
        time: "10:15",
        date: searchParams.departureDate || "2023-12-15",
      },
      arrival: {
        airport: searchParams.destination || "London (LHR)",
        time: "22:30",
        date: searchParams.departureDate || "2023-12-15",
      },
      duration: "7h 15m",
      stops: 1,
      stopDetails: "Layover: 1h 30m in Boston (BOS)",
      price: 299,
      seatsAvailable: 5,
    },
    {
      id: "fl-3",
      airline: {
        name: "British Airways",
        logo: "/placeholder.svg?height=40&width=40",
        code: "BA",
      },
      flightNumber: "BA112",
      departure: {
        airport: searchParams.origin || "New York (JFK)",
        time: "18:45",
        date: searchParams.departureDate || "2023-12-15",
      },
      arrival: {
        airport: searchParams.destination || "London (LHR)",
        time: "07:00",
        date: searchParams.departureDate
          ? // Add one day to arrival date for overnight flights
            new Date(new Date(searchParams.departureDate).getTime() + 86400000).toISOString().split("T")[0]
          : "2023-12-16",
      },
      duration: "7h 15m",
      stops: 0,
      price: 399,
      seatsAvailable: 20,
    },
  ]
}

export async function SearchResults({
  searchParams,
}: {
  searchParams: Record<string, string | undefined>
}) {
  const flights = await getFlights(searchParams)

  if (flights.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium mb-2">No flights found</h3>
        <p className="text-muted-foreground">Try adjusting your search criteria</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {flights.map((flight) => (
        <Card key={flight.id} className="overflow-hidden">
          <CardContent className="p-0">
            <div className="flex flex-col md:flex-row">
              {/* Airline Info */}
              <div className="p-4 md:p-6 flex items-center md:w-48 md:border-r">
                <div className="flex flex-col items-center">
                  <Image
                    src={flight.airline.logo || "/placeholder.svg"}
                    alt={flight.airline.name}
                    width={40}
                    height={40}
                    className="mb-2"
                  />
                  <div className="text-sm font-medium">{flight.airline.name}</div>
                  <div className="text-xs text-muted-foreground">{flight.flightNumber}</div>
                </div>
              </div>

              {/* Flight Details */}
              <div className="flex-1 p-4 md:p-6 flex flex-col md:flex-row md:items-center gap-4">
                {/* Departure & Arrival */}
                <div className="flex-1 grid grid-cols-3 gap-2">
                  {/* Departure */}
                  <div className="col-span-1">
                    <div className="text-xl font-bold">{flight.departure.time}</div>
                    <div className="text-sm">{flight.departure.airport.split("(")[0].trim()}</div>
                    <div className="text-xs text-muted-foreground">
                      {flight.departure.airport.match(/$$([^)]+)$$/)?.[1]}
                    </div>
                  </div>

                  {/* Duration */}
                  <div className="col-span-1 flex flex-col items-center justify-center">
                    <div className="text-xs text-muted-foreground mb-1">{flight.duration}</div>
                    <div className="relative w-full">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-dashed border-gray-300"></div>
                      </div>
                      <div className="relative flex justify-center">
                        <div className="bg-white px-1">
                          {flight.stops === 0 ? (
                            <Badge variant="outline" className="text-xs">
                              Nonstop
                            </Badge>
                          ) : (
                            <Badge variant="outline" className="text-xs">
                              {flight.stops} Stop
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                    {flight.stopDetails && (
                      <div className="text-xs text-muted-foreground mt-1">{flight.stopDetails}</div>
                    )}
                  </div>

                  {/* Arrival */}
                  <div className="col-span-1 text-right">
                    <div className="text-xl font-bold">{flight.arrival.time}</div>
                    <div className="text-sm">{flight.arrival.airport.split("(")[0].trim()}</div>
                    <div className="text-xs text-muted-foreground">
                      {flight.arrival.airport.match(/$$([^)]+)$$/)?.[1]}
                    </div>
                  </div>
                </div>

                {/* Amenities */}
                <div className="flex gap-3 md:border-l md:pl-4">
                  <div className="flex items-center gap-1 text-xs">
                    <Luggage className="h-3 w-3" />
                    <span>Carry-on</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs">
                    <Clock className="h-3 w-3" />
                    <span>On time</span>
                  </div>
                </div>

                {/* Price & Book */}
                <div className="md:w-32 md:border-l md:pl-4 flex flex-row md:flex-col items-center md:items-end justify-between">
                  <div className="text-right">
                    <div className="text-2xl font-bold">${flight.price}</div>
                    <div className="text-xs text-muted-foreground">per person</div>
                  </div>

                  <Button asChild className="mt-2">
                    <Link href={`/flights/booking/${flight.id}`}>Select</Link>
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

