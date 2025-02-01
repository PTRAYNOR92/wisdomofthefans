import "./globals.css"
import { Inter } from "next/font/google"
import type React from "react"
import { Sidebar } from "@/components/Sidebar"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Wisdom of the Fans",
  description: "Your voice in football matters",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex">
          <Sidebar />
          <main className="flex-1 ml-64">{children}</main>
        </div>
      </body>
    </html>
  )
}




