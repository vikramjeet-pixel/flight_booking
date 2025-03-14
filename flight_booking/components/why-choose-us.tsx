import { Shield, Ticket, CreditCard, HeadphonesIcon } from "lucide-react"

const features = [
  {
    icon: <Ticket className="h-10 w-10 text-blue-600" />,
    title: "No Booking Fees",
    description: "We don't charge any booking fees on any of our flights, saving you money.",
  },
  {
    icon: <Shield className="h-10 w-10 text-blue-600" />,
    title: "Secure Booking",
    description: "Your payment and personal information are protected with advanced encryption.",
  },
  {
    icon: <CreditCard className="h-10 w-10 text-blue-600" />,
    title: "Flexible Payment",
    description: "Choose from multiple payment methods including credit cards and digital wallets.",
  },
  {
    icon: <HeadphonesIcon className="h-10 w-10 text-blue-600" />,
    title: "24/7 Support",
    description: "Our customer support team is available around the clock to assist you.",
  },
]

export function WhyChooseUs() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Why Choose Us</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We're committed to making your flight booking experience as smooth and enjoyable as possible
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="text-center p-6 rounded-lg border border-gray-100 hover:border-blue-100 hover:bg-blue-50/30 transition-colors"
            >
              <div className="inline-flex items-center justify-center mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

