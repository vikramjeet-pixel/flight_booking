import Image from "next/image"
import { CalendarIcon, Clock } from "lucide-react"
import { format, parse } from "date-fns"

import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

interface Flight {
  id: string
  airline: {
    name: string
    logo: string
    code: string
  }
  flightNumber: string
  departure: {
    airport: string
    time: string
    date: string
  }
  arrival: {
    airport: string
    time: string
    date: string
  }
  duration: string
  stops: number
  stopDetails?: string
  price: number
  seatsAvailable: number
}

export function FlightSummary({ flight }: { flight: Flight }) {
  // Format dates
  const departureDate = format(parse(flight.departure.date, "yyyy-MM-dd", new Date()), "EEE, MMM d, yyyy")

  const arrivalDate = format(parse(flight.arrival.date, "yyyy-MM-dd", new Date()), "EEE, MMM d, yyyy")

  const isSameDay = flight.departure.date === flight.arrival.date

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm mb-6">
      <h2 className="text-xl font-semibold mb-4">Flight Summary</h2>

      <div className="flex items-center gap-4 mb-6">
        <Image src={flight.airline.logo || "/placeholder.svg"} alt={flight.airline.name} width={48} height={48} />
        <div>
          <div className="font-medium">{flight.airline.name}</div>
          <div className="text-sm text-muted-foreground">{flight.flightNumber}</div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Departure */}
        <div>
          <div className="text-sm font-medium text-muted-foreground mb-1">Departure</div>
          <div className="text-xl font-bold">{flight.departure.time}</div>
          <div className="text-sm">{flight.departure.airport}</div>
          <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
            <CalendarIcon className="h-3 w-3" />
            <span>{departureDate}</span>
          </div>
        </div>

        {/* Flight Info */}
        <div className="flex flex-col items-center justify-center">
          <div className="text-sm font-medium text-muted-foreground mb-1">Duration</div>
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{flight.duration}</span>
          </div>
          <div className="relative w-full my-2">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-dashed border-gray-300"></div>
            </div>
            <div className="relative flex justify-center">
              <div className="bg-white px-2">
                {flight.stops === 0 ? (
                  <Badge variant="outline">Nonstop</Badge>
                ) : (
                  <Badge variant="outline">{flight.stops} Stop</Badge>
                )}
              </div>
            </div>
          </div>
          {flight.stopDetails && <div className="text-xs text-muted-foreground">{flight.stopDetails}</div>}
        </div>

        {/* Arrival */}
        <div>
          <div className="text-sm font-medium text-muted-foreground mb-1">Arrival</div>
          <div className="text-xl font-bold">{flight.arrival.time}</div>
          <div className="text-sm">{flight.arrival.airport}</div>
          <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
            <CalendarIcon className="h-3 w-3" />
            <span>{arrivalDate}</span>
            {!isSameDay && (
              <Badge variant="outline" className="text-[10px] h-4">
                +1
              </Badge>
            )}
          </div>
        </div>
      </div>

      <Separator className="my-6" />

      <div className="flex justify-between items-center">
        <div>
          <div className="text-sm font-medium text-muted-foreground">Seats Available</div>
          <div className="font-medium">{flight.seatsAvailable} seats</div>
        </div>
        <div className="text-right">
          <div className="text-sm font-medium text-muted-foreground">Price per person</div>
          <div className="text-xl font-bold">${flight.price}</div>
        </div>
      </div>
    </div>
  )
}

