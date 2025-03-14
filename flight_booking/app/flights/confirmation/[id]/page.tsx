import Link from "next/link"
import Image from "next/image"
import { CalendarCheck, CheckCircle, Download, Printer, Share } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

// Mock function to get booking details
async function getBooking(id: string) {
  // In a real app, this would be an API call
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // Mock data
  return {
    id: "BK" + Math.floor(Math.random() * 10000000),
    flight: {
      id,
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
    },
    passenger: {
      name: "John Smith",
      email: "john.smith@example.com",
    },
    status: "confirmed",
    paymentMethod: "Visa •••• 4242",
    totalAmount: 349 + 41.88 + 24.99,
  }
}

export default async function ConfirmationPage({ params }: { params: { id: string } }) {
  const booking = await getBooking(params.id)

  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold mb-2">Booking Confirmed!</h1>
          <p className="text-muted-foreground">Your booking has been confirmed and your tickets are ready</p>
        </div>

        <Card className="mb-8">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Booking Details</CardTitle>
              <CardDescription>Booking reference: {booking.id}</CardDescription>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="gap-1">
                <Printer className="h-4 w-4" />
                <span className="hidden sm:inline">Print</span>
              </Button>
              <Button variant="outline" size="sm" className="gap-1">
                <Download className="h-4 w-4" />
                <span className="hidden sm:inline">Download</span>
              </Button>
              <Button variant="outline" size="sm" className="gap-1">
                <Share className="h-4 w-4" />
                <span className="hidden sm:inline">Share</span>
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Flight Info */}
            <div className="flex flex-col md:flex-row gap-4 items-center">
              <div className="flex items-center gap-3">
                <Image
                  src={booking.flight.airline.logo || "/placeholder.svg"}
                  alt={booking.flight.airline.name}
                  width={40}
                  height={40}
                />
                <div>
                  <div className="font-medium">{booking.flight.airline.name}</div>
                  <div className="text-sm text-muted-foreground">{booking.flight.flightNumber}</div>
                </div>
              </div>

              <div className="flex-1 grid grid-cols-3 gap-2 text-center">
                <div>
                  <div className="text-lg font-bold">{booking.flight.departure.time}</div>
                  <div className="text-sm">{booking.flight.departure.airport}</div>
                </div>

                <div className="flex flex-col items-center justify-center">
                  <div className="relative w-full">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-dashed border-gray-300"></div>
                    </div>
                    <div className="relative flex justify-center">
                      <div className="bg-gray-50 px-2 text-xs text-muted-foreground">
                        {booking.flight.departure.date}
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="text-lg font-bold">{booking.flight.arrival.time}</div>
                  <div className="text-sm">{booking.flight.arrival.airport}</div>
                </div>
              </div>
            </div>

            <Separator />

            {/* Passenger Info */}
            <div>
              <h3 className="font-medium mb-2">Passenger Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-muted-foreground">Passenger Name</div>
                  <div>{booking.passenger.name}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Email</div>
                  <div>{booking.passenger.email}</div>
                </div>
              </div>
            </div>

            <Separator />

            {/* Payment Info */}
            <div>
              <h3 className="font-medium mb-2">Payment Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-muted-foreground">Payment Method</div>
                  <div>{booking.paymentMethod}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Total Amount</div>
                  <div className="font-bold">${booking.totalAmount.toFixed(2)}</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 flex gap-4 items-center mb-8">
          <CalendarCheck className="h-6 w-6 text-blue-600 shrink-0" />
          <div>
            <h3 className="font-medium text-blue-900">Add to Calendar</h3>
            <p className="text-sm text-blue-700">Don't forget your flight! Add it to your calendar for a reminder.</p>
          </div>
          <div className="ml-auto">
            <Button variant="outline" className="bg-white">
              Add
            </Button>
          </div>
        </div>

        <div className="flex justify-center">
          <Button asChild>
            <Link href="/">Return to Home</Link>
          </Button>
        </div>
      </div>
    </main>
  )
}

