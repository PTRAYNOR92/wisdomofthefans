"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"

export default function ManchesterUnitedPage() {
  const [managerRating, setManagerRating] = useState(0)
  const [playerRatings, setPlayerRatings] = useState({
    "Marcus Rashford": 0,
    "Bruno Fernandes": 0,
    "Harry Maguire": 0,
    "David de Gea": 0,
    "Luke Shaw": 0,
  })
  const [formation, setFormation] = useState("")

  const handleManagerVote = () => {
    console.log(`Voted ${managerRating} for Manchester United's manager`)
    // In a real app, this would send the vote to your backend
  }

  const handlePlayerVote = (player: string, rating: number) => {
    setPlayerRatings((prev) => ({ ...prev, [player]: rating }))
    console.log(`Voted ${rating} for ${player}`)
    // In a real app, this would send the vote to your backend
  }

  const handleFormationVote = () => {
    console.log(`Voted for ${formation} formation`)
    // In a real app, this would send the vote to your backend
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <header className="bg-red-600 text-white p-4 rounded-lg mb-4 flex items-center">
        <Image src="/man-utd-logo.png" alt="Manchester United Logo" width={50} height={50} className="mr-4" />
        <h1 className="text-3xl font-bold">Manchester United</h1>
      </header>

      <main className="space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4">Rate the Manager</h2>
          <div className="flex items-center space-x-2 mb-4">
            {[1, 2, 3, 4, 5].map((rating) => (
              <Button
                key={rating}
                onClick={() => setManagerRating(rating)}
                variant={managerRating === rating ? "default" : "outline"}
              >
                {rating}
              </Button>
            ))}
          </div>
          <Button onClick={handleManagerVote}>Submit Manager Rating</Button>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Rate Top Players</h2>
          {Object.entries(playerRatings).map(([player, rating]) => (
            <div key={player} className="mb-4">
              <h3 className="text-xl mb-2">{player}</h3>
              <div className="flex items-center space-x-2 mb-2">
                {[1, 2, 3, 4, 5].map((r) => (
                  <Button
                    key={r}
                    onClick={() => handlePlayerVote(player, r)}
                    variant={rating === r ? "default" : "outline"}
                  >
                    {r}
                  </Button>
                ))}
              </div>
            </div>
          ))}
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Vote for Favorite Formation</h2>
          <div className="flex items-center space-x-2 mb-4">
            {["4-4-2", "4-3-3", "3-5-2", "4-2-3-1"].map((f) => (
              <Button key={f} onClick={() => setFormation(f)} variant={formation === f ? "default" : "outline"}>
                {f}
              </Button>
            ))}
          </div>
          <Button onClick={handleFormationVote}>Submit Formation Vote</Button>
        </section>
      </main>
    </div>
  )
}

