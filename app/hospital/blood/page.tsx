"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Navbar } from "@/components/layout/navbar"
import { getAuth0Client } from "@/lib/auth0"

export const dynamic = "force-dynamic"

export default function BloodInventory() {
  const router = useRouter()
  const [inventory, setInventory] = useState({
    "O+": 45,
    "O-": 12,
    "A+": 38,
    "A-": 8,
    "B+": 25,
    "B-": 6,
    "AB+": 15,
    "AB-": 4,
  })

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

  const updateInventory = (type: string, amount: number) => {
    setInventory({
      ...inventory,
      [type]: Math.max(0, inventory[type as keyof typeof inventory] + amount),
    })
  }

  const totalUnits = Object.values(inventory).reduce((a, b) => a + b, 0)

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="max-w-6xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-primary mb-8">Blood Inventory Management</h1>

        <div className="mb-8 p-6 bg-card border border-border rounded-lg">
          <p className="text-muted-foreground mb-2">Total Units in Stock</p>
          <p className="text-4xl font-bold text-primary">{totalUnits} units</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Object.entries(inventory).map(([type, count]) => (
            <div key={type} className="p-6 bg-card border border-border rounded-lg">
              <h3 className="text-xl font-bold mb-3 text-center">{type}</h3>
              <p className="text-center text-2xl font-bold text-primary mb-4">{count} units</p>
              <div className="flex gap-2">
                <button
                  onClick={() => updateInventory(type, -1)}
                  className="flex-1 px-3 py-2 bg-destructive text-destructive-foreground rounded hover:bg-destructive/90 text-sm"
                >
                  -1
                </button>
                <button
                  onClick={() => updateInventory(type, 1)}
                  className="flex-1 px-3 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90 text-sm"
                >
                  +1
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}
