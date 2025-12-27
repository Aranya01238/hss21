"use client"

import { useState } from "react"
import { Navbar } from "@/components/layout/navbar"

export default function ReceptionistDashboard() {
  const [appointments, setAppointments] = useState([
    { id: 1, patientName: "Rahul Singh", time: "10:00 AM", doctor: "Dr. Sharma", status: "Confirmed" },
    { id: 2, patientName: "Priya Patel", time: "11:00 AM", doctor: "Dr. Verma", status: "Waiting" },
    { id: 3, patientName: "Amit Kumar", time: "2:00 PM", doctor: "Dr. Gupta", status: "Confirmed" },
  ])

  const [registrations, setRegistrations] = useState([
    { id: 1, patientName: "New Patient", phone: "9876543210", date: "Today", status: "Pending" },
  ])

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="py-8 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold text-primary mb-8">Receptionist Panel</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-card border border-border rounded-lg p-6">
              <h2 className="text-2xl font-bold mb-4 text-primary">Today's Appointments</h2>
              <div className="space-y-3">
                {appointments.map((apt) => (
                  <div key={apt.id} className="p-4 border border-border rounded-lg">
                    <p className="font-semibold">{apt.patientName}</p>
                    <p className="text-sm text-muted-foreground">
                      {apt.time} with {apt.doctor}
                    </p>
                    <span
                      className={`text-xs mt-2 inline-block px-3 py-1 rounded ${apt.status === "Confirmed" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}`}
                    >
                      {apt.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <h2 className="text-2xl font-bold mb-4 text-primary">New Registrations</h2>
              <div className="space-y-3">
                {registrations.map((reg) => (
                  <div key={reg.id} className="p-4 border border-border rounded-lg">
                    <p className="font-semibold">{reg.patientName}</p>
                    <p className="text-sm text-muted-foreground">
                      {reg.phone} • {reg.date}
                    </p>
                    <button className="text-xs mt-2 px-3 py-1 rounded bg-primary text-primary-foreground hover:bg-primary/90">
                      Verify & Register
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-card border border-border rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4 text-primary">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <button className="p-4 border border-border rounded-lg hover:bg-secondary/50 transition">
                <div className="text-2xl mb-2">➕</div>
                <p className="font-semibold text-sm">New Registration</p>
              </button>
              <button className="p-4 border border-border rounded-lg hover:bg-secondary/50 transition">
                <div className="text-2xl mb-2">📅</div>
                <p className="font-semibold text-sm">Book Appointment</p>
              </button>
              <button className="p-4 border border-border rounded-lg hover:bg-secondary/50 transition">
                <div className="text-2xl mb-2">🔍</div>
                <p className="font-semibold text-sm">Search Patient</p>
              </button>
              <button className="p-4 border border-border rounded-lg hover:bg-secondary/50 transition">
                <div className="text-2xl mb-2">📞</div>
                <p className="font-semibold text-sm">Call Records</p>
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
