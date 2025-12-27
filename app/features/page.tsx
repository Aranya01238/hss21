"use client"

import { Navbar } from "@/components/layout/navbar"
import { OfflineBadge } from "@/components/layout/offline-badge"

export default function Features() {
  const features = [
    {
      title: "Nurse Maya AI",
      description:
        "Intelligent healthcare assistant providing instant medical guidance 24/7 based on symptoms and health concerns",
      icon: "🤖",
    },
    {
      title: "Emergency Bed Locator",
      description:
        "Find and reserve emergency hospital beds in real-time with distance-based sorting and availability tracking",
      icon: "🏥",
    },
    {
      title: "Blood Bank Locator",
      description: "Locate blood banks instantly, filter by blood type, and check real-time inventory levels",
      icon: "🩸",
    },
    {
      title: "Appointment Management",
      description: "Schedule, reschedule, and manage medical appointments with integrated hospital systems",
      icon: "📅",
    },
    {
      title: "Emergency Queue",
      description: "Real-time emergency patient queue management for hospitals with priority-based tracking",
      icon: "🚨",
    },
    {
      title: "Hospital Analytics",
      description: "Comprehensive dashboard for hospitals to track bed occupancy, blood inventory, and patient flow",
      icon: "📊",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <OfflineBadge />
      <main className="max-w-6xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-primary mb-4 text-center">Platform Features</h1>
        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          Comprehensive healthcare solutions designed specifically for rural communities
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div key={index} className="p-6 bg-card border border-border rounded-lg hover:shadow-lg transition">
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}
