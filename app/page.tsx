"use client";

import { useRef } from "react";
import { Navbar } from "@/components/layout/navbar";
import { OfflineBadge } from "@/components/layout/offline-badge";
import { motion, useScroll, useTransform, type Variants } from "framer-motion";
import {
  ArrowRight,
  Activity,
  ShieldCheck,
  Users,
  Settings,
} from "lucide-react";

const portals = [
  {
    title: "User Portal",
    desc: "For patients seeking healthcare services, emergency beds, and medical assistance.",
    icon: <Activity className="w-8 h-8" />,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
  },
  {
    title: "Hospital Admin",
    desc: "Hospital administrators manage beds, blood inventory, and emergency cases.",
    icon: <ShieldCheck className="w-8 h-8" />,
    color: "text-emerald-600",
    bgColor: "bg-emerald-50",
  },
  {
    title: "Receptionist Panel",
    desc: "Hospital receptionists handle patient registrations and appointments.",
    icon: <Users className="w-8 h-8" />,
    color: "text-purple-600",
    bgColor: "bg-purple-50",
  },
  {
    title: "Developer Admin",
    desc: "System administrators monitor platform health and manage infrastructure.",
    icon: <Settings className="w-8 h-8" />,
    color: "text-slate-600",
    bgColor: "bg-slate-50",
  },
];

// Animation Variants typed for TypeScript safety
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 100, damping: 15 },
  },
};

export default function Landing() {
  const targetRef = useRef(null);

  // Background shift logic: transitions from white to soft blue as you scroll
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"],
  });

  const backgroundColor = useTransform(
    scrollYProgress,
    [0, 0.4, 0.6, 1],
    ["#ffffff", "#f0f9ff", "#f0f9ff", "#ffffff"]
  );

  return (
    <motion.div
      style={{ backgroundColor }}
      className="min-h-screen transition-colors duration-700 overflow-x-hidden"
    >
      <Navbar />
      <OfflineBadge />

      <main>
        {/* HERO SECTION */}
        <section className="relative pt-48 pb-24 px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 mb-8 text-xs font-bold tracking-[0.2em] uppercase bg-white border border-slate-200 shadow-sm text-primary rounded-full">
              <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              Rural Healthcare Excellence
            </span>
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-slate-900 mb-8 leading-[0.9]">
              Care at Your <br />
              <span className="text-primary italic">Doorstep.</span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-500 mb-12 max-w-2xl mx-auto font-medium leading-relaxed">
              Bridging the gap between urban medical excellence and rural needs
              with AI-powered connectivity.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex gap-4 justify-center flex-wrap"
          >
            <a
              href="/portals"
              className="px-10 py-5 bg-slate-900 text-white rounded-2xl font-bold shadow-2xl hover:bg-primary transition-all flex items-center gap-3"
            >
              Access Portals
              <ArrowRight className="w-5 h-5" />
            </a>
            <a
              href="/about"
              className="px-10 py-5 bg-white border border-slate-200 text-slate-900 rounded-2xl font-bold hover:bg-slate-50 transition-all shadow-sm"
            >
              Learn More
            </a>
          </motion.div>
        </section>

        {/* PORTALS SECTION */}
        <section ref={targetRef} className="py-32 px-4 md:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="mb-20 text-center">
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight">
                Integrated Ecosystem
              </h2>
              <div className="h-1.5 w-16 bg-primary rounded-full mx-auto" />
            </div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            >
              {portals.map((portal, idx) => (
                <motion.div
                  key={idx}
                  variants={cardVariants}
                  whileHover={{ y: -15, scale: 1.02 }}
                  className="group relative p-10 bg-white/70 backdrop-blur-md rounded-[2.5rem] border border-white shadow-[0_20px_40px_rgba(0,0,0,0.04)] hover:shadow-[0_30px_60px_rgba(0,0,0,0.1)] transition-all cursor-pointer"
                >
                  <motion.div
                    whileInView={{ rotate: [0, -10, 10, 0] }}
                    transition={{ delay: 0.5 + idx * 0.1, duration: 0.6 }}
                    className={`w-16 h-16 ${portal.bgColor} ${portal.color} rounded-2xl flex items-center justify-center mb-8 shadow-inner`}
                  >
                    {portal.icon}
                  </motion.div>

                  <h3 className="text-2xl font-bold mb-4 text-slate-900 tracking-tight">
                    {portal.title}
                  </h3>
                  <p className="text-slate-500 font-medium text-sm leading-relaxed mb-8">
                    {portal.desc}
                  </p>

                  <div className="flex items-center text-primary font-bold text-sm gap-2 opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0">
                    Enter Portal <ArrowRight size={16} />
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* CTA SECTION */}
        <section className="py-40 px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="max-w-5xl mx-auto bg-slate-950 rounded-[3.5rem] p-16 text-center relative overflow-hidden shadow-2xl"
          >
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />

            <h2 className="text-4xl md:text-6xl font-black mb-8 text-white tracking-tighter relative z-10">
              Ready to <span className="text-primary">Join Us?</span>
            </h2>
            <p className="text-slate-400 text-lg md:text-xl mb-12 max-w-xl mx-auto relative z-10 font-medium">
              Experience the future of rural medical support. Secure, fast, and
              accessible for everyone.
            </p>
            <button className="relative z-10 px-12 py-5 bg-primary text-white rounded-2xl font-black text-lg hover:scale-105 hover:shadow-[0_20px_50px_rgba(59,130,246,0.4)] transition-all">
              Choose Your Portal
            </button>
          </motion.div>
        </section>
      </main>

      <footer className="py-20 border-t border-slate-100 bg-white/50 text-center">
        <p className="text-slate-400 font-semibold tracking-wide uppercase text-xs">
          © 2025 Hind Svaasth Seva • Excellence in Care
        </p>
      </footer>
    </motion.div>
  );
}
