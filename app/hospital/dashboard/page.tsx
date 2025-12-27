"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Navbar } from "@/components/layout/navbar"
import { getAuth0Client } from "@/lib/auth0"

export const dynamic = "force-dynamic"

export default function HospitalDashboard() {
  const router = useRouter()
  const [hospitalName, setHospitalName] = useState("")

  useEffect(() => {
    async function guard() {
      const role = localStorage.getItem("userRole")
      const name = localStorage.getItem("userName")
      const client = await getAuth0Client()
      const isAuth = await client.isAuthenticated()
      if (!isAuth || role !== "hospital") {
        router.push("/login?portal=hospital")
        return
      }
      setHospitalName(name || "Hospital")
    }
    guard()
  }, [router])

  const quickStats = [
    { label: "Beds Occupied", value: 24, total: 50, icon: "🏥" },
    { label: "ICU Beds Available", value: 5, total: 10, icon: "🚑" },
    { label: "Emergency Patients", value: 8, icon: "🚨" },
    { label: "Blood Units in Stock", value: 156, icon: "🩸" },
  ]

  const adminLinks = [
    { label: "Manage Beds", href: "/hospital/beds", icon: "🛏️" },
    { label: "Blood Inventory", href: "/hospital/blood", icon: "🩸" },
    { label: "Emergency Queue", href: "/hospital/emergency", icon: "🚨" },
    { label: "Analytics", href: "/hospital/analytics", icon: "📊" },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="max-w-6xl mx-auto px-4 py-12">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-primary mb-2">{hospitalName} - Admin Dashboard</h1>
          <p className="text-muted-foreground">Hospital management and analytics</p>
        </div>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Quick Stats</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickStats.map((stat, index) => (
              <div key={index} className="p-6 bg-card border border-border rounded-lg">
                <div className="text-3xl mb-2">{stat.icon}</div>
                <p className="text-muted-foreground text-sm mb-1">{stat.label}</p>
                <p className="text-2xl font-bold">
                  {stat.value}
                  {stat.total && <span className="text-sm text-muted-foreground">/{stat.total}</span>}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Management Tools</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {adminLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                className="p-6 bg-card border-2 border-border rounded-lg hover:border-primary hover:shadow-lg transition"
              >
                <div className="text-4xl mb-3">{link.icon}</div>
                <h3 className="font-semibold">{link.label}</h3>
              </a>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}
