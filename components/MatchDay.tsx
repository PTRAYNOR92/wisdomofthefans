"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Player {
  id: string
  name: string
  position: string
}

interface MatchData {
  homeTeam: string
  awayTeam: string
  startingXI: Player[]
  substitutes: Player[]
  events: {
    type: "goal" | "substitution" | "card"
    player: string
    minute: number
    details?: string
  }[]
}

// This would be replaced with actual API call
const fetchMatchData = async (): Promise<MatchData> => {
  // Simulating API delay
  await new Promise((resolve) => setTimeout(resolve, 1000))
  return {
    homeTeam: "Manchester United",
    awayTeam: "Liverpool",
    startingXI: [
      { id: "1", name: "David de Gea", position: "GK" },
      { id: "2", name: "Aaron Wan-Bissaka", position: "RB" },
      // ... other players
    ],
    substitutes: [
      { id: "12", name: "Tom Heaton", position: "GK" },
      // ... other substitutes
    ],
    events: [
      { type: "goal", player: "Bruno Fernandes", minute: 23 },
      { type: "substitution", player: "Marcus Rashford", minute: 65, details: "for Anthony Martial" },
      // ... other events
    ],
  }
}

export default function MatchDay() {
  const [matchData, setMatchData] = useState<MatchData | null>(null)
  const [loading, setLoading] = useState(true)
  const [playerRatings, setPlayerRatings] = useState<{ [key: string]: number }>({})
  const [isRunning, setIsRunning] = useState(false)

  const start = () => setIsRunning(true)
  const pause = () => setIsRunning(false)

  useEffect(() => {
    fetchMatchData().then((data) => {
      setMatchData(data)
      setLoading(false)
    })
  }, [])

  const handleRating = (playerId: string, rating: number) => {
    setPlayerRatings((prev) => ({ ...prev, [playerId]: rating }))
  }

  if (loading) return <div className="text-emerald-400">Loading match data...</div>
  if (!matchData) return <div className="text-emerald-400">No match data available</div>

  return (
    <Card className="bg-emerald-900/30 backdrop-blur-lg shadow-lg border-emerald-600/50">
      <CardHeader>
        <CardTitle className="text-emerald-400 text-2xl">
          Live Match: {matchData.homeTeam} vs {matchData.awayTeam}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="text-xl font-semibold mb-4 text-emerald-400">Starting XI</h3>
          {matchData.startingXI.map((player) => (
            <div key={player.id} className="mb-2 flex items-center justify-between">
              <span className="text-emerald-300">
                {player.name} ({player.position})
              </span>
              <Select onValueChange={(value) => handleRating(player.id, Number(value))}>
                <SelectTrigger className="w-[100px] bg-emerald-800/50 text-emerald-300 border-emerald-600/50">
                  <SelectValue placeholder="Rate" />
                </SelectTrigger>
                <SelectContent>
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((rating) => (
                    <SelectItem key={rating} value={rating.toString()}>
                      {rating}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          ))}
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-4 text-emerald-400">Substitutes</h3>
          {matchData.substitutes.map((player) => (
            <div key={player.id} className="text-emerald-300">
              {player.name} ({player.position})
            </div>
          ))}
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-4 text-emerald-400">Match Events</h3>
          {matchData.events.map((event, index) => (
            <div key={index} className="text-emerald-300">
              {event.minute}': {event.type === "goal" ? "⚽" : event.type === "substitution" ? "🔄" : "🟨"}
              {event.player} {event.details ? `(${event.details})` : ""}
            </div>
          ))}
        </div>
        <Button onClick={isRunning ? pause : start} className="bg-emerald-600 text-emerald-100 hover:bg-emerald-700">
          {isRunning ? "Pause" : "Start"}
        </Button>
      </CardContent>
    </Card>
  )
}

