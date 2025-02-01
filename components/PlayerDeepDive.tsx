import { useState, useEffect } from "react"
import { Slider } from "@/components/ui/slider"
import { Card, CardContent } from "@/components/ui/card"
import AttributeSelector from "@/components/AttributeSelector"
import PlayerAttributeChart from "@/components/PlayerAttributeChart"
import { CircularProgress } from "@/components/ui/circular-progress"

interface PlayerDeepDiveProps {
  player: string
  isGoalkeeper: boolean
  attributes: string[]
}

// Mock data - in a real app, this would come from an API
const mockPlayerData = {
  seasonPerformance: 7.5,
  lastGamePerformance: 8.0,
  bestAttributes: ["Pace", "Dribbling", "Shooting"],
  areasToImprove: ["Defensive positioning", "Tackling", "Aerial duels"],
  status: "Important First Team Player",
  attributeValues: [7, 8, 6, 9, 5, 8, 7, 6, 8, 9],
  totalVotes: 500,
}

export default function PlayerDeepDive({ player, isGoalkeeper, attributes }: PlayerDeepDiveProps) {
  const [playerData, setPlayerData] = useState(mockPlayerData)

  useEffect(() => {
    // In a real app, this would be an API call to fetch player data
    setPlayerData(mockPlayerData)
  }, [])

  const handleVote = (category: string, value: number | string[]) => {
    // In a real app, this would be an API call to record the vote
    setPlayerData((prev) => ({
      ...prev,
      [category]:
        typeof value === "number" ? (prev[category] * prev.totalVotes + value) / (prev.totalVotes + 1) : value,
      totalVotes: prev.totalVotes + 1,
    }))
  }

  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="bg-emerald-900/30 backdrop-blur-lg p-4 rounded-lg border-emerald-600/50">
          <CardContent>
            <label className="block mb-2 text-emerald-400">
              Season Performance (Current: {playerData.seasonPerformance.toFixed(1)})
            </label>
            <Slider
              defaultValue={[5]}
              max={10}
              step={0.1}
              className="bg-emerald-700"
              onValueCommit={(value) => handleVote("seasonPerformance", value[0])}
            />
          </CardContent>
        </Card>
        <Card className="bg-emerald-900/30 backdrop-blur-lg p-4 rounded-lg border-emerald-600/50">
          <CardContent>
            <label className="block mb-2 text-emerald-400">
              Last Game Performance (Current: {playerData.lastGamePerformance.toFixed(1)})
            </label>
            <Slider
              defaultValue={[5]}
              max={10}
              step={0.1}
              className="bg-emerald-700"
              onValueCommit={(value) => handleVote("lastGamePerformance", value[0])}
            />
          </CardContent>
        </Card>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
        <CircularProgress value={playerData.seasonPerformance * 10} className="text-emerald-400" />
        <CircularProgress value={playerData.lastGamePerformance * 10} className="text-emerald-400" />
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <AttributeSelector
          selected={playerData.bestAttributes}
          onSelect={(selected) => handleVote("bestAttributes", selected)}
          maxSelect={3}
          attributes={attributes}
          label="Best Attributes"
        />
        <AttributeSelector
          selected={playerData.areasToImprove}
          onSelect={(selected) => handleVote("areasToImprove", selected)}
          maxSelect={3}
          attributes={attributes}
          label="Areas to Improve"
        />
      </div>
      <Card className="bg-emerald-900/30 backdrop-blur-lg p-4 rounded-lg border-emerald-600/50">
        <CardContent>
          <label className="block mb-2 text-emerald-400 font-semibold">Player Status: {playerData.status}</label>
          {/* Add voting mechanism for player status here */}
        </CardContent>
      </Card>
      <Card className="bg-emerald-900/30 p-4 rounded-lg border-emerald-600/50">
        <CardContent>
          <PlayerAttributeChart attributes={attributes} values={playerData.attributeValues} />
        </CardContent>
      </Card>
      <div className="text-sm text-emerald-400">Total votes: {playerData.totalVotes}</div>
    </div>
  )
}

