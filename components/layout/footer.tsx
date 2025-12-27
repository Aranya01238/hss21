"use client";

import Link from "next/link";
import { Github, Twitter, Linkedin, Mail } from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-card border-t border-border">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-3">
            <div className="text-2xl font-black tracking-tight neon neon-red">
              Hind Svaasth Seva
            </div>
            <p className="text-muted-foreground text-sm">
              Rural healthcare support and emergency services across India.
            </p>
            <div className="flex items-center gap-3">
              <Link
                href="mailto:contact@hindseva.org"
                className="p-2 rounded-md border border-border hover:bg-secondary/30 transition neon-border"
                aria-label="Email"
              >
                <Mail className="size-4" />
              </Link>
              <Link
                href="https://twitter.com"
                className="p-2 rounded-md border border-border hover:bg-secondary/30 transition"
                aria-label="Twitter"
              >
                <Twitter className="size-4" />
              </Link>
              <Link
                href="https://github.com"
                className="p-2 rounded-md border border-border hover:bg-secondary/30 transition"
                aria-label="GitHub"
              >
                <Github className="size-4" />
              </Link>
              <Link
                href="https://linkedin.com"
                className="p-2 rounded-md border border-border hover:bg-secondary/30 transition"
                aria-label="LinkedIn"
              >
                <Linkedin className="size-4" />
              </Link>
            </div>
          </div>

          <div className="space-y-3">
            <div className="text-sm font-semibold">Platform</div>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/portals" className="hover:text-primary">
                  Portals
                </Link>
              </li>
              <li>
                <Link href="/hospital/dashboard" className="hover:text-primary">
                  Hospital Dashboard
                </Link>
              </li>
              <li>
                <Link href="/patient/dashboard" className="hover:text-primary">
                  Patient Dashboard
                </Link>
              </li>
              <li>
                <Link href="/developer/dashboard" className="hover:text-primary">
                  Developer Dashboard
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <div className="text-sm font-semibold">Resources</div>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/about" className="hover:text-primary">
                  About
                </Link>
              </li>
              <li>
                <Link href="/features" className="hover:text-primary">
                  Features
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-primary">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <div className="text-sm font-semibold">Legal</div>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/privacy" className="hover:text-primary">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-primary">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <div>© {year} Hind Svaasth Seva. All rights reserved.</div>
          <div className="flex items-center gap-4">
            <Link href="/contact" className="hover:text-primary">
              Get Support
            </Link>
            <Link href="/about" className="hover:text-primary">
              Learn More
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
