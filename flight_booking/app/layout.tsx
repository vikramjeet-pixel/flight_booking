import type React from "react"
import { Inter } from "next/font/google"
import Link from "next/link"
import { Menu, Search, Globe, ChevronDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ThemeProvider } from "@/components/theme-provider"
import { AuthButton } from "@/components/auth/auth-button"

import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "SkyWay - Book Flights Online",
  description: "Find and book flights to destinations worldwide",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={cn(inter.className, "min-h-screen bg-background")}>
        <ThemeProvider attribute="class" defaultTheme="light">
          <header className="border-b">
            <div className="container mx-auto px-4 flex h-16 items-center justify-between">
              <div className="flex items-center">
                <Link href="/" className="text-2xl font-bold text-blue-600">
                  SkyWay
                </Link>
                <nav className="hidden ml-10 md:flex items-center gap-6">
                  <Link href="/" className="text-sm font-medium hover:text-blue-600 transition-colors">
                    Flights
                  </Link>
                  <Link href="#" className="text-sm font-medium hover:text-blue-600 transition-colors">
                    Hotels
                  </Link>
                  <Link href="#" className="text-sm font-medium hover:text-blue-600 transition-colors">
                    Car Rentals
                  </Link>
                  <Link href="#" className="text-sm font-medium hover:text-blue-600 transition-colors">
                    Deals
                  </Link>
                </nav>
              </div>
              
              <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" className="hidden md:flex">
                  <Search className="h-5 w-5" />
                </Button>
                
                <div className="hidden md:flex items-center gap-1">
                  <Globe className="h-4 w-4" />
                  <span className="text-sm">EN</span>
                  <ChevronDown className="h-3 w-3" />
                </div>
                
                <AuthButton />
                
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </header>
          
          {children}
          
          <footer className="bg-gray-900 text-white py-12">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div>
                  <h3 className="text-lg font-bold mb-4">SkyWay</h3>
                  <p className="text-gray-400 text-sm">
                    Book flights to destinations worldwide with competitive prices and exceptional service.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-medium mb-4">Company</h4>
                  <ul className="space-y-2 text-sm text-gray-400">
                    <li><Link href="#" className="hover:text-white transition-colors">About Us</Link></li>
                    <li><Link href="#" className="hover:text-white transition-colors">Careers</Link></li>
                    <li><Link href="#" className="hover:text-white transition-colors">Press</Link></li>
                    <li><Link href="#" className="hover:text-white transition-colors">Partners</Link></li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-medium mb-4">Support</h4>
                  <ul className="space-y-2 text-sm text-gray-400">
                    <li><Link href="#" className="hover:text-white transition-colors">Help Center</Link></li>
                    <li><Link href="#" className="hover:text-white transition-colors">Contact Us</Link></li>
                    <li><Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                    <li><Link href="#" className="hover:text-white transition-colors">Terms of Service</Link></li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-medium mb-4">Stay Connected</h4>
                  <div className="flex gap-4">
                    <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                      </svg>
                    </Link>
                    <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                      </svg>
                    </Link>
                    <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10\

