"use client"

import { useEffect, useState } from "react"

export function OfflineBadge() {
  const [isOnline, setIsOnline] = useState(true)

  useEffect(() => {
    setIsOnline(navigator.onLine)
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)

    window.addEventListener("online", handleOnline)
    window.addEventListener("offline", handleOffline)

    return () => {
      window.removeEventListener("online", handleOnline)
      window.removeEventListener("offline", handleOffline)
    }
  }, [])

  if (isOnline) return null

  return (
    <div className="bg-destructive text-destructive-foreground py-2 px-4 text-center text-sm">
      ⚠️ You are offline. Some features may be limited.
    </div>
  )
}
