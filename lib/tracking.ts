// Capture UTM parameters, click IDs, and IP address

interface TrackingData {
  utm_source: string
  utm_medium: string
  utm_campaign: string
  utm_content: string
  utm_term: string
  fbclid: string
  gclid: string
  msclkid: string
  ttclid: string
  gf_sid: string
  ip: string
  referrer: string
  landing_page: string
  user_agent: string
}

// Read the GoFunnel session id. The tracking script sets window.__gf_sid
// synchronously on load; fall through to localStorage / cookie / ?sid= for
// resilience (mirrors GoFunnel's own capture order).
function readGfSid(): string {
  if (typeof window === "undefined") return ""
  try {
    const w = window as unknown as { __gf_sid?: string }
    if (w.__gf_sid) return w.__gf_sid
  } catch {}
  try {
    const ls = localStorage.getItem("gf_sid")
    if (ls) return ls
  } catch {}
  try {
    const m = document.cookie.match(/(?:^|; )gf_sid=([^;]*)/)
    if (m) return decodeURIComponent(m[1])
  } catch {}
  try {
    const sid = new URLSearchParams(window.location.search).get("sid")
    if (sid) return sid
  } catch {}
  return ""
}

export function captureTrackingData(): TrackingData {
  if (typeof window === "undefined") {
    return {
      utm_source: "", utm_medium: "", utm_campaign: "",
      utm_content: "", utm_term: "", fbclid: "", gclid: "",
      msclkid: "", ttclid: "", gf_sid: "", ip: "", referrer: "", landing_page: "", user_agent: "",
    }
  }

  const params = new URLSearchParams(window.location.search)

  return {
    utm_source: params.get("utm_source") || "",
    utm_medium: params.get("utm_medium") || "",
    utm_campaign: params.get("utm_campaign") || "",
    utm_content: params.get("utm_content") || "",
    utm_term: params.get("utm_term") || "",
    fbclid: params.get("fbclid") || "",
    gclid: params.get("gclid") || "",
    msclkid: params.get("msclkid") || "",
    ttclid: params.get("ttclid") || "",
    gf_sid: readGfSid(),
    ip: "",
    referrer: document.referrer || "",
    landing_page: window.location.href,
    user_agent: navigator.userAgent || "",
  }
}

export async function getIPAddress(): Promise<string> {
  try {
    const res = await fetch("https://api.ipify.org?format=json", { signal: AbortSignal.timeout(3000) })
    const data = await res.json()
    return data.ip || ""
  } catch {
    return ""
  }
}