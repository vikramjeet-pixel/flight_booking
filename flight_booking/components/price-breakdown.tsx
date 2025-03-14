import { CreditCard } from "lucide-react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

interface Flight {
  id: string
  price: number
}

export function PriceBreakdown({ flight }: { flight: Flight }) {
  // Calculate fees
  const baseFare = flight.price
  const taxes = Math.round(baseFare * 0.12)
  const serviceFee = 24.99
  const total = baseFare + taxes + serviceFee

  return (
    <Card className="sticky top-6">
      <CardHeader>
        <CardTitle>Price Breakdown</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Base fare</span>
          <span>${baseFare.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Taxes & fees</span>
          <span>${taxes.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Service fee</span>
          <span>${serviceFee.toFixed(2)}</span>
        </div>
        <Separator />
        <div className="flex justify-between font-medium">
          <span>Total</span>
          <span className="text-xl">${total.toFixed(2)}</span>
        </div>

        <div className="text-xs text-muted-foreground">
          <p>Price shown is per person</p>
          <p className="mt-1">Fare rules and conditions apply</p>
        </div>
      </CardContent>
      <CardFooter className="flex-col space-y-2">
        <div className="flex items-center justify-center w-full gap-2 text-sm text-muted-foreground">
          <CreditCard className="h-4 w-4" />
          <span>Secure payment processing</span>
        </div>
      </CardFooter>
    </Card>
  )
}

