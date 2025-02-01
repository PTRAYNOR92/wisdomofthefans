import Link from "next/link"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

const premierLeagueTeams = [
  "Arsenal",
  "Aston Villa",
  "Bournemouth",
  "Brentford",
  "Brighton",
  "Chelsea",
  "Crystal Palace",
  "Everton",
  "Fulham",
  "Ipswich Town",
  "Leicester",
  "Liverpool",
  "Manchester City",
  "Manchester United",
  "Newcastle",
  "Nottingham Forest",
  "Southampton",
  "Tottenham",
  "West Ham",
  "Wolverhampton",
]

export function Sidebar() {
  return (
    <motion.div
      initial={{ x: -250 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gray-800/80 backdrop-blur-lg p-4 h-[calc(100vh-4rem)] overflow-y-auto w-64 fixed left-0 top-16"
    >
      <h2 className="text-2xl font-bold text-emerald-400 mb-6">Teams</h2>
      <div className="space-y-2">
        {premierLeagueTeams.map((team) => (
          <motion.div key={team} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link href={`/teams/${team.toLowerCase().replace(" ", "-")}`} passHref>
              <Button
                variant="ghost"
                className="w-full justify-start text-sm text-emerald-300 hover:text-emerald-100 hover:bg-gray-700/50"
              >
                {team}
              </Button>
            </Link>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

