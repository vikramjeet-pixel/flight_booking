import { createClient } from "@/utils/supabase/server"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const supabase = createClient()

    // Create bookings table
    const { error: bookingsError } = await supabase.rpc("create_bookings_table", {})

    if (bookingsError) {
      throw bookingsError
    }

    return NextResponse.json({ success: true, message: "Database setup complete" })
  } catch (error) {
    console.error("Error setting up database:", error)
    return NextResponse.json({ success: false, error: "Failed to set up database" }, { status: 500 })
  }
}

