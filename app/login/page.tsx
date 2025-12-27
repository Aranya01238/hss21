"use client";

import type React from "react";
import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Navbar } from "@/components/layout/navbar";
import { getAuth0Client } from "@/lib/auth0";

// Mock credentials database
const CREDENTIALS_DB = {
  hospital: [
    { id: "HOSP001", password: "admin123" },
    { id: "HOSP002", password: "hospital123" },
  ],
  receptionist: [
    { id: "REC001", password: "recep123" },
    { id: "REC002", password: "reception123" },
  ],
  developer: [
    { id: "DEV001", password: "dev123" },
    { id: "DEV002", password: "admin123" },
  ],
  user: [
    { id: "USER001", password: "user123" },
    { id: "USER002", password: "patient123" },
  ],
};

const portalConfig = {
  user: { name: "User Portal", redirect: "/patient/dashboard", type: "user" },
  hospital: {
    name: "Hospital Admin Portal",
    redirect: "/hospital/dashboard",
    type: "admin",
  },
  receptionist: {
    name: "Receptionist Panel",
    redirect: "/receptionist/dashboard",
    type: "admin",
  },
  developer: {
    name: "Developer Admin Panel",
    redirect: "/developer/dashboard",
    type: "admin",
  },
};

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const portal =
    (searchParams.get("portal") as keyof typeof portalConfig) || "user";
  const config = portalConfig[portal] || portalConfig.user;

  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (portal === "user") {
        let emailHint: string | null = null;
        try {
          const res = await fetch("/api/auth/resolve-userid", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userId }),
          });
          const data = await res.json();
          if (res.ok) {
            emailHint = data.email;
          }
        } catch {}
        if (!emailHint) {
          const storedId = localStorage.getItem("newUserId");
          const storedEmail = localStorage.getItem("newUserEmail");
          if (storedId === userId && storedEmail) {
            emailHint = storedEmail;
          }
        }
        if (!emailHint) {
          setError("User ID not found");
          setLoading(false);
          return;
        }

        const client = await getAuth0Client();
        try {
          await client.loginWithPopup({
            authorizationParams: {
              login_hint: emailHint,
            },
          });
        } catch {
          await client.loginWithRedirect({
            appState: { portal },
          });
          return;
        }
        const userInfo = await client.getUser();
        localStorage.setItem("userPortal", "user");
        localStorage.setItem("userId", userId);
        localStorage.setItem(
          "userName",
          userInfo?.name || userInfo?.email || emailHint
        );
        localStorage.setItem("userRole", "patient");
        router.push(config.redirect);
        return;
      }

      const credentials =
        CREDENTIALS_DB[portal as keyof typeof CREDENTIALS_DB] || [];
      const user = credentials.find(
        (cred) => cred.id === userId && cred.password === password
      );

      if (!user) {
        setError("Invalid User ID or Password");
        setLoading(false);
        return;
      }

      const roleMap: Record<string, string> = {
        user: "patient",
        hospital: "hospital",
        receptionist: "receptionist",
        developer: "developer",
      };

      localStorage.setItem("userPortal", portal);
      localStorage.setItem("userId", userId);
      localStorage.setItem("userName", userId);
      localStorage.setItem("userRole", roleMap[portal] || "user");

      const client = await getAuth0Client();
      await client.loginWithRedirect({
        appState: { portal },
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md bg-card border border-border rounded-lg p-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-center mb-2">{config.name}</h1>
          <p className="text-center text-sm text-muted-foreground">
            Sign in with your credentials
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">User ID</label>
            <input
              type="text"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              placeholder="Enter your User ID"
              required
              className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Demo: HOSP001, REC001, DEV001, USER001
            </p>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Demo passwords: admin123, recep123, dev123, user123
            </p>
          </div>

          {error && (
            <div className="p-3 bg-destructive/10 border border-destructive text-destructive rounded-lg text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={!userId || !password || loading}
            className="w-full px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>

          {portal === "user" && (
            <button
              type="button"
              onClick={() => router.push(`/signup?portal=user`)}
              className="w-full px-6 py-3 border border-primary text-primary rounded-lg font-semibold hover:bg-primary/10"
            >
              Create New User Account
            </button>
          )}

          <button
            type="button"
            onClick={() => router.push("/portals")}
            className="w-full px-6 py-3 border border-muted-foreground text-muted-foreground rounded-lg font-semibold hover:bg-muted"
          >
            Back to Portals
          </button>
        </form>
      </div>
    </main>
  );
}

export default function Login() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Suspense
        fallback={
          <div className="flex items-center justify-center py-12">
            Loading...
          </div>
        }
      >
        <LoginForm />
      </Suspense>
    </div>
  );
}
