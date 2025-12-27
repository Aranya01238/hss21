"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/layout/navbar";
import { getAuth0Client } from "@/lib/auth0";

export const dynamic = "force-dynamic";

interface Appointment {
  id: number;
  hospital: string;
  doctor: string;
  date: string;
  time: string;
  status: "upcoming" | "completed" | "cancelled";
}

export default function Appointments() {
  const router = useRouter();
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  useEffect(() => {
    async function guard() {
      const role = localStorage.getItem("userRole");
      const client = await getAuth0Client();
      const isAuth = await client.isAuthenticated();
      const user = isAuth ? await client.getUser() : null;
      if (!isAuth || role !== "patient" || !user?.email_verified) {
        router.push("/login?portal=user");
        return;
      }
      const mockAppointments: Appointment[] = [
        {
          id: 1,
          hospital: "District Hospital",
          doctor: "Dr. Sharma",
          date: "2024-12-28",
          time: "10:00 AM",
          status: "upcoming",
        },
        {
          id: 2,
          hospital: "Community Health Center",
          doctor: "Dr. Patel",
          date: "2024-12-20",
          time: "02:00 PM",
          status: "completed",
        },
      ];
      setAppointments(mockAppointments);
    }
    guard();
  }, [router]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="max-w-6xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-primary mb-8">Appointments</h1>

        <button className="mb-6 px-6 py-2 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90">
          Schedule New Appointment
        </button>

        <div className="space-y-4">
          {appointments.map((appt) => (
            <div
              key={appt.id}
              className="p-6 bg-card border border-border rounded-lg"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold">{appt.hospital}</h3>
                  <p className="text-muted-foreground">with {appt.doctor}</p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    appt.status === "upcoming"
                      ? "bg-primary/20 text-primary"
                      : appt.status === "completed"
                      ? "bg-green-500/20 text-green-700"
                      : "bg-destructive/20 text-destructive"
                  }`}
                >
                  {appt.status.charAt(0).toUpperCase() + appt.status.slice(1)}
                </span>
              </div>
              <p className="text-muted-foreground">
                📅 {appt.date} at {appt.time}
              </p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
