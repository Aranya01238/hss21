import { createAuth0Client, Auth0Client } from "@auth0/auth0-spa-js"

let clientPromise: Promise<Auth0Client> | null = null

export function getAuth0Client(): Promise<Auth0Client> {
  if (clientPromise) return clientPromise
  const domain = process.env.NEXT_PUBLIC_AUTH0_DOMAIN as string
  const clientId = process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID as string
  const redirectUri =
    (process.env.NEXT_PUBLIC_AUTH0_REDIRECT_URI as string) ||
    (typeof window !== "undefined" ? window.location.origin : "")
  const audience = process.env.NEXT_PUBLIC_AUTH0_AUDIENCE as string | undefined
  const scope = process.env.NEXT_PUBLIC_AUTH0_SCOPE as string | undefined

  clientPromise = createAuth0Client({
    domain,
    clientId,
    authorizationParams: {
      redirect_uri: redirectUri,
      ...(audience ? { audience } : {}),
      ...(scope ? { scope } : {}),
    },
    cacheLocation: "localstorage",
    useRefreshTokens: true,
  })

  return clientPromise
}

export async function ensureAuth0CallbackHandled() {
  if (typeof window === "undefined") return
  const url = new URL(window.location.href)
  const hasCode = url.searchParams.get("code")
  const hasState = url.searchParams.get("state")
  if (!hasCode || !hasState) return
  const client = await getAuth0Client()
  const result = await client.handleRedirectCallback()
  const portal = (result?.appState as any)?.portal as string | undefined
  const mapping: Record<string, string> = {
    user: "/patient/dashboard",
    hospital: "/hospital/dashboard",
    receptionist: "/receptionist/dashboard",
    developer: "/developer/dashboard",
  }
  const dest = (portal && mapping[portal]) || window.location.pathname
  window.location.replace(dest)
}

