import type React from "react";
import "./globals.css";
import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider";
import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";

export const metadata: Metadata = {
  title: "Land Dispute Resolution Portal",
  description:
    "Official portal for land dispute resolution and property ownership management",
  generator: "v0.dev",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
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
            <SignedIn>
              {/* Render the app for signed-in users */}
              <UserButton />
              {children}
            </SignedIn>
            <SignedOut>
              {/* Render sign-in and sign-up buttons for signed-out users */}
              <div>
                <SignInButton />
                <SignUpButton />
              </div>
            </SignedOut>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
