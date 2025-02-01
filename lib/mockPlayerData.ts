type PlayerData = {
  [team: string]: {
    [player: string]: {
      seasonRating: number
    }
  }
}

export const mockPlayerData: PlayerData = {
  "Manchester United": {
    "David de Gea": { seasonRating: 7.2 },
    "Harry Maguire": { seasonRating: 6.8 },
    "Luke Shaw": { seasonRating: 7.5 },
    "Bruno Fernandes": { seasonRating: 8.1 },
    "Marcus Rashford": { seasonRating: 7.9 },
  },
  Liverpool: {
    Alisson: { seasonRating: 7.8 },
    "Virgil van Dijk": { seasonRating: 7.6 },
    "Trent Alexander-Arnold": { seasonRating: 7.9 },
    "Mohamed Salah": { seasonRating: 8.3 },
    "Sadio Mané": { seasonRating: 8.0 },
  },
  // Add more teams and players as needed
}

export function getPlayerRating(team: string, player: string): number | null {
  return mockPlayerData[team]?.[player]?.seasonRating || null
}

