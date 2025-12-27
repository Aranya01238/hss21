"use client"

import { Navbar } from "@/components/layout/navbar"
import { OfflineBadge } from "@/components/layout/offline-badge"

export default function About() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <OfflineBadge />
      <main className="max-w-6xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-primary mb-8">About Hind Svaasth Seva</h1>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
          <p className="text-lg text-muted-foreground mb-4">
            We are committed to bringing quality healthcare to rural communities across India. Through innovative
            technology and compassionate care, we bridge the gap between patients and healthcare services.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Why Hind Svaasth Seva?</h2>
          <ul className="space-y-4">
            <li className="flex gap-3">
              <span className="text-primary font-bold">✓</span>
              <span className="text-muted-foreground">24/7 AI-powered medical guidance through Nurse Maya</span>
            </li>
            <li className="flex gap-3">
              <span className="text-primary font-bold">✓</span>
              <span className="text-muted-foreground">Real-time emergency bed availability across hospitals</span>
            </li>
            <li className="flex gap-3">
              <span className="text-primary font-bold">✓</span>
              <span className="text-muted-foreground">Instant blood bank location and inventory tracking</span>
            </li>
            <li className="flex gap-3">
              <span className="text-primary font-bold">✓</span>
              <span className="text-muted-foreground">Works offline with essential features available anytime</span>
            </li>
          </ul>
        </section>

        <section className="bg-secondary/20 p-8 rounded-lg">
          <h2 className="text-2xl font-bold mb-4">Our Team</h2>
          <p className="text-muted-foreground">
            Built by healthcare professionals, engineers, and community advocates working together to save lives in
            rural India.
          </p>
        </section>
      </main>
    </div>
  )
}
