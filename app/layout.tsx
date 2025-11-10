import type React from "react"
import type { Metadata } from "next"
import { Share_Tech_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const shareTechMono = Share_Tech_Mono({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata: Metadata = {
  title: "Programa Teatro | Grooming & Cibercrimen",
  description: "Programa interactivo de obra de teatro sobre grooming y cibercrimen",
  generator: "v0.app",
  icons: {
    icon: "/cibercrimen.ico",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className="dark">
      <body className={`${shareTechMono.variable} font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
