import { NextResponse } from "next/server"

// Mock function to get flight details
async function getFlight(id: string) {
  // In a real app, this would fetch from Supabase
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

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const flight = await getFlight(params.id)

  if (!flight) {
    return NextResponse.json({ error: "Flight not found" }, { status: 404 })
  }

  return NextResponse.json(flight)
}

