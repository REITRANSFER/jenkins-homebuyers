import Script from "next/script"

// GoFunnel attribution/tracking script.
//
// Reads the per-client GoFunnel org (client) ID from a NEXT_PUBLIC_ env var,
// defaulting to Jenkins Home Buyers' GoFunnel client ID so tracking works out
// of the box. Override NEXT_PUBLIC_GOFUNNEL_ORG_ID to reuse this template for
// another client; set it to an empty string to disable tracking entirely.
//
// Loaded with strategy="beforeInteractive" so it runs ahead of any form embed
// scripts — matching GoFunnel's install guidance ("paste into the <head>,
// before any form embed scripts"). The script captures the gf_sid session ID,
// attribution cookies/click IDs, UTM params, and decorates outbound links.
const GOFUNNEL_ORG_ID =
  process.env.NEXT_PUBLIC_GOFUNNEL_ORG_ID ??
  "6c57a535-4668-4ec7-b9b3-454db31ad1f9"

export function GoFunnelTracking() {
  if (!GOFUNNEL_ORG_ID) return null // Tracking disabled

  return (
    <Script
      id="gofunnel-tracking"
      src={`https://app.gofunnel.ai/api/tracking/script/${GOFUNNEL_ORG_ID}`}
      strategy="beforeInteractive"
    />
  )
}
