import { PollOfTheWeek } from "@/components/PollOfTheWeek"
import { Sidebar } from "@/components/Sidebar"
import { StatisticsDisplay } from "@/components/StatisticsDisplay"
import { TopPlayersByPosition } from "@/components/TopPlayersByPosition"
import { TeamSatisfactionTable } from "@/components/TeamSatisfactionTable"
import { ScoutingTab } from "@/components/ScoutingTab"
import { FloatingFootballs } from "@/components/FloatingFootballs"

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <header className="bg-gray-800/80 backdrop-blur-lg p-4 sticky top-0 z-20">
        <h1 className="text-2xl font-bold text-center">Wisdom of the Fans</h1>
      </header>
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-4">
          <PollOfTheWeek />
          <StatisticsDisplay />
          <TopPlayersByPosition />
          <TeamSatisfactionTable />
          <ScoutingTab />
          <FloatingFootballs />
        </main>
      </div>
    </div>
  )
}

