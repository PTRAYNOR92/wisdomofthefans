"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import PitchGraphic from "@/components/PitchGraphic"
import PlayerDeepDive from "@/components/PlayerDeepDive"
import MatchDay from "@/components/MatchDay"
import { CircularProgress } from "@/components/CircularProgress"
import { StarRating } from "@/components/StarRating"

const outfieldAttributes = [
  "Pace",
  "Shooting",
  "Passing",
  "Dribbling",
  "Physical",
  "Tackling",
  "Defensive heading",
  "Defensive positioning",
  "Composure",
  "Short passing",
  "Long passing",
  "First Touch",
  "Finishing",
  "Stamina",
  "Attacking heading",
  "Strength",
  "Long shots",
  "Crossing",
]

const goalkeeperAttributes = [
  "Reflexes",
  "Diving",
  "Handling",
  "Kicking",
  "Positioning",
  "Composure",
  "First Touch",
  "Passing",
  "Strength",
  "Aerial Reach",
]

// Mock data - in a real app, this would come from an API
const mockTeamData = {
  managerSatisfaction: 7.2,
  teamPerformance: 6.8,
  ownershipSatisfaction: 5.5,
  transferActivity: 68,
  totalVotes: 1000,
  teamSpirit: 75,
  fanAtmosphere: 82,
  youthDevelopment: 71,
  stadiumExperience: {
    tickets: 3,
    catering: 4,
    atmosphere: 5,
    transport: 3,
  },
}

export default function TeamPage({ params }: { params: { team: string } }) {
  const [teamData, setTeamData] = useState(mockTeamData)
  const [formation, setFormation] = useState("4-3-3")
  const [selectedPlayer, setSelectedPlayer] = useState("")
  const [isGoalkeeper, setIsGoalkeeper] = useState(false)

  useEffect(() => {
    // In a real app, this would be an API call
    setTeamData(mockTeamData)
  }, [])

  const handleVote = (category: string, value: number) => {
    // In a real app, this would be an API call to record the vote
    setTeamData((prev) => ({
      ...prev,
      [category]: (prev[category] * prev.totalVotes + value) / (prev.totalVotes + 1),
      totalVotes: prev.totalVotes + 1,
    }))
  }

  const handleStadiumRating = (category: string, rating: number) => {
    // In a real app, this would be an API call to record the rating
    setTeamData((prev) => ({
      ...prev,
      stadiumExperience: {
        ...prev.stadiumExperience,
        [category]: rating,
      },
    }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-emerald-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <h1 className="text-4xl font-bold mb-8 text-center tracking-wider text-emerald-400">
          {params.team.toUpperCase()}
        </h1>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="players">Players</TabsTrigger>
            <TabsTrigger value="matchday">Match Day</TabsTrigger>
            <TabsTrigger value="stadium">Stadium</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="grid gap-8 md:grid-cols-2">
              <Card className="bg-emerald-900/30 backdrop-blur-lg shadow-lg border-emerald-600/50">
                <CardHeader>
                  <CardTitle className="text-emerald-400">Overall Satisfaction</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                      {
                        label: "MANAGER SATISFACTION",
                        value: teamData.managerSatisfaction * 10,
                        category: "managerSatisfaction",
                      },
                      { label: "TEAM PERFORMANCE", value: teamData.teamPerformance * 10, category: "teamPerformance" },
                      {
                        label: "OWNERSHIP SATISFACTION",
                        value: teamData.ownershipSatisfaction * 10,
                        category: "ownershipSatisfaction",
                      },
                      { label: "TRANSFER ACTIVITY", value: teamData.transferActivity, category: "transferActivity" },
                    ].map((stat, index) => (
                      <div key={index} className="flex flex-col items-center">
                        <CircularProgress value={stat.value} size={80} strokeWidth={8} className="text-emerald-400" />
                        <p className="mt-2 text-xs tracking-wider text-center text-emerald-400 font-medium">
                          {stat.label}
                        </p>
                        <Slider
                          defaultValue={[stat.value]}
                          max={100}
                          step={1}
                          onValueCommit={(value) => handleVote(stat.category, value[0])}
                          className="w-full mt-2 bg-emerald-900/50"
                        />
                      </div>
                    ))}
                  </div>
                  <div className="text-sm text-emerald-400 mt-4 text-center">Total votes: {teamData.totalVotes}</div>
                </CardContent>
              </Card>

              <Card className="bg-emerald-900/30 backdrop-blur-lg shadow-lg border-emerald-600/50">
                <CardHeader>
                  <CardTitle className="text-emerald-400">Preferred XI</CardTitle>
                </CardHeader>
                <CardContent>
                  <Select value={formation} onValueChange={setFormation}>
                    <SelectTrigger className="w-full mb-4 bg-emerald-900/30 text-emerald-100 border-emerald-600/50">
                      <SelectValue placeholder="Select formation" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="4-4-2">4-4-2</SelectItem>
                      <SelectItem value="4-3-3">4-3-3</SelectItem>
                      <SelectItem value="3-5-2">3-5-2</SelectItem>
                      <SelectItem value="4-2-3-1">4-2-3-1</SelectItem>
                      <SelectItem value="3-4-3">3-4-3</SelectItem>
                      <SelectItem value="5-3-2">5-3-2</SelectItem>
                    </SelectContent>
                  </Select>
                  <PitchGraphic formation={formation} teamName={params.team} />
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="players">
            <Card className="bg-emerald-900/30 backdrop-blur-lg shadow-lg border-emerald-600/50">
              <CardHeader>
                <CardTitle className="text-emerald-400">Player Deep Dive</CardTitle>
              </CardHeader>
              <CardContent>
                <Select
                  value={selectedPlayer}
                  onValueChange={(value) => {
                    setSelectedPlayer(value)
                    setIsGoalkeeper(value === "gk")
                  }}
                >
                  <SelectTrigger className="w-full mb-4 bg-emerald-900/30 text-emerald-100 border-emerald-600/50">
                    <SelectValue placeholder="Select player" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="gk">Goalkeeper</SelectItem>
                    <SelectItem value="player1">Player 1</SelectItem>
                    <SelectItem value="player2">Player 2</SelectItem>
                    <SelectItem value="player3">Player 3</SelectItem>
                  </SelectContent>
                </Select>
                {selectedPlayer && (
                  <PlayerDeepDive
                    player={selectedPlayer}
                    isGoalkeeper={isGoalkeeper}
                    attributes={isGoalkeeper ? goalkeeperAttributes : outfieldAttributes}
                  />
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="matchday">
            <MatchDay />
          </TabsContent>

          <TabsContent value="stadium">
            <Card className="bg-emerald-900/30 backdrop-blur-lg shadow-lg border-emerald-600/50">
              <CardHeader>
                <CardTitle className="text-emerald-400">Stadium Experience</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {[
                    { label: "Tickets - Value for Money", category: "tickets" },
                    { label: "Catering", category: "catering" },
                    { label: "Atmosphere", category: "atmosphere" },
                    { label: "Transport Links", category: "transport" },
                  ].map((item) => (
                    <div key={item.category} className="flex flex-col items-center">
                      <h3 className="text-lg font-semibold mb-2 text-emerald-400">{item.label}</h3>
                      <StarRating
                        initialRating={teamData.stadiumExperience[item.category]}
                        onRatingChange={(rating) => handleStadiumRating(item.category, rating)}
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

