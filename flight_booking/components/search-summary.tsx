import { format, parse } from "date-fns"
import { ArrowRight } from "lucide-react"

export function SearchSummary({
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
  const {
    origin = "",
    destination = "",
    departureDate = "",
    returnDate = "",
    passengers = "1",
    cabinClass = "economy",
    tripType = "round-trip",
  } = searchParams

  // Format dates if they exist
  let formattedDepartureDate = ""
  let formattedReturnDate = ""

  if (departureDate) {
    try {
      const date = parse(departureDate, "yyyy-MM-dd", new Date())
      formattedDepartureDate = format(date, "MMM d, yyyy")
    } catch (e) {
      formattedDepartureDate = departureDate
    }
  }

  if (returnDate) {
    try {
      const date = parse(returnDate, "yyyy-MM-dd", new Date())
      formattedReturnDate = format(date, "MMM d, yyyy")
    } catch (e) {
      formattedReturnDate = returnDate
    }
  }

  // Format cabin class
  const formattedCabinClass = cabinClass.charAt(0).toUpperCase() + cabinClass.slice(1)

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm">
      <h1 className="text-2xl font-bold mb-4">Flight Search Results</h1>

      <div className="flex flex-wrap items-center gap-2 text-sm">
        <div className="font-medium">{origin || "Any Origin"}</div>
        <ArrowRight className="h-4 w-4 text-muted-foreground" />
        <div className="font-medium">{destination || "Any Destination"}</div>

        {formattedDepartureDate && (
          <>
            <span className="text-muted-foreground mx-1">•</span>
            <div>{formattedDepartureDate}</div>

            {tripType === "round-trip" && formattedReturnDate && (
              <>
                <span className="text-muted-foreground mx-1">-</span>
                <div>{formattedReturnDate}</div>
              </>
            )}
          </>
        )}

        <span className="text-muted-foreground mx-1">•</span>
        <div>
          {passengers} Passenger{Number.parseInt(passengers) !== 1 ? "s" : ""}
        </div>

        <span className="text-muted-foreground mx-1">•</span>
        <div>{formattedCabinClass}</div>
      </div>
    </div>
  )
}

