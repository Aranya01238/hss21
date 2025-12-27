"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Navbar } from "@/components/layout/navbar"
import { getAuth0Client } from "@/lib/auth0"

export const dynamic = "force-dynamic"

interface EmergencyCase {
  id: number
  patientName: string
  priority: "critical" | "high" | "medium"
  condition: string
  arrivalTime: string
  status: "waiting" | "in-treatment" | "admitted"
}

export default function EmergencyQueue() {
  const router = useRouter()
  const [cases, setCases] = useState<EmergencyCase[]>([])

  useEffect(() => {
    async function guard() {
      const role = localStorage.getItem("userRole")
      const client = await getAuth0Client()
      const isAuth = await client.isAuthenticated()
      if (!isAuth || role !== "hospital") {
        router.push("/login?portal=hospital")
        return
      }
      const mockCases: EmergencyCase[] = [
        {
          id: 1,
          patientName: "Ramesh Gupta",
          priority: "critical",
          condition: "Chest Pain",
          arrivalTime: "14:30",
          status: "in-treatment",
        },
        {
          id: 2,
          patientName: "Anita Sharma",
          priority: "high",
          condition: "Severe Fever",
          arrivalTime: "14:45",
          status: "waiting",
        },
        {
          id: 3,
          patientName: "Vikram Singh",
          priority: "medium",
          condition: "Leg Fracture",
          arrivalTime: "15:00",
          status: "waiting",
        },
      ]
      setCases(mockCases)
    }
    guard()
  }, [router])

  const updateStatus = (id: number, newStatus: EmergencyCase["status"]) => {
    setCases(cases.map((c) => (c.id === id ? { ...c, status: newStatus } : c)))
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="max-w-6xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-primary mb-8">Emergency Queue</h1>

        <div className="space-y-4">
          {cases.map((case_) => (
            <div
              key={case_.id}
              className={`p-6 border-2 rounded-lg ${
                case_.priority === "critical"
                  ? "border-destructive bg-destructive/5"
                  : case_.priority === "high"
                    ? "border-orange-500 bg-orange-500/5"
                    : "border-yellow-500 bg-yellow-500/5"
              }`}
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold">{case_.patientName}</h3>
                  <p className="text-muted-foreground">{case_.condition}</p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    case_.priority === "critical"
                      ? "bg-destructive/20 text-destructive"
                      : case_.priority === "high"
                        ? "bg-orange-500/20 text-orange-700"
                        : "bg-yellow-500/20 text-yellow-700"
                  }`}
                >
                  {case_.priority.toUpperCase()}
                </span>
              </div>

              <p className="text-sm text-muted-foreground mb-4">Arrival: {case_.arrivalTime}</p>

              <div className="flex gap-2">
                <select
                  value={case_.status}
                  onChange={(e) => updateStatus(case_.id, e.target.value as EmergencyCase["status"])}
                  className="flex-1 px-3 py-2 border border-border rounded focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="waiting">Waiting</option>
                  <option value="in-treatment">In Treatment</option>
                  <option value="admitted">Admitted</option>
                </select>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}
