"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/layout/navbar";
import { getAuth0Client } from "@/lib/auth0";

export const dynamic = "force-dynamic";

export default function PatientDashboard() {
  const router = useRouter();
  const [userName, setUserName] = useState("");

  useEffect(() => {
    async function guard() {
      const role = localStorage.getItem("userRole");
      const name = localStorage.getItem("userName");
      const client = await getAuth0Client();
      const isAuth = await client.isAuthenticated();
      const user = isAuth ? await client.getUser() : null;
      if (!isAuth || role !== "patient" || !user?.email_verified) {
        router.push("/login?portal=user");
        return;
      }
      setUserName(name || "User");
    }
    guard();
  }, [router]);

  const quickActions = [
    { label: "Nurse Maya AI", href: "/patient/nurse-maya", icon: "🤖" },
    { label: "Emergency Beds", href: "/patient/bed-locator", icon: "🏥" },
    { label: "Blood Banks", href: "/patient/blood-bank", icon: "🩸" },
    { label: "Appointments", href: "/patient/appointments", icon: "📅" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="max-w-6xl mx-auto px-4 py-12">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-primary mb-2">
            Welcome, {userName}!
          </h1>
          <p className="text-muted-foreground">
            Your personal healthcare dashboard
          </p>
        </div>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Quick Access</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action, index) => (
              <a
                key={index}
                href={action.href}
                className="p-6 bg-card border-2 border-border rounded-lg hover:border-primary hover:shadow-lg transition"
              >
                <div className="text-4xl mb-3">{action.icon}</div>
                <h3 className="font-semibold">{action.label}</h3>
              </a>
            ))}
          </div>
        </section>

        <section className="bg-secondary/20 p-8 rounded-lg">
          <h2 className="text-2xl font-bold mb-4">Recent Activity</h2>
          <p className="text-muted-foreground">
            Your recent health records and appointments will appear here
          </p>
        </section>
      </main>
    </div>
  );
}
