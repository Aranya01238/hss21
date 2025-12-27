"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Navbar } from "@/components/layout/navbar"

export const dynamic = "force-dynamic"

interface Bed {
  id: number
  type: string
  status: "available" | "occupied" | "maintenance"
  patientName?: string
}

export default function BedManagement() {
  const router = useRouter()
  const [beds, setBeds] = useState<Bed[]>([])

  useEffect(() => {
    const role = localStorage.getItem("userRole")
    if (role !== "hospital") {
      router.push("/login")
    } else {
      const mockBeds: Bed[] = [
        { id: 1, type: "Regular", status: "available" },
        { id: 2, type: "Regular", status: "occupied", patientName: "Rajesh Kumar" },
        { id: 3, type: "ICU", status: "occupied", patientName: "Priya Singh" },
        { id: 4, type: "ICU", status: "available" },
        { id: 5, type: "Regular", status: "maintenance" },
        { id: 6, type: "Regular", status: "available" },
      ]
      setBeds(mockBeds)
    }
  }, [router])

  const updateBedStatus = (id: number) => {
    setBeds(
      beds.map((bed) =>
        bed.id === id
          ? {
              ...bed,
              status: bed.status === "available" ? "occupied" : bed.status === "occupied" ? "maintenance" : "available",
            }
          : bed,
      ),
    )
  }

  const availableCount = beds.filter((b) => b.status === "available").length
  const occupiedCount = beds.filter((b) => b.status === "occupied").length

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="max-w-6xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-primary mb-8">Bed Management</h1>

        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="p-4 bg-green-500/20 rounded-lg">
            <p className="text-sm text-muted-foreground">Available</p>
            <p className="text-2xl font-bold text-green-600">{availableCount}</p>
          </div>
          <div className="p-4 bg-red-500/20 rounded-lg">
            <p className="text-sm text-muted-foreground">Occupied</p>
            <p className="text-2xl font-bold text-red-600">{occupiedCount}</p>
          </div>
          <div className="p-4 bg-yellow-500/20 rounded-lg">
            <p className="text-sm text-muted-foreground">Total Beds</p>
            <p className="text-2xl font-bold text-yellow-600">{beds.length}</p>
          </div>
        </div>

        <div className="space-y-2">
          {beds.map((bed) => (
            <div
              key={bed.id}
              className={`p-4 border border-border rounded-lg flex justify-between items-center ${
                bed.status === "available"
                  ? "bg-green-500/10"
                  : bed.status === "occupied"
                    ? "bg-red-500/10"
                    : "bg-yellow-500/10"
              }`}
            >
              <div>
                <p className="font-semibold">
                  Bed {bed.id} ({bed.type})
                </p>
                {bed.patientName && <p className="text-sm text-muted-foreground">Patient: {bed.patientName}</p>}
              </div>
              <div className="flex gap-2 items-center">
                <span
                  className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    bed.status === "available"
                      ? "bg-green-500/30 text-green-700"
                      : bed.status === "occupied"
                        ? "bg-red-500/30 text-red-700"
                        : "bg-yellow-500/30 text-yellow-700"
                  }`}
                >
                  {bed.status.toUpperCase()}
                </span>
                <button
                  onClick={() => updateBedStatus(bed.id)}
                  className="px-3 py-1 bg-primary text-primary-foreground rounded text-sm hover:bg-primary/90"
                >
                  Update
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}
