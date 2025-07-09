import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Pollify - Create. Vote. Engage.",
  description:
    "Build interactive polls in seconds and get real-time insights from your audience. Perfect for events, classrooms, meetings, and social gatherings.",
  keywords: ["polls", "voting", "real-time", "interactive", "engagement", "surveys"],
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
