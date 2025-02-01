import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { getPlayerRating } from "@/lib/mockPlayerData"
import { CircularProgress } from "./CircularProgress"

// Mock data for most picked players - in a real app, this would come from an API
const mockMostPickedPlayers = {
  "4-3-3": [
    "De Gea",
    "Wan-Bissaka",
    "Maguire",
    "Varane",
    "Shaw",
    "Casemiro",
    "Fernandes",
    "Eriksen",
    "Sancho",
    "Rashford",
    "Antony",
  ],
}

const formations = {
  "4-4-2": [
    { top: "90%", left: "50%" },
    { top: "70%", left: "20%" },
    { top: "70%", left: "40%" },
    { top: "70%", left: "60%" },
    { top: "70%", left: "80%" },
    { top: "45%", left: "20%" },
    { top: "45%", left: "40%" },
    { top: "45%", left: "60%" },
    { top: "45%", left: "80%" },
    { top: "20%", left: "35%" },
    { top: "20%", left: "65%" },
  ],
  "4-3-3": [
    { top: "90%", left: "50%" },
    { top: "70%", left: "20%" },
    { top: "70%", left: "50%" },
    { top: "70%", left: "80%" },
    { top: "45%", left: "30%" },
    { top: "45%", left: "50%" },
    { top: "45%", left: "70%" },
    { top: "20%", left: "20%" },
    { top: "20%", left: "50%" },
    { top: "20%", left: "80%" },
  ],
  "3-5-2": [
    { top: "90%", left: "50%" },
    { top: "70%", left: "30%" },
    { top: "70%", left: "50%" },
    { top: "70%", left: "70%" },
    { top: "45%", left: "20%" },
    { top: "45%", left: "35%" },
    { top: "45%", left: "50%" },
    { top: "45%", left: "65%" },
    { top: "45%", left: "80%" },
    { top: "20%", left: "35%" },
    { top: "20%", left: "65%" },
  ],
  "4-2-3-1": [
    { top: "90%", left: "50%" },
    { top: "70%", left: "20%" },
    { top: "70%", left: "40%" },
    { top: "70%", left: "60%" },
    { top: "70%", left: "80%" },
    { top: "50%", left: "35%" },
    { top: "50%", left: "65%" },
    { top: "30%", left: "25%" },
    { top: "30%", left: "50%" },
    { top: "30%", left: "75%" },
    { top: "10%", left: "50%" },
  ],
  "3-4-3": [
    { top: "90%", left: "50%" },
    { top: "70%", left: "30%" },
    { top: "70%", left: "50%" },
    { top: "70%", left: "70%" },
    { top: "45%", left: "20%" },
    { top: "45%", left: "40%" },
    { top: "45%", left: "60%" },
    { top: "45%", left: "80%" },
    { top: "20%", left: "25%" },
    { top: "20%", left: "50%" },
    { top: "20%", left: "75%" },
  ],
  "5-3-2": [
    { top: "90%", left: "50%" },
    { top: "70%", left: "20%" },
    { top: "70%", left: "35%" },
    { top: "70%", left: "50%" },
    { top: "70%", left: "65%" },
    { top: "70%", left: "80%" },
    { top: "45%", left: "30%" },
    { top: "45%", left: "50%" },
    { top: "45%", left: "70%" },
    { top: "20%", left: "35%" },
    { top: "20%", left: "65%" },
  ],
}

const positionLabels = {
  "4-4-2": ["GK", "LB", "CB", "CB", "RB", "LM", "CM", "CM", "RM", "ST", "ST"],
  "4-3-3": ["GK", "LB", "CB", "CB", "RB", "DM", "CM", "CM", "LW", "ST", "RW"],
  "3-5-2": ["GK", "CB", "CB", "CB", "LWB", "CM", "CM", "CM", "RWB", "ST", "ST"],
  "4-2-3-1": ["GK", "LB", "CB", "CB", "RB", "DM", "DM", "LM", "AM", "RM", "ST"],
  "3-4-3": ["GK", "CB", "CB", "CB", "LM", "CM", "CM", "RM", "LW", "ST", "RW"],
  "5-3-2": ["GK", "LWB", "CB", "CB", "CB", "RWB", "CM", "CM", "CM", "ST", "ST"],
}

interface PitchGraphicProps {
  formation: string
  teamName: string
}

export default function PitchGraphic({ formation, teamName }: PitchGraphicProps) {
  const [selectedPositions, setSelectedPositions] = useState<{ [key: number]: string }>({})
  const [mostPickedPlayers, setMostPickedPlayers] = useState<string[]>([])

  useEffect(() => {
    setMostPickedPlayers(mockMostPickedPlayers[formation] || [])
  }, [formation])

  const handlePositionClick = (index: number) => {
    setSelectedPositions((prev) => ({ ...prev, [index]: mostPickedPlayers[index] || "" }))
  }

  const handlePlayerSubmit = (index: number, player: string) => {
    setSelectedPositions((prev) => ({ ...prev, [index]: player }))
  }

  return (
    <div className="relative w-full h-[24rem] bg-emerald-900/30 rounded-lg overflow-hidden border border-emerald-600/50">
      {/* Stadium effect */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-emerald-900 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-emerald-900 to-transparent" />
        {/* Floodlights */}
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="absolute top-0 w-1 h-12 bg-emerald-400/20" style={{ left: `${25 + i * 16.66}%` }}>
            <div className="absolute bottom-0 w-12 h-12 bg-emerald-400/10 blur-xl rounded-full transform -translate-x-1/2" />
          </div>
        ))}
      </div>

      {/* Pitch surface */}
      <div className="absolute inset-8 bg-gradient-to-b from-emerald-700/20 to-emerald-600/20 rounded-lg border border-emerald-400/20">
        {/* Center circle */}
        <div className="absolute top-1/2 left-1/2 w-24 h-24 border border-emerald-400/20 rounded-full transform -translate-x-1/2 -translate-y-1/2" />
        {/* Center line */}
        <div className="absolute top-0 bottom-0 left-1/2 w-0.5 bg-emerald-400/20" />
      </div>

      {/* Player positions */}
      {formations[formation].map((position, index) => {
        const player = selectedPositions[index] || mostPickedPlayers[index]
        const rating = player ? getPlayerRating(teamName, player) : null

        return (
          <Dialog key={index}>
            <DialogTrigger asChild>
              <Button
                className="absolute transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-emerald-700/50 hover:bg-emerald-600/50 text-emerald-100 backdrop-blur-sm flex flex-col items-center justify-center transition-all duration-200"
                style={{ top: position.top, left: position.left }}
                onClick={() => handlePositionClick(index)}
              >
                <span className="font-bold text-xs">{positionLabels[formation][index]}</span>
                {player && (
                  <>
                    <span className="text-[10px] max-w-[50px] truncate">{player}</span>
                    {rating && (
                      <CircularProgress value={rating * 10} size={24} strokeWidth={2} className="text-emerald-400" />
                    )}
                  </>
                )}
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-emerald-900/95 border-emerald-600/50">
              <DialogHeader>
                <DialogTitle className="text-emerald-400">
                  Select Player for {positionLabels[formation][index]}
                </DialogTitle>
              </DialogHeader>
              <PlayerSelector onSubmit={(player) => handlePlayerSubmit(index, player)} />
            </DialogContent>
          </Dialog>
        )
      })}
    </div>
  )
}

function PlayerSelector({ onSubmit }: { onSubmit: (player: string) => void }) {
  const [player, setPlayer] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(player)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        type="text"
        placeholder="Enter player name"
        value={player}
        onChange={(e) => setPlayer(e.target.value)}
        className="bg-emerald-800/50 border-emerald-600/50 text-emerald-100 placeholder-emerald-400"
      />
      <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700 text-emerald-100">
        Submit
      </Button>
    </form>
  )
}

