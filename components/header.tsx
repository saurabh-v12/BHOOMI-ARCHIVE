"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"
import { useState } from "react"

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const scrollToContact = () => {
    const contactSection = document.getElementById("contact-support")
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <header className="govt-header sticky top-0 z-50 tricolor-border">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center space-x-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#0096FF]">
            <span className="text-lg font-bold text-white">L</span>
          </div>
          <div>
            <h1 className="text-lg font-bold text-gray-800">LandResolve</h1>
            <p className="text-xs text-gray-500">Property Resolution Portal</p>
          </div>
        </Link>

        <nav className="hidden md:flex items-center space-x-6">
          <Link href="/" className="text-sm font-medium text-gray-800 hover:text-saffron transition-colors">
            Home
          </Link>
          <button
            onClick={scrollToContact}
            className="text-sm font-medium text-gray-800 hover:text-saffron transition-colors"
          >
            Contact
          </button>
          <Button size="sm" className="bg-green hover:bg-green-dark text-white">
            Login
          </Button>
        </nav>

        <Button variant="outline" size="icon" className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          <Menu className="h-5 w-5" />
        </Button>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 py-2 px-4 shadow-md">
          <nav className="flex flex-col space-y-2">
            <Link
              href="/"
              className="text-sm font-medium text-gray-800 hover:text-saffron transition-colors py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <button
              onClick={() => {
                scrollToContact()
                setMobileMenuOpen(false)
              }}
              className="text-sm font-medium text-gray-800 hover:text-saffron transition-colors py-2 text-left"
            >
              Contact
            </button>
            <Button size="sm" className="bg-green hover:bg-green-dark text-white w-full mt-2">
              Login
            </Button>
          </nav>
        </div>
      )}
    </header>
  )
}
