import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

const destinations = [
  {
    id: 1,
    name: "New York",
    image: "/placeholder.svg?height=400&width=600",
    price: "$299",
    code: "NYC",
  },
  {
    id: 2,
    name: "London",
    image: "/placeholder.svg?height=400&width=600",
    price: "$449",
    code: "LDN",
  },
  {
    id: 3,
    name: "Tokyo",
    image: "/placeholder.svg?height=400&width=600",
    price: "$799",
    code: "TYO",
  },
  {
    id: 4,
    name: "Paris",
    image: "/placeholder.svg?height=400&width=600",
    price: "$399",
    code: "PAR",
  },
]

export function FeaturedDestinations() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-10">
          <div>
            <h2 className="text-3xl font-bold">Featured Destinations</h2>
            <p className="text-muted-foreground mt-2">Explore our most popular flight destinations</p>
          </div>
          <Button variant="outline" className="hidden md:flex items-center gap-2">
            View all destinations <ArrowRight className="h-4 w-4" />
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {destinations.map((destination) => (
            <Link href={`/flights/search?destination=${destination.code}`} key={destination.id}>
              <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg">
                <div className="relative h-48">
                  <Image
                    src={destination.image || "/placeholder.svg"}
                    alt={destination.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <CardContent className="p-4">
                  <div className="flex justify-between items-center">
                    <h3 className="font-semibold text-lg">{destination.name}</h3>
                    <p className="font-medium text-blue-600">From {destination.price}</p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        <Button variant="outline" className="mt-8 mx-auto flex md:hidden items-center gap-2">
          View all destinations <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </section>
  )
}

