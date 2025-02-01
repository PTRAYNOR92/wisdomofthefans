import { NextResponse } from "next/server"
import { sql } from "@vercel/postgres"

export async function POST(request: Request) {
  const { team, category, value } = await request.json()

  try {
    await sql`
      INSERT INTO votes (team, category, value)
      VALUES (${team}, ${category}, ${value})
    `
    return NextResponse.json({ message: "Vote recorded successfully" }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to record vote" }, { status: 500 })
  }
}

