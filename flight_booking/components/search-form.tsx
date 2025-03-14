"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { CalendarIcon, MapPinIcon } from "lucide-react"
import { format } from "date-fns"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"

export function SearchForm() {
  const router = useRouter()
  const [tripType, setTripType] = useState("round-trip")
  const [departureDate, setDepartureDate] = useState<Date>()
  const [returnDate, setReturnDate] = useState<Date>()
  const [origin, setOrigin] = useState("")
  const [destination, setDestination] = useState("")
  const [passengers, setPassengers] = useState("1")
  const [cabinClass, setCabinClass] = useState("economy")

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()

    // Construct search params
    const searchParams = new URLSearchParams({
      origin,
      destination,
      departureDate: departureDate ? format(departureDate, "yyyy-MM-dd") : "",
      returnDate: returnDate ? format(returnDate, "yyyy-MM-dd") : "",
      passengers,
      cabinClass,
      tripType,
    })

    router.push(`/flights/search?${searchParams.toString()}`)
  }

  return (
    <Card className="shadow-lg">
      <CardContent className="p-6">
        <Tabs defaultValue="round-trip" onValueChange={setTripType} className="mb-6">
          <TabsList className="grid grid-cols-3 mb-2">
            <TabsTrigger value="round-trip">Round Trip</TabsTrigger>
            <TabsTrigger value="one-way">One Way</TabsTrigger>
            <TabsTrigger value="multi-city">Multi-City</TabsTrigger>
          </TabsList>
        </Tabs>

        <form onSubmit={handleSearch} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Origin */}
            <div className="space-y-2">
              <label htmlFor="origin" className="text-sm font-medium">
                From
              </label>
              <div className="relative">
                <MapPinIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="origin"
                  placeholder="City or Airport"
                  className="pl-9"
                  value={origin}
                  onChange={(e) => setOrigin(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Destination */}
            <div className="space-y-2">
              <label htmlFor="destination" className="text-sm font-medium">
                To
              </label>
              <div className="relative">
                <MapPinIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="destination"
                  placeholder="City or Airport"
                  className="pl-9"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  required
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Departure Date */}
            <div className="space-y-2">
              <label htmlFor="departure" className="text-sm font-medium">
                Departure
              </label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !departureDate && "text-muted-foreground",
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {departureDate ? format(departureDate, "PPP") : <span>Select date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={departureDate}
                    onSelect={setDepartureDate}
                    initialFocus
                    disabled={(date) => date < new Date()}
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* Return Date */}
            {tripType === "round-trip" && (
              <div className="space-y-2">
                <label htmlFor="return" className="text-sm font-medium">
                  Return
                </label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !returnDate && "text-muted-foreground",
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {returnDate ? format(returnDate, "PPP") : <span>Select date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={returnDate}
                      onSelect={setReturnDate}
                      initialFocus
                      disabled={(date) => date < new Date() || (departureDate && date < departureDate)}
                    />
                  </PopoverContent>
                </Popover>
              </div>
            )}

            {/* Passengers */}
            <div className="space-y-2">
              <label htmlFor="passengers" className="text-sm font-medium">
                Passengers
              </label>
              <Select value={passengers} onValueChange={setPassengers}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Passengers" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 Passenger</SelectItem>
                  <SelectItem value="2">2 Passengers</SelectItem>
                  <SelectItem value="3">3 Passengers</SelectItem>
                  <SelectItem value="4">4 Passengers</SelectItem>
                  <SelectItem value="5">5+ Passengers</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Cabin Class */}
            <div className="space-y-2">
              <label htmlFor="cabin" className="text-sm font-medium">
                Cabin Class
              </label>
              <Select value={cabinClass} onValueChange={setCabinClass}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Cabin Class" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="economy">Economy</SelectItem>
                  <SelectItem value="premium">Premium Economy</SelectItem>
                  <SelectItem value="business">Business</SelectItem>
                  <SelectItem value="first">First Class</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button type="submit" className="w-full">
            Search Flights
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

