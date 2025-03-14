import { SearchForm } from "@/components/search-form"
import { FeaturedDestinations } from "@/components/featured-destinations"
import { WhyChooseUs } from "@/components/why-choose-us"
import { Testimonials } from "@/components/testimonials"
import { Newsletter } from "@/components/newsletter"

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=800&width=1600')] bg-cover bg-center opacity-20 mix-blend-overlay" />
        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Find and Book Your Perfect Flight</h1>
            <p className="text-lg md:text-xl opacity-90">Discover amazing deals on flights to destinations worldwide</p>
          </div>

          {/* Search Form */}
          <div className="max-w-4xl mx-auto">
            <SearchForm />
          </div>
        </div>
      </section>

      {/* Featured Destinations */}
      <FeaturedDestinations />

      {/* Why Choose Us */}
      <WhyChooseUs />

      {/* Testimonials */}
      <Testimonials />

      {/* Newsletter */}
      <Newsletter />
    </main>
  )
}

