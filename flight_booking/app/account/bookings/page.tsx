import { createClient } from "@/utils/supabase/server"
import { redirect } from "next/navigation"

export default async function BookingsPage() {
  const supabase = createClient()
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    redirect("/auth/login?redirectUrl=/account/bookings")
  }

  // Fetch bookings from Supabase
  const { data: bookings, error } = await supabase
    .from("bookings")
    .select("*")
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching bookings:", error)
  }

  // Filter bookings by status
  const upcomingBookings = bookings?.filter((booking) => booking.status === "confirmed") || []
  const pastBookings = bookings?.filter((booking) => booking.status === "completed") || []
  const cancelledBookings = bookings?.filter((booking) => booking.status === "cancelled") || []

  return (
    <div>
      <h1>Bookings</h1>
      <h2>Upcoming Bookings</h2>
      <ul>
        {upcomingBookings.map((booking) => (
          <li key={booking.id}>
            Booking ID: {booking.id}, Status: {booking.status}
          </li>
        ))}
      </ul>

      <h2>Past Bookings</h2>
      <ul>
        {pastBookings.map((booking) => (
          <li key={booking.id}>
            Booking ID: {booking.id}, Status: {booking.status}
          </li>
        ))}
      </ul>

      <h2>Cancelled Bookings</h2>
      <ul>
        {cancelledBookings.map((booking) => (
          <li key={booking.id}>
            Booking ID: {booking.id}, Status: {booking.status}
          </li>
        ))}
      </ul>
    </div>
  )
}

