import { NextResponse } from "next/server"

// This is a dummy API route to ensure the PDF libraries are included in the project
export async function GET() {
  return NextResponse.json({
    message: "PDF libraries are available for use in the application",
  })
}
