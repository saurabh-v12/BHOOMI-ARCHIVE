import { type NextRequest, NextResponse } from "next/server"
import properties from "./properties.json"
import type { Property } from "@/types/property"

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const type = searchParams.get("type")
  const query = searchParams.get("query")

  if (!type || !query) {
    return NextResponse.json({ error: "Missing required parameters" }, { status: 400 })
  }

  let filteredProperties: Property[] = []

  // Simulate a slight delay to show loading state
  await new Promise((resolve) => setTimeout(resolve, 800))

  if (type === "name") {
    filteredProperties = properties.filter((property) => property.ownerName.toLowerCase().includes(query.toLowerCase()))
  } else if (type === "id") {
    filteredProperties = properties.filter((property) =>
      property.registrationNumber.toLowerCase().includes(query.toLowerCase()),
    )
  }

  return NextResponse.json(filteredProperties)
}
