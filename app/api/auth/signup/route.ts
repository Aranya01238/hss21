"use client";

import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { name, email, password, phone, address } = body || {}
    if (!name || !email || !password) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const domain = process.env.NEXT_PUBLIC_AUTH0_DOMAIN as string
    const mgmtClientId = process.env.AUTH0_MGMT_CLIENT_ID as string | undefined
    const mgmtClientSecret = process.env.AUTH0_MGMT_CLIENT_SECRET as string | undefined
    const audience = process.env.AUTH0_MGMT_AUDIENCE || `https://${domain}/api/v2/`
    const connection = process.env.AUTH0_DB_CONNECTION || "Username-Password-Authentication"
    const publicClientId = process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID as string | undefined
    const userId = `USER${Math.floor(Math.random() * 1000000).toString().padStart(6, "0")}`

    // Prefer Management API if configured, otherwise fall back to Authentication API signup
    if (domain && mgmtClientId && mgmtClientSecret) {
      const tokenRes = await fetch(`https://${domain}/oauth/token`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          grant_type: "client_credentials",
          client_id: mgmtClientId,
          client_secret: mgmtClientSecret,
          audience,
        }),
      })
      if (!tokenRes.ok) {
        const err = await tokenRes.text()
        return NextResponse.json({ error: "Failed to get management token", details: err }, { status: 502 })
      }
      const { access_token } = await tokenRes.json()

      const createRes = await fetch(`https://${domain}/api/v2/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access_token}`,
        },
        body: JSON.stringify({
          email,
          password,
          connection,
          email_verified: false,
          verify_email: true,
          user_metadata: {
            name,
            phone,
            address,
            userId,
          },
          app_metadata: {
            role: "patient",
          },
        }),
      })
      const ct = createRes.headers.get("content-type") || ""
      const data = ct.includes("application/json") ? await createRes.json() : await createRes.text()
      if (!createRes.ok) {
        const description =
          typeof data === "string"
            ? data
            : data?.message || data?.error || data?.description || "Unknown error"
        return NextResponse.json({ error: "Auth0 signup failed", details: description }, { status: 400 })
      }
    } else {
      // Authentication API fallback: /dbconnections/signup (no management token needed)
      if (!domain || !publicClientId) {
        return NextResponse.json({ error: "Auth0 environment not configured" }, { status: 500 })
      }
      const signupRes = await fetch(`https://${domain}/dbconnections/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          client_id: publicClientId,
          email,
          password,
          connection,
          user_metadata: {
            name,
            phone,
            address,
            userId,
          },
        }),
      })
      const ct = signupRes.headers.get("content-type") || ""
      const signupData = ct.includes("application/json") ? await signupRes.json() : await signupRes.text()
      if (!signupRes.ok) {
        const description =
          typeof signupData === "string"
            ? signupData
            : signupData?.message || signupData?.error || signupData?.description || "Unknown error"
        const statusCode = signupRes.status || 400
        return NextResponse.json({ error: "Auth0 signup failed", details: description }, { status: statusCode })
      }
      // Auth0 may send verification email automatically depending on connection settings
    }

    return NextResponse.json({ ok: true, userId })
  } catch (e: any) {
    return NextResponse.json({ error: "Unexpected error", details: e?.message || String(e) }, { status: 500 })
  }
}
