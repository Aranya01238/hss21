"use client"

import { useState } from "react"
import { Navbar } from "@/components/layout/navbar"

export default function DeveloperDashboard() {
  const [stats] = useState({
    totalUsers: 12540,
    activeHospitals: 342,
    totalBeds: 8234,
    bloodRequests: 156,
    systemHealth: 98.7,
    apiUptime: 99.95,
  })

  const [logs] = useState([
    { id: 1, type: "API", message: "User login successful", timestamp: "2024-01-15 10:30:45", status: "success" },
    { id: 2, type: "DB", message: "Bed inventory updated", timestamp: "2024-01-15 10:29:12", status: "success" },
    { id: 3, type: "Error", message: "Blood bank sync failed", timestamp: "2024-01-15 10:25:03", status: "error" },
  ])

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="py-8 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold text-primary mb-8">Developer Admin Panel</h1>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-card border border-border rounded-lg p-6">
              <p className="text-muted-foreground text-sm">Total Users</p>
              <p className="text-3xl font-bold text-primary">{stats.totalUsers.toLocaleString()}</p>
            </div>
            <div className="bg-card border border-border rounded-lg p-6">
              <p className="text-muted-foreground text-sm">Active Hospitals</p>
              <p className="text-3xl font-bold text-primary">{stats.activeHospitals}</p>
            </div>
            <div className="bg-card border border-border rounded-lg p-6">
              <p className="text-muted-foreground text-sm">Total Beds</p>
              <p className="text-3xl font-bold text-primary">{stats.totalBeds.toLocaleString()}</p>
            </div>
            <div className="bg-card border border-border rounded-lg p-6">
              <p className="text-muted-foreground text-sm">Blood Requests</p>
              <p className="text-3xl font-bold text-primary">{stats.bloodRequests}</p>
            </div>
            <div className="bg-card border border-border rounded-lg p-6">
              <p className="text-muted-foreground text-sm">System Health</p>
              <p className="text-3xl font-bold text-green-600">{stats.systemHealth}%</p>
            </div>
            <div className="bg-card border border-border rounded-lg p-6">
              <p className="text-muted-foreground text-sm">API Uptime</p>
              <p className="text-3xl font-bold text-green-600">{stats.apiUptime}%</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <div className="lg:col-span-2 bg-card border border-border rounded-lg p-6">
              <h2 className="text-xl font-bold mb-4 text-primary">System Logs</h2>
              <div className="space-y-3">
                {logs.map((log) => (
                  <div key={log.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
                    <div className="flex-1">
                      <p className="font-semibold">
                        {log.type}: {log.message}
                      </p>
                      <p className="text-xs text-muted-foreground">{log.timestamp}</p>
                    </div>
                    <span
                      className={`px-3 py-1 rounded text-xs ${log.status === "success" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
                    >
                      {log.status === "success" ? "✓ OK" : "✗ Error"}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <h2 className="text-xl font-bold mb-4 text-primary">Admin Tools</h2>
              <div className="space-y-3">
                <button className="w-full p-3 border border-border rounded-lg hover:bg-secondary/50 transition text-left font-semibold text-sm">
                  📊 View Analytics
                </button>
                <button className="w-full p-3 border border-border rounded-lg hover:bg-secondary/50 transition text-left font-semibold text-sm">
                  👥 Manage Users
                </button>
                <button className="w-full p-3 border border-border rounded-lg hover:bg-secondary/50 transition text-left font-semibold text-sm">
                  🏥 Manage Hospitals
                </button>
                <button className="w-full p-3 border border-border rounded-lg hover:bg-secondary/50 transition text-left font-semibold text-sm">
                  ⚙️ System Settings
                </button>
                <button className="w-full p-3 border border-border rounded-lg hover:bg-secondary/50 transition text-left font-semibold text-sm">
                  🔐 Security Logs
                </button>
                <button className="w-full p-3 border border-border rounded-lg hover:bg-secondary/50 transition text-left font-semibold text-sm">
                  📋 API Documentation
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
