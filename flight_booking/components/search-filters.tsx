"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Filter, RefreshCw } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export function SearchFilters() {
  const router = useRouter()
  const searchParams = useSearchParams()

  // Price range
  const [priceRange, setPriceRange] = useState([0, 1000])

  // Airlines
  const airlines = [
    { id: "delta", name: "Delta Airlines" },
    { id: "united", name: "United Airlines" },
    { id: "american", name: "American Airlines" },
    { id: "lufthansa", name: "Lufthansa" },
    { id: "emirates", name: "Emirates" },
    { id: "british", name: "British Airways" },
  ]

  const [selectedAirlines, setSelectedAirlines] = useState<string[]>([])

  // Departure times
  const departureTimes = [
    { id: "early-morning", name: "Early Morning (12am - 6am)" },
    { id: "morning", name: "Morning (6am - 12pm)" },
    { id: "afternoon", name: "Afternoon (12pm - 6pm)" },
    { id: "evening", name: "Evening (6pm - 12am)" },
  ]

  const [selectedDepartureTimes, setSelectedDepartureTimes] = useState<string[]>([])

  // Stops
  const stops = [
    { id: "nonstop", name: "Nonstop" },
    { id: "1-stop", name: "1 Stop" },
    { id: "2plus-stops", name: "2+ Stops" },
  ]

  const [selectedStops, setSelectedStops] = useState<string[]>([])

  const handleAirlineChange = (airlineId: string, checked: boolean) => {
    setSelectedAirlines((prev) => (checked ? [...prev, airlineId] : prev.filter((id) => id !== airlineId)))
  }

  const handleDepartureTimeChange = (timeId: string, checked: boolean) => {
    setSelectedDepartureTimes((prev) => (checked ? [...prev, timeId] : prev.filter((id) => id !== timeId)))
  }

  const handleStopChange = (stopId: string, checked: boolean) => {
    setSelectedStops((prev) => (checked ? [...prev, stopId] : prev.filter((id) => id !== stopId)))
  }

  const applyFilters = () => {
    const params = new URLSearchParams(searchParams.toString())

    // Add price range
    params.set("minPrice", priceRange[0].toString())
    params.set("maxPrice", priceRange[1].toString())

    // Add airlines
    if (selectedAirlines.length > 0) {
      params.set("airlines", selectedAirlines.join(","))
    } else {
      params.delete("airlines")
    }

    // Add departure times
    if (selectedDepartureTimes.length > 0) {
      params.set("departureTimes", selectedDepartureTimes.join(","))
    } else {
      params.delete("departureTimes")
    }

    // Add stops
    if (selectedStops.length > 0) {
      params.set("stops", selectedStops.join(","))
    } else {
      params.delete("stops")
    }

    router.push(`/flights/search?${params.toString()}`)
  }

  const resetFilters = () => {
    setPriceRange([0, 1000])
    setSelectedAirlines([])
    setSelectedDepartureTimes([])
    setSelectedStops([])

    const params = new URLSearchParams(searchParams.toString())
    params.delete("minPrice")
    params.delete("maxPrice")
    params.delete("airlines")
    params.delete("departureTimes")
    params.delete("stops")

    router.push(`/flights/search?${params.toString()}`)
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg flex items-center gap-2">
          <Filter className="h-5 w-5" />
          Filters
        </CardTitle>
        <Button variant="ghost" size="sm" onClick={resetFilters} className="h-8 gap-1">
          <RefreshCw className="h-3.5 w-3.5" />
          Reset
        </Button>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Price Range */}
        <div>
          <h3 className="font-medium mb-3">Price Range</h3>
          <div className="px-2">
            <Slider
              defaultValue={[0, 1000]}
              max={2000}
              step={50}
              value={priceRange}
              onValueChange={setPriceRange}
              className="mb-4"
            />
            <div className="flex items-center justify-between text-sm">
              <span>${priceRange[0]}</span>
              <span>${priceRange[1]}</span>
            </div>
          </div>
        </div>

        <Separator />

        {/* Accordion for other filters */}
        <Accordion type="multiple" defaultValue={["airlines", "stops"]}>
          {/* Airlines */}
          <AccordionItem value="airlines">
            <AccordionTrigger>Airlines</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2">
                {airlines.map((airline) => (
                  <div key={airline.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={`airline-${airline.id}`}
                      checked={selectedAirlines.includes(airline.id)}
                      onCheckedChange={(checked) => handleAirlineChange(airline.id, checked as boolean)}
                    />
                    <Label htmlFor={`airline-${airline.id}`}>{airline.name}</Label>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Departure Times */}
          <AccordionItem value="departure-times">
            <AccordionTrigger>Departure Times</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2">
                {departureTimes.map((time) => (
                  <div key={time.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={`time-${time.id}`}
                      checked={selectedDepartureTimes.includes(time.id)}
                      onCheckedChange={(checked) => handleDepartureTimeChange(time.id, checked as boolean)}
                    />
                    <Label htmlFor={`time-${time.id}`}>{time.name}</Label>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Stops */}
          <AccordionItem value="stops">
            <AccordionTrigger>Stops</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2">
                {stops.map((stop) => (
                  <div key={stop.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={`stop-${stop.id}`}
                      checked={selectedStops.includes(stop.id)}
                      onCheckedChange={(checked) => handleStopChange(stop.id, checked as boolean)}
                    />
                    <Label htmlFor={`stop-${stop.id}`}>{stop.name}</Label>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <Button className="w-full" onClick={applyFilters}>
          Apply Filters
        </Button>
      </CardContent>
    </Card>
  )
}

