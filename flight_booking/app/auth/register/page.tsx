import { redirect } from "next/navigation"
import { createClient } from "@/utils/supabase/server"
import { RegisterForm } from "@/components/auth/register-form"

export default async function RegisterPage({
  searchParams,
}: {
  searchParams: { message?: string; redirectUrl?: string }
}) {
  const supabase = createClient()
  const {
    data: { session },
  } = await supabase.auth.getSession()

  // If user is already logged in, redirect to the home page
  if (session) {
    redirect("/")
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">Create a new account</h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
          <RegisterForm redirectUrl={searchParams.redirectUrl} message={searchParams.message} />
        </div>
      </div>
    </div>
  )
}

