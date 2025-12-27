"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Navbar } from "@/components/layout/navbar"
import { getAuth0Client } from "@/lib/auth0"

export const dynamic = "force-dynamic"

export default function Analytics() {
  const router = useRouter()

  useEffect(() => {
    async function guard() {
      const role = localStorage.getItem("userRole")
      const client = await getAuth0Client()
      const isAuth = await client.isAuthenticated()
      if (!isAuth || role !== "hospital") {
        router.push("/login?portal=hospital")
      }
    }
    guard()
  }, [router])

  const metrics = [
    { label: "Daily Patients", value: 127, change: "+12%" },
    { label: "Bed Utilization", value: "78%", change: "+5%" },
    { label: "Average Wait Time", value: "24 min", change: "-3 min" },
    { label: "Emergency Cases", value: 18, change: "+2" },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="max-w-6xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-primary mb-8">Analytics Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {metrics.map((metric, index) => (
            <div key={index} className="p-6 bg-card border border-border rounded-lg">
              <p className="text-sm text-muted-foreground mb-2">{metric.label}</p>
              <p className="text-3xl font-bold mb-2">{metric.value}</p>
              <p className="text-sm text-green-600 font-semibold">{metric.change}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="p-6 bg-card border border-border rounded-lg">
            <h3 className="text-xl font-bold mb-4">Bed Occupancy Trend</h3>
            <div className="h-40 bg-secondary/30 rounded flex items-center justify-center text-muted-foreground">
              Chart placeholder - Connect to backend for live data
            </div>
          </div>

          <div className="p-6 bg-card border border-border rounded-lg">
            <h3 className="text-xl font-bold mb-4">Patient Demographics</h3>
            <div className="h-40 bg-secondary/30 rounded flex items-center justify-center text-muted-foreground">
              Chart placeholder - Connect to backend for live data
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
