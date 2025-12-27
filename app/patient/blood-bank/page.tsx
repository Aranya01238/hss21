"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Navbar } from "@/components/layout/navbar"

export const dynamic = "force-dynamic"

interface BloodBank {
  id: number
  name: string
  location: string
  distance: number
  inventory: Record<string, number>
}

export default function BloodBank() {
  const router = useRouter()
  const [banks, setBanks] = useState<BloodBank[]>([])
  const [selectedType, setSelectedType] = useState("")

  useEffect(() => {
    const role = localStorage.getItem("userRole")
    if (role !== "patient") {
      router.push("/login")
    } else {
      const mockBanks: BloodBank[] = [
        {
          id: 1,
          name: "Central Blood Bank",
          location: "District Hospital",
          distance: 15,
          inventory: { "O+": 10, "O-": 4, "A+": 8, "A-": 2, "B+": 6, "B-": 1, "AB+": 3, "AB-": 0 },
        },
        {
          id: 2,
          name: "Community Blood Center",
          location: "Town Center",
          distance: 8,
          inventory: { "O+": 15, "O-": 5, "A+": 12, "A-": 3, "B+": 9, "B-": 2, "AB+": 4, "AB-": 1 },
        },
        {
          id: 3,
          name: "Regional Blood Service",
          location: "Regional Hub",
          distance: 25,
          inventory: { "O+": 20, "O-": 8, "A+": 18, "A-": 6, "B+": 14, "B-": 5, "AB+": 7, "AB-": 3 },
        },
      ]
      setBanks(mockBanks)
    }
  }, [router])

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="max-w-6xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-primary mb-8">Blood Bank Locator</h1>

        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">Filter by Blood Type</label>
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="">All Blood Types</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
          </select>
        </div>

        <div className="space-y-4">
          {banks.map((bank) => (
            <div key={bank.id} className="p-6 bg-card border border-border rounded-lg">
              <h3 className="text-xl font-bold mb-3">{bank.name}</h3>
              <p className="text-muted-foreground mb-4">
                {bank.location} - {bank.distance} km away
              </p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {Object.entries(bank.inventory).map(([type, count]) => (
                  <div
                    key={type}
                    className={`p-3 rounded-lg text-center ${
                      selectedType === "" || selectedType === type ? "bg-secondary" : "bg-muted opacity-50"
                    }`}
                  >
                    <p className="font-semibold">{type}</p>
                    <p className={`text-lg ${count > 0 ? "text-primary" : "text-destructive"}`}>{count} units</p>
                  </div>
                ))}
              </div>

              <button className="mt-4 px-6 py-2 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90">
                Request Blood
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}
