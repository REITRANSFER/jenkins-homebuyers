import { NextResponse } from "next/server"

// GoFunnel external / custom-webhook integration for the Jenkins Home Buyers
// client. Posting the lead here (with the gf_sid visitor session id) stitches
// attribution immediately, independent of n8n / GHL side-effects — the same
// pattern REI Transfer uses for William Yu's workspace. Credential + bearer
// are overridable via env; defaults are the Jenkins client's external creds.
const GF_WEBHOOK_BASE = "https://app.gofunnel.ai/api/v2/webhooks/external"
const GF_CREDENTIAL_ID =
  process.env.GOFUNNEL_WEBHOOK_CREDENTIAL_ID || "5e0eca74-84bd-465e-b562-74f9ebd366bd"
const GF_BEARER =
  process.env.GOFUNNEL_WEBHOOK_SECRET || "a09f7e53-965c-4615-a81e-db31c200cb09"

function readCookie(request: Request, name: string): string {
  const cookie = request.headers.get("cookie") || ""
  const m = cookie.match(new RegExp("(?:^|; )" + name + "=([^;]*)"))
  return m ? decodeURIComponent(m[1]) : ""
}

// Build the GoFunnel external-webhook payload from a submission.
function buildGoFunnelPayload(
  data: Record<string, unknown>,
  stage: string,
  gfSid: string,
  email: string,
  phone: string
) {
  const str = (v: unknown) => (typeof v === "string" && v ? v : undefined)
  return {
    type: stage === "early" ? "survey_started" : "survey_submitted",
    email: email || undefined,
    phone: phone || undefined,
    firstName: str(data.firstName),
    lastName: str(data.lastName),
    sid: gfSid || undefined,
    formId: "jenkins-homebuyers-survey",
    formTitle: "Jenkins Home Buyers Survey",
    idempotencyKey: str(data.meta_event_id),
    leadQuestions: {
      is_legal_owner: str(data.isLegalOwner),
      listed_on_market: str(data.listedOnMarket),
      property_type: str(data.propertyType),
      timeline: str(data.timeline),
      asking_price: str(data.askingPrice),
      condition: str(data.condition),
      reason: str(data.reason),
    },
    data: {
      lead_stage: stage,
      qualified: data.qualified === true,
      lead_score: data.lead_score,
      lead_quality: data.lead_quality,
      meta_event_id: data.meta_event_id,
      meta_event_name: data.meta_event_name,
      meta_value: data.meta_value,
      address: data.address,
      state: data.state,
      city: data.city,
      county: data.county,
      utm_source: data.utm_source,
      utm_medium: data.utm_medium,
      utm_campaign: data.utm_campaign,
      utm_content: data.utm_content,
      utm_term: data.utm_term,
      fbclid: data.fbclid,
      gclid: data.gclid,
      msclkid: data.msclkid,
      ttclid: data.ttclid,
      referrer: data.referrer,
      landing_page: data.landing_page,
    },
  }
}

// Simple in-memory rate limiter (resets on deploy/restart)
const submissionLog = new Map<string, { count: number; firstSubmit: number }>()

function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const window = 60 * 60 * 1000 // 1 hour
  const maxSubmissions = 3

  const entry = submissionLog.get(ip)
  if (!entry) {
    submissionLog.set(ip, { count: 1, firstSubmit: now })
    return false
  }

  // Reset window if expired
  if (now - entry.firstSubmit > window) {
    submissionLog.set(ip, { count: 1, firstSubmit: now })
    return false
  }

  entry.count++
  return entry.count > maxSubmissions
}

export async function POST(request: Request) {
  try {
    const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim()
      || request.headers.get("x-real-ip")
      || "unknown"

    // Rate limit: max 3 submissions per IP per hour
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { success: false, error: "Too many submissions. Please try again later." },
        { status: 429 }
      )
    }

    const data = await request.json()
    const stage = data.lead_stage || 'complete' // 'early' | 'complete'

    // Server-side validation (applies to BOTH stages)
    const phone = (data.phone || "").replace(/\D/g, "").replace(/^1/, "")
    if (phone.length !== 10) {
      return NextResponse.json({ success: false, error: "Invalid phone" }, { status: 400 })
    }

    const email = (data.email || "").trim().toLowerCase()
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ success: false, error: "Invalid email" }, { status: 400 })
    }

    if (!(data.name || "").trim()) {
      return NextResponse.json({ success: false, error: "Name required" }, { status: 400 })
    }

    if (!(data.address || "").trim()) {
      return NextResponse.json({ success: false, error: "Address required" }, { status: 400 })
    }

    const payload = { ...data, server_ip: ip, lead_stage: stage }

    // Fire the n8n and GoFunnel forwards in parallel so neither delays the
    // client's redirect to /thank-you, and a failure of one never blocks the
    // other (or the lead).
    const forwards: Promise<unknown>[] = []

    // Webhook routing: same URL for both stages, n8n branches on `lead_stage`.
    // Optional split via WEBHOOK_URL_EARLY / WEBHOOK_URL_COMPLETE.
    const earlyUrl = process.env.WEBHOOK_URL_EARLY || process.env.WEBHOOK_URL
    const completeUrl = process.env.WEBHOOK_URL_COMPLETE || process.env.WEBHOOK_URL
    const webhookUrl = stage === 'early' ? earlyUrl : completeUrl

    if (webhookUrl) {
      forwards.push(
        fetch(webhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        })
      )
    }

    // GoFunnel external webhook — attribution stitch via gf_sid (payload first,
    // cookie fallback). Set GOFUNNEL_WEBHOOK_SECRET="" to disable.
    if (GF_CREDENTIAL_ID && GF_BEARER) {
      const gfSid = (data.gf_sid || readCookie(request, "gf_sid") || "").toString().trim()
      const gfPayload = buildGoFunnelPayload(data, stage, gfSid, email, phone)
      forwards.push(
        fetch(`${GF_WEBHOOK_BASE}?credential_id=${GF_CREDENTIAL_ID}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${GF_BEARER}`,
          },
          body: JSON.stringify(gfPayload),
        })
      )
    }

    await Promise.allSettled(forwards)

    return NextResponse.json({ success: true, stage })
  } catch {
    return NextResponse.json({ success: false }, { status: 500 })
  }
}
