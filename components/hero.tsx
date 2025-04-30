"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, FileText, Shield } from "lucide-react"

export default function Hero() {
  const scrollToSearch = () => {
    const searchSection = document.getElementById("search-section")
    if (searchSection) {
      searchSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="w-full md:w-1/2">
            <div className="inline-flex items-center rounded-full bg-saffron bg-opacity-10 px-3 py-1 text-xs font-medium text-saffron mb-6">
              <Shield className="mr-1.5 h-3.5 w-3.5" />
              Official Property Resolution Service
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Resolve Land Disputes <span className="text-saffron">Efficiently</span>
            </h1>

            <p className="text-gray-600 mb-8 max-w-xl">
              Streamlined process to find, verify, and resolve land ownership disputes through our official portal with
              modern technology and transparent procedures.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="bg-green hover:bg-green-dark text-white" onClick={scrollToSearch}>
                Start Dispute Resolution
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button variant="outline" className="border-saffron text-saffron hover:bg-saffron hover:bg-opacity-10">
                Learn More
              </Button>
            </div>
          </div>

          <div className="w-full md:w-1/2">
            <div className="relative mx-auto max-w-md">
              <div className="rounded-lg bg-white shadow-lg overflow-hidden border-2 border-gray-200">
                <div className="p-4">
                  <div className="flex items-center mb-4">
                    <FileText className="h-5 w-5 text-saffron mr-2" />
                    <h3 className="font-semibold text-gray-800">Land Records Visualization</h3>
                  </div>
                  <div className="aspect-video bg-gray-100 rounded-md mb-4 overflow-hidden">
                    <img
                      src="https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                      alt="House property"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="space-y-3">
                    <div className="h-4 bg-gray-100 rounded-full w-full"></div>
                    <div className="h-4 bg-gray-100 rounded-full w-3/4"></div>
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center text-xs text-gray-500">
                        <FileText className="h-3.5 w-3.5 mr-1" />
                        Land Record #21453
                      </div>
                      <div className="text-xs font-medium text-saffron">View Details</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-5 -right-5 bg-white rounded-lg shadow-lg p-4 border-2 border-gray-200 z-10 w-32">
                <div className="text-center">
                  <div className="text-xs text-gray-500 mb-1">Verification</div>
                  <div className="text-2xl font-bold text-green">100%</div>
                  <div className="text-xs text-green font-medium">Completed</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 max-w-4xl mx-auto">
          <StatCard value="95%" label="Resolution Rate" />
          <StatCard value="3.5M+" label="Land Records" />
          <StatCard value="7 Days" label="Avg. Resolution Time" />
          <StatCard value="24/7" label="Support Available" />
        </div>
      </div>
    </section>
  )
}

function StatCard({ value, label }: { value: string; label: string }) {
  return (
    <div className="bg-white bg-opacity-80 backdrop-blur-sm rounded-lg p-4 text-center shadow-sm border-2 border-gray-200">
      <div className="text-2xl md:text-3xl font-bold text-saffron">{value}</div>
      <div className="text-sm text-gray-600">{label}</div>
    </div>
  )
}
