"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { HeartPulse, Menu, X } from "lucide-react";

const NAV_LEFT = [
  { name: "About", href: "/about", size: "text-xs", weight: "font-medium" },
  { name: "Home", href: "/", size: "text-base", weight: "font-bold" },
];

const NAV_RIGHT = [
  {
    name: "Features",
    href: "/features",
    size: "text-base",
    weight: "font-bold",
  },
  { name: "Contact", href: "/contact", size: "text-xs", weight: "font-medium" },
];

export function Navbar() {
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => setIsMounted(true), []);

  if (!isMounted) return null;

  return (
    <nav className="fixed top-6 left-0 right-0 z-50 flex justify-center px-6">
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="w-full max-w-3xl bg-white/80 backdrop-blur-xl border border-slate-200/50 shadow-[0_10px_40px_rgba(0,0,0,0.08)] rounded-full px-4 py-2"
      >
        <div className="flex justify-between items-center relative">
          <div className="hidden md:flex items-center gap-2 flex-1 justify-end pr-12">
            {NAV_LEFT.map((link) => (
              <NavLink
                key={link.name}
                link={link}
                isHovered={hoveredLink === link.name}
                onHover={setHoveredLink}
              />
            ))}
          </div>

          <motion.div
            whileHover={{ scale: 1.05, rotate: 2 }}
            className="z-20 px-2"
          >
            <Link
              href="/"
              className="flex flex-col items-center group text-center"
            >
              <div className="bg-primary p-2 rounded-xl shadow-lg shadow-primary/30 group-hover:shadow-primary/50 transition-all">
                <HeartPulse className="w-5 h-5 text-white" />
              </div>
              <span className="text-[10px] font-black tracking-[0.2em] text-primary mt-1 uppercase">
                Hind
              </span>
            </Link>
          </motion.div>

          <div className="hidden md:flex items-center gap-2 flex-1 justify-start pl-12">
            {NAV_RIGHT.map((link) => (
              <NavLink
                key={link.name}
                link={link}
                isHovered={hoveredLink === link.name}
                onHover={setHoveredLink}
              />
            ))}
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-slate-600"
          >
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden overflow-hidden flex flex-col items-center gap-4 py-6 border-t border-slate-100 mt-2"
            >
              {[...NAV_LEFT, ...NAV_RIGHT].map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-lg font-semibold text-slate-800"
                >
                  {link.name}
                </Link>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </nav>
  );
}

function NavLink({ link, isHovered, onHover }: any) {
  return (
    <Link
      href={link.href}
      onMouseEnter={() => onHover(link.name)}
      onMouseLeave={() => onHover(null)}
      className={`relative px-5 py-2 transition-colors duration-300 z-10 ${
        link.size
      } ${link.weight} ${isHovered ? "text-primary" : "text-slate-600"}`}
    >
      {isHovered && (
        <motion.span
          layoutId="nav-pill"
          className="absolute inset-0 bg-primary/10 rounded-full -z-10"
          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
        />
      )}
      {link.name}
    </Link>
  );
}
