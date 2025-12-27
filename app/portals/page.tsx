"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Navbar } from "@/components/layout/navbar"

export default function PortalSelection() {
  const router = useRouter()
  const [selectedPortal, setSelectedPortal] = useState("")

  const portals = [
    {
      id: "user",
      name: "User Portal",
      description: "Access healthcare services, book emergency beds, find blood banks, and chat with Nurse Maya",
      icon: "👤",
      color: "bg-blue-50 border-blue-200 hover:border-blue-400",
      path: "/login?portal=user",
    },
    {
      id: "hospital",
      name: "Hospital Admin Portal",
      description: "Manage hospital operations, beds, blood inventory, emergency cases, and analytics",
      icon: "🏥",
      color: "bg-green-50 border-green-200 hover:border-green-400",
      path: "/login?portal=hospital",
    },
    {
      id: "receptionist",
      name: "Receptionist Panel",
      description: "Handle patient registrations, appointments, and administrative tasks",
      icon: "📋",
      color: "bg-yellow-50 border-yellow-200 hover:border-yellow-400",
      path: "/login?portal=receptionist",
    },
    {
      id: "developer",
      name: "Developer Admin Panel",
      description: "System monitoring, analytics, user management, and platform administration",
      icon: "⚙️",
      color: "bg-purple-50 border-purple-200 hover:border-purple-400",
      path: "/login?portal=developer",
    },
  ]

  const handlePortalSelect = (path: string) => {
    router.push(path)
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="py-12 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">Hind Svaasth Seva Portals</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Select your portal to access the platform. Each portal is designed for specific user roles with tailored
              features and permissions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {portals.map((portal) => (
              <button
                key={portal.id}
                onClick={() => handlePortalSelect(portal.path)}
                className={`p-8 rounded-lg border-2 transition text-left ${portal.color}`}
              >
                <div className="text-5xl mb-4">{portal.icon}</div>
                <h2 className="text-2xl font-bold text-primary mb-3">{portal.name}</h2>
                <p className="text-foreground mb-6">{portal.description}</p>
                <div className="flex items-center gap-2 text-primary font-semibold hover:gap-3 transition">
                  <span>Continue</span>
                  <span>→</span>
                </div>
              </button>
            ))}
          </div>

          <div className="mt-12 p-6 bg-secondary/20 rounded-lg border border-border text-center">
            <p className="text-muted-foreground">
              Don't have an account? Contact your administrator or visit our{" "}
              <a href="/contact" className="text-primary font-semibold hover:underline">
                contact page
              </a>{" "}
              for more information.
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}
