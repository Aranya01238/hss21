"use client";

import type React from "react";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Navbar } from "@/components/layout/navbar";

export const dynamic = "force-dynamic";

export default function SignUp() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const portal =
    (searchParams.get("portal") as
      | "user"
      | "hospital"
      | "receptionist"
      | "developer") || "user";
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validation
    if (!formData.name.trim()) {
      setError("Name is required");
      return;
    }
    if (!formData.email.includes("@")) {
      setError("Valid email is required");
      return;
    }
    if (formData.phone.length !== 10 || !/^\d+$/.test(formData.phone)) {
      setError("Phone number must be 10 digits");
      return;
    }
    if (!formData.address.trim()) {
      setError("Address is required");
      return;
    }
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      setLoading(true);
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          phone: formData.phone,
          address: formData.address,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data?.error || "Signup failed");
        setLoading(false);
        return;
      }
      localStorage.setItem("newUserId", data.userId);
      localStorage.setItem("newUserEmail", formData.email);
      localStorage.setItem("newUserName", formData.name);
      setSuccess(true);
    } catch (err: any) {
      setError("Unexpected error during signup");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="flex items-center justify-center py-12 px-4">
          <div className="w-full max-w-md bg-card border border-border rounded-lg p-8 text-center">
            <div className="text-5xl mb-4">✅</div>
            <h1 className="text-3xl font-bold text-primary mb-4">
              Account Created!
            </h1>
            <p className="text-muted-foreground mb-6">
              Your account has been successfully created. Your User ID is
              displayed below. Please save it for future logins.
            </p>
            <div className="bg-secondary/20 border border-border rounded-lg p-4 mb-6">
              <p className="text-sm text-muted-foreground mb-2">Your User ID</p>
              <p className="text-2xl font-bold text-primary font-mono">
                {localStorage.getItem("newUserId")}
              </p>
            </div>
            <p className="text-sm text-muted-foreground mb-6">
              Use this ID along with your password to login to the User Portal
              after verifying your email.
            </p>
            <button
              onClick={() => router.push("/login?portal=user")}
              className="w-full px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 mb-3"
            >
              Go to Login
            </button>
            <button
              onClick={() => router.push("/portals")}
              className="w-full px-6 py-3 border border-primary text-primary rounded-lg font-semibold hover:bg-primary/10"
            >
              Back to Portals
            </button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-md bg-card border border-border rounded-lg p-8">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-center mb-2">
              Create Account
            </h1>
            <p className="text-center text-sm text-muted-foreground">
              User Portal Registration
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                required
                className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
                className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    phone: e.target.value.replace(/\D/g, "").slice(0, 10),
                  }))
                }
                placeholder="10-digit phone number"
                maxLength={10}
                required
                className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Address</label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Enter your address"
                rows={3}
                required
                className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Minimum 6 characters"
                required
                className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Re-enter your password"
                required
                className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            {error && (
              <div className="p-3 bg-destructive/10 border border-destructive text-destructive rounded-lg text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Creating Account..." : "Create Account"}
            </button>

            <button
              type="button"
              onClick={() => router.push(`/login?portal=user`)}
              className="w-full px-6 py-3 border border-primary text-primary rounded-lg font-semibold hover:bg-primary/10"
            >
              Already have an account? Sign In
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
