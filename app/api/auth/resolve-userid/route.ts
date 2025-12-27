import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const { userId } = await req.json()
    if (!userId) return NextResponse.json({ error: "Missing userId" }, { status: 400 })

    const domain = process.env.NEXT_PUBLIC_AUTH0_DOMAIN as string
    const mgmtClientId = process.env.AUTH0_MGMT_CLIENT_ID as string | undefined
    const mgmtClientSecret = process.env.AUTH0_MGMT_CLIENT_SECRET as string | undefined
    const audience = process.env.AUTH0_MGMT_AUDIENCE || `https://${domain}/api/v2/`

    if (!domain || !mgmtClientId || !mgmtClientSecret) {
      return NextResponse.json({ error: "Management API not configured" }, { status: 404 })
    }

    let access_token = ""
    try {
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
      const json = await tokenRes.json()
      access_token = json.access_token
    } catch (e: any) {
      return NextResponse.json({ error: "Token request failed", details: e?.message }, { status: 502 })
    }

    try {
      const searchRes = await fetch(
        `https://${domain}/api/v2/users?q=${encodeURIComponent(`user_metadata.userId:"${userId}"`)}&search_engine=v3`,
        {
          headers: { Authorization: `Bearer ${access_token}` },
        },
      )
      if (!searchRes.ok) {
        const text = await searchRes.text()
        return NextResponse.json({ error: "User search failed", details: text }, { status: 502 })
      }
      const users = await searchRes.json()
      if (!Array.isArray(users) || users.length === 0) {
        return NextResponse.json({ error: "Not found" }, { status: 404 })
      }
      const user = users[0]
      return NextResponse.json({
        email: user.email,
        name: user.user_metadata?.name,
        email_verified: user.email_verified,
      })
    } catch (e: any) {
      return NextResponse.json({ error: "Search request failed", details: e?.message }, { status: 502 })
    }
  } catch (e: any) {
    return NextResponse.json({ error: "Unexpected error", details: e?.message }, { status: 500 })
  }
}
