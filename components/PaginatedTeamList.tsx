"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

interface PaginatedTeamListProps {
  teams: string[]
  teamsPerPage: number
}

export function PaginatedTeamList({ teams, teamsPerPage }: PaginatedTeamListProps) {
  const [currentPage, setCurrentPage] = useState(1)

  const indexOfLastTeam = currentPage * teamsPerPage
  const indexOfFirstTeam = indexOfLastTeam - teamsPerPage
  const currentTeams = teams.slice(indexOfFirstTeam, indexOfLastTeam)

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber)

  return (
    <div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {currentTeams.map((team) => (
          <Link key={team} href={`/teams/${team.toLowerCase().replace(" ", "-")}`}>
            <Button className="w-full bg-emerald-700 hover:bg-emerald-600 text-white">{team}</Button>
          </Link>
        ))}
      </div>
      <div className="mt-4 flex justify-center space-x-2">
        {Array.from({ length: Math.ceil(teams.length / teamsPerPage) }, (_, i) => (
          <Button
            key={i}
            onClick={() => paginate(i + 1)}
            variant={currentPage === i + 1 ? "default" : "outline"}
            className="bg-emerald-700 hover:bg-emerald-600 text-white"
          >
            {i + 1}
          </Button>
        ))}
      </div>
    </div>
  )
}

