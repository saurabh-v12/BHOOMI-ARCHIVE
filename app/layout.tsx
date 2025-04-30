import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { ThemeProvider } from "@/components/theme-provider"

export const metadata: Metadata = {
  title: "Land Dispute Resolution Portal",
  description: "Official portal for land dispute resolution and property ownership management",
    generator: 'v0.dev'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* Add global script for window.L to avoid TypeScript errors */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.L = window.L || {};
            `,
          }}
        />
      </head>
      <body>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
