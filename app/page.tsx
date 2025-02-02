"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Moon, Sun } from "lucide-react"
import { useState } from "react"

export default function Home() {
  const [darkMode, setDarkMode] = useState(true)

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
    document.documentElement.classList.toggle("dark")
  }

  return (
    <div className={`min-h-screen bg-gray-900 text-white transition-colors duration-300 ${darkMode ? "dark" : ""}`}>
      <header className="bg-gray-800/80 backdrop-blur-lg p-4 sticky top-0 z-20">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="h-12 w-48 bg-emerald-700 flex items-center justify-center text-white font-bold">
              Wisdom of the Fans v86
            </div>
          </div>
          <nav className="flex items-center gap-4">
            <Button
              asChild
              variant="ghost"
              className="text-emerald-400 hover:text-emerald-300 hover:bg-gray-700/50 transition-colors duration-300"
            >
              <Link href="/teams">Teams</Link>
            </Button>
            <Button
              asChild
              variant="ghost"
              className="text-emerald-400 hover:text-emerald-300 hover:bg-gray-700/50 transition-colors duration-300"
            >
              <Link href="/polls">Polls</Link>
            </Button>
            <Button variant="ghost" onClick={toggleDarkMode} className="text-emerald-400 hover:text-emerald-300">
              {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
          </nav>
        </div>
      </header>

      <div className="flex pt-16">
        <main className="flex-1 p-4 ml-64">
          <div className="max-w-7xl mx-auto space-y-8">
            <section className="relative text-center space-y-4 py-16">
              <h2 className="text-5xl font-bold text-emerald-400 tracking-tight relative z-10">
                Welcome to Wisdom of the Fans
              </h2>
              <p className="text-xl text-emerald-300 max-w-2xl mx-auto relative z-10">
                Your voice in football matters. Vote on your favorite teams, players, and more!
              </p>
            </section>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <Card className="bg-gray-800/50 backdrop-blur-lg border-emerald-600/50">
                <CardHeader>
                  <CardTitle className="text-emerald-400">Poll of the Week</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-emerald-300">Who will win the Premier League this season?</p>
                </CardContent>
              </Card>

              <Card className="bg-gray-800/50 backdrop-blur-lg border-emerald-600/50">
                <CardHeader>
                  <CardTitle className="text-emerald-400">Top Players</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-emerald-300">
                    <li>Erling Haaland</li>
                    <li>Mohamed Salah</li>
                    <li>Kevin De Bruyne</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-gray-800/50 backdrop-blur-lg border-emerald-600/50">
                <CardHeader>
                  <CardTitle className="text-emerald-400">Team Satisfaction</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-emerald-300">
                    <li>Manchester City - 85%</li>
                    <li>Liverpool - 82%</li>
                    <li>Arsenal - 78%</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}



