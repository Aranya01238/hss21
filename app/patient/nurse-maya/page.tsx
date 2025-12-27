"use client";

import type React from "react";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/layout/navbar";
import { getAuth0Client } from "@/lib/auth0";

export const dynamic = "force-dynamic";

interface Message {
  id: number;
  text: string;
  sender: "user" | "nurse";
}

const NURSE_RESPONSES: Record<string, string> = {
  fever:
    "Fever can be managed with rest, fluids, and paracetamol. Monitor your temperature. Seek emergency care if temp exceeds 103°F.",
  headache:
    "Common headaches can be relieved with rest, hydration, and over-the-counter pain relievers. Consult a doctor if persistent.",
  "chest pain":
    "CHEST PAIN ALERT: This needs immediate medical attention. Call emergency services immediately.",
  breathing:
    "Difficulty breathing can be serious. If you have severe shortness of breath, seek emergency care immediately.",
  default:
    "I understand your concern. Please describe your symptoms in detail so I can provide better guidance. For emergencies, call 911 or seek immediate medical help.",
};

export default function NurseMaya() {
  const router = useRouter();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
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
      setMessages([
        {
          id: 1,
          text: `Hello ${name}! I'm Nurse Maya. I'm here to help answer your health questions 24/7. What health concerns do you have today?`,
          sender: "nurse",
        },
      ]);
    }
    guard();
  }, [router]);

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      text: input,
      sender: "user",
    };

    setMessages([...messages, userMessage]);

    setTimeout(() => {
      const lowerInput = input.toLowerCase();
      let response = NURSE_RESPONSES["default"];

      for (const [key, value] of Object.entries(NURSE_RESPONSES)) {
        if (key !== "default" && lowerInput.includes(key)) {
          response = value;
          break;
        }
      }

      const nurseMessage: Message = {
        id: messages.length + 2,
        text: response,
        sender: "nurse",
      };

      setMessages((prev) => [...prev, nurseMessage]);
    }, 500);

    setInput("");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="flex-1 max-w-2xl mx-auto w-full px-4 py-8 flex flex-col">
        <h1 className="text-3xl font-bold text-primary mb-6">Nurse Maya AI</h1>

        <div className="flex-1 bg-card border border-border rounded-lg p-6 mb-6 overflow-y-auto space-y-4 max-h-96">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${
                msg.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-xs px-4 py-2 rounded-lg ${
                  msg.sender === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground"
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
        </div>

        <form onSubmit={sendMessage} className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Describe your symptoms..."
            className="flex-1 px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <button
            type="submit"
            className="px-6 py-2 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90"
          >
            Send
          </button>
        </form>
      </main>
    </div>
  );
}
