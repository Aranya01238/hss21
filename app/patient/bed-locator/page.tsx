"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/layout/navbar";
import { getAuth0Client } from "@/lib/auth0";

export const dynamic = "force-dynamic";

interface Hospital {
  id: number;
  name: string;
  distance: number;
  bedsAvailable: number;
  icuBeds: number;
  location: string;
}

export default function BedLocator() {
  const router = useRouter();
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [sortBy, setSortBy] = useState("distance");

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
      const mockHospitals: Hospital[] = [
        {
          id: 1,
          name: "Rural Medical Center",
          distance: 5,
          bedsAvailable: 8,
          icuBeds: 2,
          location: "Village A",
        },
        {
          id: 2,
          name: "District Hospital",
          distance: 15,
          bedsAvailable: 12,
          icuBeds: 5,
          location: "District Town",
        },
        {
          id: 3,
          name: "Emergency Care Unit",
          distance: 8,
          bedsAvailable: 3,
          icuBeds: 1,
          location: "Town Center",
        },
        {
          id: 4,
          name: "Regional Medical",
          distance: 25,
          bedsAvailable: 20,
          icuBeds: 8,
          location: "Regional Hub",
        },
      ];

      const sorted = [...mockHospitals].sort((a, b) =>
        sortBy === "distance"
          ? a.distance - b.distance
          : b.bedsAvailable - a.bedsAvailable
      );
      setHospitals(sorted);
    }
    guard();
  }, [router, sortBy]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="max-w-6xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-primary mb-8">
          Emergency Bed Locator
        </h1>

        <div className="mb-6 flex gap-4">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="distance">Sort by Distance</option>
            <option value="beds">Sort by Available Beds</option>
          </select>
        </div>

        <div className="space-y-4">
          {hospitals.map((hospital) => (
            <div
              key={hospital.id}
              className="p-6 bg-card border border-border rounded-lg hover:shadow-lg transition"
            >
              <h3 className="text-xl font-bold mb-3">{hospital.name}</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                <div>
                  <p className="text-sm text-muted-foreground">Distance</p>
                  <p className="text-lg font-semibold">
                    {hospital.distance} km
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Regular Beds</p>
                  <p className="text-lg font-semibold text-primary">
                    {hospital.bedsAvailable}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">ICU Beds</p>
                  <p className="text-lg font-semibold text-primary">
                    {hospital.icuBeds}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Location</p>
                  <p className="text-lg font-semibold">{hospital.location}</p>
                </div>
              </div>
              <button className="px-6 py-2 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90">
                Book Bed
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
