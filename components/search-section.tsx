"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, MapIcon } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import MapSearch from "@/components/map-search"
import { useSearch } from "@/hooks/use-search"
import ResultsDisplay from "@/components/results-display"

export default function SearchSection() {
  const [searchType, setSearchType] = useState<"name" | "id">("name")
  const [searchQuery, setSearchQuery] = useState("")
  const { results, isLoading, error, search, clearResults } = useSearch()
  const [selectedLocation, setSelectedLocation] = useState<{ x: number; y: number } | null>(null)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      search(searchType, searchQuery)
    }
  }

  const handleMapSelection = (location: { x: number; y: number }) => {
    setSelectedLocation(location)
    // Simulate a search based on map location
    // In a real application, you would use coordinates to find properties
    search("id", "GJ-GNR-12345-2018")
  }

  return (
    <section className="py-16 bg-white" id="search-section">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Search Land Records</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Find land records and check for disputes by searching with owner name, land ID, or using our interactive
              map.
            </p>
          </div>

          <div className="bg-white border-2 border-gray-200 rounded-lg shadow-md overflow-hidden">
            <div className="p-6">
              <Tabs defaultValue="text" className="w-full">
                <TabsList className="grid grid-cols-2 mb-6">
                  <TabsTrigger value="text" className="data-[state=active]:bg-saffron data-[state=active]:text-white">
                    <Search className="h-4 w-4 mr-2" />
                    Text Search
                  </TabsTrigger>
                  <TabsTrigger value="map" className="data-[state=active]:bg-saffron data-[state=active]:text-white">
                    <MapIcon className="h-4 w-4 mr-2" />
                    Map Search
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="text">
                  <form onSubmit={handleSearch} className="space-y-4">
                    <div className="flex mb-6">
                      <button
                        type="button"
                        onClick={() => setSearchType("name")}
                        className={`flex items-center px-4 py-2 rounded-l-md ${
                          searchType === "name"
                            ? "bg-saffron text-white"
                            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                        }`}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="mr-2"
                        >
                          <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                          <circle cx="12" cy="7" r="4" />
                        </svg>
                        Search by Name
                      </button>
                      <button
                        type="button"
                        onClick={() => setSearchType("id")}
                        className={`flex items-center px-4 py-2 rounded-r-md ${
                          searchType === "id" ? "bg-saffron text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                        }`}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="mr-2"
                        >
                          <rect width="18" height="18" x="3" y="3" rx="2" />
                          <path d="M7 7h.01" />
                          <path d="M17 7h.01" />
                          <path d="M7 17h.01" />
                          <path d="M17 17h.01" />
                        </svg>
                        Search by Land ID
                      </button>
                    </div>

                    <div className="mb-6">
                      <Input
                        type="text"
                        placeholder={
                          searchType === "name" ? "Enter owner's full name" : "Enter land registration number"
                        }
                        className="w-full border-2 border-gray-300 focus:border-saffron"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-green hover:bg-green-dark text-white"
                      disabled={isLoading || !searchQuery.trim()}
                    >
                      {isLoading ? (
                        <>
                          <svg
                            className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          Searching...
                        </>
                      ) : (
                        <>
                          <Search className="mr-2 h-4 w-4" />
                          Search Records
                        </>
                      )}
                    </Button>
                  </form>
                </TabsContent>

                <TabsContent value="map">
                  <div className="space-y-4">
                    <MapSearch onSelectLocation={handleMapSelection} />

                    {selectedLocation && (
                      <div className="mt-4 p-4 bg-gray-50 border border-gray-200 rounded-md">
                        <h4 className="font-medium text-gray-900 mb-2">Selected Location</h4>
                        <p className="text-sm text-gray-600">
                          Coordinates: {Math.round(selectedLocation.x * 100)}°N, {Math.round(selectedLocation.y * 100)}
                          °E
                        </p>
                        <Button
                          onClick={() => search("id", "GJ-GNR-12345-2018")}
                          className="mt-3 bg-green hover:bg-green-dark text-white"
                        >
                          <Search className="mr-2 h-4 w-4" />
                          Search This Location
                        </Button>
                      </div>
                    )}
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>

          {error && (
            <div className="mt-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-md">
              <p className="font-medium">Error</p>
              <p className="text-sm">{error}</p>
            </div>
          )}

          {results.length > 0 && (
            <div className="mt-8">
              <ResultsDisplay results={results} />
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
