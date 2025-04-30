"use client"

import { useState } from "react"
import type { Property } from "@/types/property"

export function useSearch() {
  const [results, setResults] = useState<Property[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const search = async (type: "name" | "id", query: string) => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch(`/api/properties?type=${type}&query=${encodeURIComponent(query)}`)

      if (!response.ok) {
        throw new Error("Failed to fetch data. Please try again later.")
      }

      const data = await response.json()
      setResults(data)

      if (data.length === 0) {
        // This is not an error, just no results found
        // We'll handle this in the UI
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unexpected error occurred")
      setResults([])
    } finally {
      setIsLoading(false)
    }
  }

  const clearResults = () => {
    setResults([])
    setError(null)
  }

  return {
    results,
    isLoading,
    error,
    search,
    clearResults,
  }
}
